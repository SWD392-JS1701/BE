import { Module } from '@nestjs/common';
import { GeminiController } from '../controllers/gemini.controller';
import { GeminiService } from '../services/gemini.service';
import { ProductsModule } from './product.module';
import { productTypesModule } from './productType.module';

@Module({
  imports: [ProductsModule, productTypesModule],
  controllers: [GeminiController],
  providers: [GeminiService],
  exports: [GeminiService], // Cho phép các module khác sử dụng service này
})
export class GeminiModule {}
