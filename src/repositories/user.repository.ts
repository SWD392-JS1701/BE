import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../models/user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  /* Create a new user */
  async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  /* Get all users */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /* Get a user by ID */
  async findById(id: string): Promise<User | null> {
    const objectId = new Types.ObjectId(id);
    return this.userModel.findById(objectId).exec();
  }

  /* Get a user by username */
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  /* Get a user by email */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  /* Update user */
  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $set: updateData, updatedAt: new Date() }, { new: true })
      .exec();
  }

/* Delete user */
async delete(id: string): Promise<void> {
    const objectId = new Types.ObjectId(id);
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
  
    await this.userModel.updateOne({ _id: objectId }, { $set: { status: 0 } });
  }
}
