import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../models/user.model';
import { CreateUserDto, LoginDto } from '../dtos/user.dto';

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

    const isPasswordValid = await bcrypt.compare(password, user.passsword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user._id, username: user.username,  role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async register(createUserDto: CreateUserDto): Promise<{ message: string; access_token?: string }> {
    const { username, email, password, ...otherFields } = createUserDto;

    const existingUser = await this.userModel.findOne({
       $or: [{ username }, { email }],
    }).exec();

    if (existingUser) {
      throw new BadRequestException('User with the provided username or email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passsword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      username,
      email,
      passsword,
      ...otherFields,
    });

    await createdUser.save();

     const payload = { id: createdUser._id, username: createdUser.username, role: createdUser.role };
     const access_token = this.jwtService.sign(payload);
     return { message: 'Registration successful', access_token };
  }
}
