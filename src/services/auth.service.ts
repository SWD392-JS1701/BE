
import { BadRequestException, NotFoundException, UnauthorizedException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginDto, ResetPasswordDto } from "~/dtos/user.dto";
import { AuthRepository } from "~/repositories/auth.repository";
import * as bcrypt from 'bcrypt';
import { MailService } from "~/services/mail.service";
import { ResetToken, ResetTokenModel } from "~/models/reset-token.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Mongoose, Types } from "mongoose";
import { nanoid } from "nanoid";
import { UserRepository } from "~/repositories/user.repository";
import * as mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET;


@Injectable()
export class AuthService {
  constructor(

    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly authRepository: AuthRepository, 
    private readonly jwtService: JwtService,
    @InjectModel('ResetToken') private readonly resetTokenModel: Model<ResetToken>, 

  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto
    let user = await this.authRepository.findByEmailOrUsername(email)

    if (!user) {
      throw new UnauthorizedException('Invalid email or username')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { id: user._id, username: user.username, role: user.role }
    const access_token = await this.jwtService.signAsync(payload, { secret: JWT_SECRET })

    return { access_token }
  }

  async register(createUserDto: CreateUserDto): Promise<{ message: string; access_token?: string }> {
    const { username, email, plainPassword, ...otherFields } = createUserDto

    const existingUser = await this.authRepository.findByEmailOrUsername(email)
    if (existingUser) {
      throw new BadRequestException('User with the provided username or email already exists')
    }

    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(plainPassword, salt)
    const role = createUserDto.role ?? 'User'

    const createdUser = await this.authRepository.createUser({ username, email, password, role, ...otherFields })

    const payload = { id: createdUser._id, username: createdUser.username, role: createdUser.role }
    const access_token = this.jwtService.sign(payload, { secret: JWT_SECRET })

    return { message: 'Registration successful', access_token }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto
    try {
      const decoded = await this.jwtService.verifyAsync(token, { secret: JWT_SECRET })

      const user = await this.authRepository.findById(decoded.id)
      if (!user) {
        throw new NotFoundException('User not found')
      }

      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      await this.authRepository.updatePassword(user.id, hashedPassword)

      return { message: 'Password reset successful' }
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }

  async forgotPassword(email: string) {
    //Check that user exists
    let user = await this.authRepository.findByEmailOrUsername(email);

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);
      await this.resetTokenModel.create({
        token: resetToken,
        userId: user._id,
        expiryDate,
      });
      //Send the link to the user by email
      this.mailService.sendPasswordResetEmail(email, resetToken);
    }
    return { message: 'If this user exists, they will receive an email' };
  }

  async changePassword(newPassword: string, resetToken: string) {
    const token = await this.resetTokenModel.findOneAndDelete({
      token: resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.userRepository.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(token.userId, user);
  }
}
