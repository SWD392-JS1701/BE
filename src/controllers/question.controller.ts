import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, UpdateQuestionDto } from '../dtos/question.dto';
import { Question } from '../models/question.model';

@ApiTags('Questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'Question successfully created', type: Question })
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'List of all questions', type: [Question] })
  async findAll(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'Question found', type: Question })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionService.getQuestionById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiResponse({ status: 200, description: 'Question updated successfully', type: Question })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async delete(@Param('id') id: string) {
    await this.questionService.deleteQuestion(id);
  }
}
