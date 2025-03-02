import { BadRequestException, NotFoundException, UnauthorizedException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginDto, ResetPasswordDto } from "~/dtos/user.dto";
import { AuthRepository } from "~/repositories/auth.repository";
import * as bcrypt from 'bcrypt';


const JWT_SECRET = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository, 
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    let user = await this.authRepository.findByEmailOrUsername(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or username');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user._id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload, { secret: JWT_SECRET });

    return { access_token };
  }

  async register(createUserDto: CreateUserDto): Promise<{ message: string; access_token?: string }> {
    const { username, email, plainPassword, ...otherFields } = createUserDto;

    const existingUser = await this.authRepository.findByEmailOrUsername(email);
    if (existingUser) {
      throw new BadRequestException('User with the provided username or email already exists');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainPassword, salt);
    const role = createUserDto.role ?? 'User';

    const createdUser = await this.authRepository.createUser({ username, email, password, role, ...otherFields });

    const payload = { id: createdUser._id, username: createdUser.username, role: createdUser.role };
    const access_token = this.jwtService.sign(payload, { secret: JWT_SECRET });

    return { message: 'Registration successful', access_token };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;
    try {
      const decoded = await this.jwtService.verifyAsync(token, { secret: JWT_SECRET });

      const user = await this.authRepository.findById(decoded.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.authRepository.updatePassword(user.id, hashedPassword);

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}
