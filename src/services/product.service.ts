import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { ProductRepository } from '../repositories/product.repository'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'
import { Product } from '../models/product.model'

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`)
    return product
  }

  async findByName(name: string): Promise<Product[]> {
    return this.productRepository.findByName(name)
  }

  async findByExactName(name: string): Promise<Product | null> {
    return this.productRepository.findByExactName(name)
  }

  async create(createProductDto: ProductDTO): Promise<Product> {
    const existingProduct = await this.findByExactName(createProductDto.name)
    if (existingProduct) throw new BadRequestException(`Product name already exists: ${createProductDto.name}`)

    return this.productRepository.create(createProductDto)
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Product> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateProductDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    )

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update')
    }

    const updatedProduct = await this.productRepository.update(id, filteredUpdate)
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return updatedProduct
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productRepository.delete(id)
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return deletedProduct
  }
}
