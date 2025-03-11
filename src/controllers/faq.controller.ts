import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FaqService } from '../services/faq.service';
import { FaqDTO, UpdateFaqDTO } from '../dtos/faq.dto';
import { Faq } from '../models/faq.model';

@ApiTags('FAQs')
@Controller('faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiResponse({ status: 201, description: 'FAQ successfully created', type: Faq })
  async create(@Body() createFaqDto: FaqDTO): Promise<Faq> {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({ status: 200, description: 'List of all FAQs', type: [Faq] })
  async findAll(): Promise<Faq[]> {
    return this.faqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an FAQ by ID' })
  @ApiResponse({ status: 200, description: 'FAQ found', type: Faq })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async findOne(@Param('id') id: string): Promise<Faq> {
    return this.faqService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an FAQ by ID' })
  @ApiResponse({ status: 200, description: 'FAQ updated successfully', type: Faq })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDTO): Promise<Faq> {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an FAQ by ID' })
  @ApiResponse({ status: 200, description: 'FAQ deleted successfully' })
  @ApiResponse({ status: 404, description: 'FAQ not found' })
  async remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
