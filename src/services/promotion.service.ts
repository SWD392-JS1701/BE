import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Promotion, PromotionDocument } from '../models/promotion.model'
import { CreatePromotionDto } from '~/dtos/createPromotion.dto'
import { UpdatePromotionDto } from '~/dtos/updatePromotion.dto'

@Injectable()
export class PromotionService {
  constructor(@InjectModel(Promotion.name) private promotionModel: Model<PromotionDocument>) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const createdPromotion = new this.promotionModel(createPromotionDto)
    return createdPromotion.save()
  }

  async findAll(): Promise<Promotion[]> {
    return this.promotionModel.find().exec()
  }

  async findOne(id: string): Promise<Promotion | null> {
    return this.promotionModel.findById(id).exec()
  }

  async update(id: string, updatePromotionDto: UpdatePromotionDto): Promise<Promotion | null> {
    return this.promotionModel.findByIdAndUpdate(id, updatePromotionDto, { new: true }).exec()
  }

  async remove(id: string): Promise<Promotion | null> {
    return this.promotionModel.findByIdAndDelete(id).exec()
  }
}
