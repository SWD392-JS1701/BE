import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { ProductRepository } from '../repositories/product.repository'
import { ProductTypeRepository } from '../repositories/productType.repository'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'
import { Product } from '../models/product.model'
import { Types } from 'mongoose'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productTypeRepository: ProductTypeRepository
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`)
    return product
  }

  async SearchProduct(
    name?: string,
    minPrice?: number,
    maxPrice?: number,
    minRating?: number,
    maxRating?: number,
    supplier?: string
  ): Promise<Product[]> {
    return this.productRepository.searchProduct({ name, minPrice, maxPrice, minRating, maxRating, supplier })
  }

  async findByExactName(name: string): Promise<Product | null> {
    return this.productRepository.findByExactName(name)
  }

  async create(createProductDto: ProductDTO): Promise<Product> {
    const existingProduct = await this.findByExactName(createProductDto.name)
    if (existingProduct) throw new BadRequestException(`Product name already exists: ${createProductDto.name}`)

    if (
      !Types.ObjectId.isValid(createProductDto.product_type_id) ||
      !(await this.productTypeRepository.findById(createProductDto.product_type_id))
    ) {
      throw new BadRequestException(`Invalid product type ID: ${createProductDto.product_type_id}`)
    }

    return this.productRepository.create(createProductDto)
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Product> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateProductDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    )

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update')
    }

    if (typeof filteredUpdate.product_type_id === 'string') {
      if (
        !Types.ObjectId.isValid(filteredUpdate.product_type_id) ||
        !(await this.productTypeRepository.findById(filteredUpdate.product_type_id))
      ) {
        throw new BadRequestException(`Invalid product type ID: ${filteredUpdate.product_type_id}`)
      }
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
