import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RatingController } from '~/controllers/rating.controller'
import { Product, ProductSchema } from '~/models/product.model'
import { Rating, RatingSchema } from '~/models/rating.model'
import { ProductRepository } from '~/repositories/product.repository'
import { RatingRepository } from '~/repositories/rating.repository'
import { RatingService } from '~/services/rating.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [RatingController],
  providers: [RatingService, RatingRepository, ProductRepository],
  exports: [RatingService]
})
export class RatingModule {}
