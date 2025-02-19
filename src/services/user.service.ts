import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { User, UserDocument } from '../models/user.model'
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /* Create a new user */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const newUser = new this.userModel({
      ...createUserDto,
      password_hash: hashedPassword
    })
    return newUser.save()
  }

  /* Get all users */
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  /* Get a user by ID */
  async getUserById(id: string): Promise<User> {
    const objectId = new Types.ObjectId(id)
    const user = await this.userModel.findById(objectId).exec()
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  /* Update user */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto, updatedAt: new Date() }, { new: true })
      .exec()
    if (!updatedUser) throw new NotFoundException('User not found')
    return updatedUser
  }

  /* Delete user */
  async deleteUser(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec()
    if (!result) throw new NotFoundException('User not found')
  }
}
