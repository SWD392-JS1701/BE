import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizService } from '../services/quiz.service';
import { CreateQuizDto, UpdateQuizDto } from '../dtos/quiz.dto';
import { Quiz } from '../models/quiz.model';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz successfully created', type: Quiz })
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'List of all quizzes', type: [Quiz] })
  async findAll(): Promise<Quiz[]> {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz found', type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async findOne(@Param('id') id: string): Promise<Quiz> {
    return this.quizService.getQuizById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz updated successfully', type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz by ID' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async delete(@Param('id') id: string) {
    await this.quizService.deleteQuiz(id);
  }
}
