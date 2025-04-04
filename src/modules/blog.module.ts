import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from '../services/blog.service';
import { BlogController } from '../controllers/blog.controller';
import { Blog, BlogSchema } from '../models/blog.model';
import { BlogRepository } from '../repositories/blog.repository';
import { Doctor,DoctorSchema } from '../models/doctor.model';
@Module({
  imports: [MongooseModule.forFeature([
    { name: Doctor.name, schema: DoctorSchema },
    { name: Blog.name, schema: BlogSchema }])],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
  exports: [BlogRepository],
})
export class BlogModule {}
