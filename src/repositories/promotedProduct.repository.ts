import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProduct, PromotedProductDocument } from '~/models/promotedProduct.model'

@Injectable()
export class PromotedProductRepository {
  constructor(@InjectModel(PromotedProduct.name) private promotedProductModel: Model<PromotedProductDocument>) {}

  async create(productData: CreatePromotedProductDto): Promise<PromotedProduct> {
    const createdProduct = new this.promotedProductModel(productData)
    return createdProduct.save()
  }

  async findAll(): Promise<PromotedProduct[]> {
    return this.promotedProductModel.find().exec()
  }

  async findById(id: string): Promise<PromotedProduct | null> {
    return this.promotedProductModel.findById(id).exec()
  }

  async delete(id: string): Promise<PromotedProduct | null> {
    return this.promotedProductModel.findByIdAndDelete(id).exec()
  }
}
