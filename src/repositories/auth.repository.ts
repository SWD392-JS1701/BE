import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/user.model';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async findByEmailOrUsername(emailOrUsername: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async createUser(userData: Partial<User>): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId), 
      { password: newPassword }
    ).exec();
}

  
}