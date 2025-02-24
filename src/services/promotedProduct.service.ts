import { Injectable, NotFoundException } from '@nestjs/common'
import { PromotedProductRepository } from '../repositories/promotedProduct.repository'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProduct } from '~/models/promotedProduct.model'

@Injectable()
export class PromotedProductService {
  constructor(private readonly promotedProductRepository: PromotedProductRepository) {}

  async create(createPromotedProductDto: CreatePromotedProductDto): Promise<PromotedProduct> {
    return this.promotedProductRepository.create(createPromotedProductDto)
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
}
