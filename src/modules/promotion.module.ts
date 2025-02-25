import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Promotion, PromotionSchema } from '../models/promotion.model'
import { PromotionController } from '~/controllers/promotion.controller'
import { PromotionService } from '~/services/promotion.service'
import { PromotionRepository } from '~/repositories/promotion.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Promotion.name, schema: PromotionSchema }])],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository],
  exports: [PromotionRepository]
})
export class PromotionModule {}
