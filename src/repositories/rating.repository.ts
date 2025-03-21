import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { RatingDto } from '~/dtos/rating.dto'
import { Rating, RatingDocument } from '~/models/rating.model'
import { ProductRepository } from './product.repository'

@Injectable()
export class RatingRepository {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>,
    private readonly productRepository: ProductRepository
  ) {}

  async create(ratingDto: RatingDto): Promise<Rating> {
    const newRating = new this.ratingModel(ratingDto)
    const savedRating = await newRating.save()

    // Recalculate product rating
    await this.updateProductRating(ratingDto.product_id)

    return savedRating
  }

  async update(id: string, ratingDto: Partial<RatingDto>): Promise<Rating | null> {
    const updatedRating = await this.ratingModel.findByIdAndUpdate(id, ratingDto, { new: true }).exec()

    if (!updatedRating) {
      throw new HttpException('Rating not found', HttpStatus.NOT_FOUND)
    }

    // Recalculate product rating
    await this.updateProductRating(updatedRating.product_id)

    return updatedRating
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingModel.find().exec()
  }

  async findByProduct(product_id: string): Promise<Rating[]> {
    return this.ratingModel.find({ product_id }).exec()
  }

  async findByUser(user_id: string): Promise<Rating[]> {
    return this.ratingModel.find({ user_id }).exec()
  }

  async delete(id: string): Promise<Rating | null> {
    const rating = await this.ratingModel.findByIdAndDelete(id).exec()

    if (rating) {
      // Recalculate product rating after deletion
      await this.updateProductRating(rating.product_id)
    }

    return rating
  }

  async updateProductRating(product_id: string): Promise<void> {
    const ratings = await this.ratingModel.find({ product_id }).exec()

    if (ratings.length === 0) {
      // If no ratings exist, reset product_rating to 0
      await this.productRepository.update(product_id, { product_rating: 0 })
      return
    }

    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length

    // Update the product with the new average rating
    await this.productRepository.update(product_id, { product_rating: avgRating })
  }
}
