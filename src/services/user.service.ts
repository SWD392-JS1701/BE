import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /* Create a new user */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const role = createUserDto.role ?? 'user';
    const newUser = await this.userRepository.create({
      ...createUserDto,
      role,
      passsword: hashedPassword,
    });
    return newUser;
  }

  /* Get all users */
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  /* Get a user by ID */
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /* Get a user by username */
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /* Get a user by email */
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /* Update user */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  /* Delete user */
  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
