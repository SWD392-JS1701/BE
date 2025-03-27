import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';
import { GeminiRequestDto } from '../dtos/gemini-request.dto';
import { QuestionRequestDto } from '../dtos/question-request.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('ask')
  async ask(@Body() body: GeminiRequestDto) {
    return await this.geminiService.askGemini(body.message!);
  }

  @Post('question')
  async askWithSelection(@Body() body: QuestionRequestDto) {
    const prompt = `Khách hàng đã chọn: ${body.selections!.join(", ")}. Hãy tư vấn sản phẩm skincare phù hợp.`;
    return await this.geminiService.askGemini(prompt);
  }
}
