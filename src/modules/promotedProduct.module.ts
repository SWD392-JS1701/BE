import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PromotedProductController } from '~/controllers/promotedProduct.controller'
import { PromotedProduct, PromotedProductSchema } from '~/models/promotedProduct.model'
import { PromotedProductRepository } from '~/repositories/promotedProduct.repository'
import { PromotedProductService } from '~/services/promotedProduct.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: PromotedProduct.name, schema: PromotedProductSchema }])],
  controllers: [PromotedProductController],
  providers: [PromotedProductService, PromotedProductRepository],
  exports: [PromotedProductRepository]
})
export class PromotedProductModule {}
