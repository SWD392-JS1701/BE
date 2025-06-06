import { Controller, Post, Get, Delete, Body, Param, Put } from '@nestjs/common'
import { RatingDto, UpdateRatingDto } from '~/dtos/rating.dto'
import { Rating } from '~/models/rating.model'
import { RatingService } from '~/services/rating.service'

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: RatingDto): Promise<Rating> {
    return this.ratingService.create(createRatingDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto): Promise<Rating | null> {
    return this.ratingService.update(id, updateRatingDto)
  }

  @Get()
  async getAll(): Promise<Rating[]> {
    return this.ratingService.getAll()
  }

  @Get('product/:product_id')
  async getByProduct(@Param('product_id') product_id: string): Promise<Rating[]> {
    return this.ratingService.getByProduct(product_id)
  }

  @Get('user/:user_id')
  async getByUser(@Param('user_id') user_id: string): Promise<Rating[]> {
    return this.ratingService.getByUser(user_id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Rating | null> {
    return this.ratingService.delete(id)
  }
}
