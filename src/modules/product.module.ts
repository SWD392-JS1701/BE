import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductsService } from '../services/product.service'
import { ProductsController } from '../controllers/product.controller'
import { Product, ProductSchema } from '../models/product.model'
import { ProductRepository } from '~/repositories/product.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  exports: [ProductRepository]
})
export class ProductsModule {}
