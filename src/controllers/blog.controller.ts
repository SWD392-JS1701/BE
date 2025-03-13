import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogService } from '../services/blog.service';
import { BlogDTO, UpdateBlogDTO } from '../dtos/blog.dto';
import { Blog } from '../models/blog.model';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('blogcreate')
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'Blog post successfully created', type: Blog })
  async create(@Body() createBlogDto: BlogDTO): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'List of all blog posts', type: [Blog] })
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Blog post found', type: Blog })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Blog post updated successfully', type: Blog })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDTO): Promise<Blog> {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiResponse({ status: 200, description: 'Blog post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
