import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProduct, PromotedProductDocument } from '~/models/promotedProduct.model'
import { Promotion } from '~/models/promotion.model'
import { ProductRepository } from '~/repositories/product.repository'
import { PromotionRepository } from '~/repositories/promotion.repository'

@Injectable()
export class PromotedProductRepository {
  constructor(
    @InjectModel(PromotedProduct.name) private promotedProductModel: Model<PromotedProductDocument>,
    private readonly productRepository: ProductRepository,
    private readonly promotionRepository: PromotionRepository
  ) {}

  async create(productData: CreatePromotedProductDto): Promise<PromotedProduct> {
    const { product_id, promotion_id } = productData

    const product = await this.productRepository.findById(product_id)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    const promotion = await this.promotionRepository.findById(promotion_id)
    if (!promotion) {
      throw new HttpException('Promotion not found', HttpStatus.NOT_FOUND)
    }

    const createdProduct = new this.promotedProductModel(productData)
    return createdProduct.save()
  }

  async update(id: string, updateData: Partial<CreatePromotedProductDto>): Promise<PromotedProduct | null> {
    const { product_id, promotion_id } = updateData

    if (product_id) {
      const product = await this.productRepository.findById(product_id)
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
      }
    }

    if (promotion_id) {
      const promotion = await this.promotionRepository.findById(promotion_id)
      if (!promotion) {
        throw new HttpException('Promotion not found', HttpStatus.NOT_FOUND)
      }
    }

    const updatedProduct = await this.promotedProductModel
      .findByIdAndUpdate(id, { $set: updateData, updatedAt: new Date() }, { new: true })
      .exec()

    if (!updatedProduct) {
      throw new HttpException('Promoted product not found', HttpStatus.NOT_FOUND)
    }

    return updatedProduct
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

  async findPromotionByProductId(productId: string): Promise<Promotion | null> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new HttpException('Invalid product ID format', HttpStatus.BAD_REQUEST)
    }

    const productPromo = await this.promotedProductModel
      .findOne({ product_id: new Types.ObjectId(productId) })
      .populate('promotion_id') // Populate promotion details
      .exec()

    if (!productPromo || !productPromo.promotion_id) {
      throw new HttpException('Promotion not found for this product', HttpStatus.NOT_FOUND)
    }

    const promoData = await this.promotionRepository.findById(productPromo.promotion_id)

    if (!promoData) {
      throw new HttpException('Promotion not found for this product', HttpStatus.NOT_FOUND)
    }

    return promoData
  }
}
