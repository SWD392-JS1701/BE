import { Injectable } from '@nestjs/common'
import { RatingDto } from '~/dtos/rating.dto'
import { Rating } from '~/models/rating.model'
import { RatingRepository } from '~/repositories/rating.repository'

@Injectable()
export class RatingService {
  constructor(private readonly ratingRepository: RatingRepository) {}

  async create(createRatingDto: RatingDto): Promise<Rating> {
    return this.ratingRepository.create(createRatingDto)
  }

  async getAll(): Promise<Rating[]> {
    return this.ratingRepository.findAll()
  }

  async getByProduct(product_id: string): Promise<Rating[]> {
    return this.ratingRepository.findByProduct(product_id)
  }

  async getByUser(user_id: string): Promise<Rating[]> {
    return this.ratingRepository.findByUser(user_id)
  }

  async delete(id: string): Promise<Rating | null> {
    return this.ratingRepository.delete(id)
  }
}
