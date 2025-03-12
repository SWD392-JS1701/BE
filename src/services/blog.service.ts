import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../repositories/blog.repository';
import { BlogDTO, UpdateBlogDTO } from '../dtos/blog.dto';
import { Blog } from '../models/blog.model';
import { Types } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.findAll();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    if (!blog) throw new NotFoundException(`Blog with ID ${id} not found`);
    return blog;
  }

  async create(createBlogDto: BlogDTO): Promise<Blog> {
    return this.blogRepository.create({
      ...createBlogDto,
      doctor_id: new Types.ObjectId(createBlogDto.doctor_id), // Convert to ObjectId
    });
  }

  async update(id: string, updateBlogDto: UpdateBlogDTO): Promise<Blog> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateBlogDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update');
    }

    const updatedBlog = await this.blogRepository.update(id, filteredUpdate);
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async remove(id: string): Promise<Blog> {
    const deletedBlog = await this.blogRepository.delete(id);
    if (!deletedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return deletedBlog;
  }
}
