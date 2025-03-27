import { Module } from '@nestjs/common';
import { GeminiController } from '../controllers/gemini.controller';
import { GeminiService } from '../services/gemini.service';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService], // Cho phép các module khác sử dụng service này
})
export class GeminiModule {}
