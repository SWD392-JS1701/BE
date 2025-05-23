import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PromotedProductRepository } from '../repositories/promotedProduct.repository'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProduct } from '~/models/promotedProduct.model'
import { Promotion } from '~/models/promotion.model'

@Injectable()
export class PromotedProductService {
  constructor(private readonly promotedProductRepository: PromotedProductRepository) {}

  async create(createPromotedProductDto: CreatePromotedProductDto): Promise<PromotedProduct> {
    const existingPromotedProduct = await this.findAll()
    const isDuplicate = existingPromotedProduct.some(
      (product) =>
        product.promotion_id === createPromotedProductDto.promotion_id &&
        product.product_id === createPromotedProductDto.product_id
    )
    if (isDuplicate) throw new BadRequestException(`Promoted product already exists.`)
    return this.promotedProductRepository.create(createPromotedProductDto)
  }

  async update(
    promotedProductId: string,
    updatedPromotedProductDto: Partial<CreatePromotedProductDto>
  ): Promise<PromotedProduct | null> {
    return this.promotedProductRepository.update(promotedProductId, updatedPromotedProductDto)
  }

  async findAll(): Promise<PromotedProduct[]> {
    return this.promotedProductRepository.findAll()
  }

  async findOne(id: string): Promise<PromotedProduct> {
    const promotedProduct = await this.promotedProductRepository.findById(id)
    if (!promotedProduct) {
      throw new NotFoundException(`Promoted product with ID ${id} not found`)
    }
    return promotedProduct
  }

  async remove(id: string): Promise<PromotedProduct> {
    const removedPromotedProduct = await this.promotedProductRepository.delete(id)
    if (!removedPromotedProduct) {
      throw new NotFoundException(`Promoted product with ID ${id} not found`)
    }
    return removedPromotedProduct
  }

  async findPromotionsByProductId(productId: string): Promise<Promotion[]> {
    return this.promotedProductRepository.findPromotionsByProductId(productId)
  }
}
