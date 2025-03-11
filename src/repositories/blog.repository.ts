import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from '../models/blog.model';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().populate('staff_id').exec();
  }

  async findById(id: string): Promise<Blog | null> {
    const objectId = new Types.ObjectId(id);
    return this.blogModel.findById(objectId).populate('staff_id').exec();
  }

  async create(blogData: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(blogData);
    return newBlog.save();
  }

  async update(id: string, updateData: Partial<Blog>): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, { $set: updateData, updated_at: new Date() }, { new: true }).exec();
  }

  async delete(id: string): Promise<Blog | null> {
    return this.blogModel.findByIdAndDelete(id).exec();
  }
}