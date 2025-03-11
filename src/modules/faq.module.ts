import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqService } from '../services/faq.service';
import { FaqController } from '../controllers/faq.controller';
import { Faq, FaqSchema } from '../models/faq.model';
import { FaqRepository } from '../repositories/faq.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Faq.name, schema: FaqSchema }])],
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
  exports: [FaqRepository],
})
export class FaqModule {}
