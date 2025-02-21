import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProduct, PromotedProductDocument } from '~/models/promotedProduct.model'

@Injectable()
export class PromotedProductService {
  constructor(@InjectModel(PromotedProduct.name) private promotedProductModel: Model<PromotedProductDocument>) {}

  async create(createPromotedProductDto: CreatePromotedProductDto): Promise<PromotedProduct> {
    const createdPromotedProduct = new this.promotedProductModel(createPromotedProductDto)
    return createdPromotedProduct.save()
  }

  async findAll(): Promise<PromotedProduct[]> {
    return this.promotedProductModel.find().exec()
  }

  async findOne(id: string): Promise<PromotedProduct | null> {
    return this.promotedProductModel.findById(id).exec()
  }

  async remove(id: string): Promise<PromotedProduct> {
    const removedPromotedProduct = await this.promotedProductModel.findByIdAndDelete(id).exec()
    if (!removedPromotedProduct) {
      throw new NotFoundException(`Promoted product with ID ${id} not found`)
    }
    return removedPromotedProduct
  }
}
