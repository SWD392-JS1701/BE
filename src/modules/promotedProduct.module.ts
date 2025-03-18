import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PromotedProductController } from '~/controllers/promotedProduct.controller'
import { Product, ProductSchema } from '~/models/product.model'
import { PromotedProduct, PromotedProductSchema } from '~/models/promotedProduct.model'
import { Promotion, PromotionSchema } from '~/models/promotion.model'
import { ProductRepository } from '~/repositories/product.repository'
import { PromotedProductRepository } from '~/repositories/promotedProduct.repository'
import { PromotionRepository } from '~/repositories/promotion.repository'
import { PromotedProductService } from '~/services/promotedProduct.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PromotedProduct.name, schema: PromotedProductSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Promotion.name, schema: PromotionSchema }])
  ],
  controllers: [PromotedProductController],
  providers: [PromotedProductService, PromotedProductRepository, ProductRepository, PromotionRepository],
  exports: [PromotedProductRepository]
})
export class PromotedProductModule {}
