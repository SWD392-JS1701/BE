import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsController } from '~/controllers/product.controller'
import { Product, ProductSchema } from '~/models/product.model'
import { ProductType, ProductTypeSchema } from '~/models/productType.model'
import { ProductRepository } from '~/repositories/product.repository'
import { ProductTypeRepository } from '~/repositories/productType.repository'
import { ProductsService } from '~/services/product.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: ProductType.name, schema: ProductTypeSchema }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository, ProductTypeRepository],
  exports: [ProductsService, ProductRepository]
})
export class ProductsModule {}
