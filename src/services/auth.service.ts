import { BadGatewayException, BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../models/user.model';
import { CreateUserDto, LoginDto, ResetPasswordDto } from '../dtos/user.dto';

const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password} = loginDto;
    let user = await this.userModel.findOne({ email }).exec();

    if (!user) {
        user = await this.userModel.findOne({ username: email }).exec();
    }

    if (!user) {
        throw new UnauthorizedException('Invalid email or username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user._id, username: user.username,  role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async register(createUserDto: CreateUserDto): Promise<{ message: string; access_token?: string }> {
    const { username, email, plainPassword, ...otherFields } = createUserDto;

    const existingUser = await this.userModel.findOne({
       $or: [{ username }, { email }],
    }).exec();

    if (existingUser) {
      throw new BadRequestException('User with the provided username or email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);
    const role = createUserDto.role ?? 'User';

    const createdUser = new this.userModel({
      username,
      email,
      password,
      role,
      ...otherFields,
    });

    await createdUser.save();

     const payload = { id: createdUser._id, username: createdUser.username, role: createdUser.role };
     const access_token = this.jwtService.sign(payload);
     return { message: 'Registration successful', access_token };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userModel.findById(decoded.id).exec();

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Hash the new password
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
  
}
