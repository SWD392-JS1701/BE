import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Product, ProductDocument } from '../models/product.model'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec()
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`)
    return product
  }

  async findByName(name: string): Promise<Product[]> {
    return this.productModel.find({ name: { $regex: new RegExp(name, 'i') } }).exec()
  }

  async findByExactName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } }).exec()
  }

  async create(createProductDto: ProductDTO): Promise<Product> {
    const existingProduct = await this.findByExactName(createProductDto.name)
    if (existingProduct) throw new BadRequestException(`Product name already exists: ${createProductDto.name}`)

    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save()
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Product> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateProductDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    )

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update')
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(id, filteredUpdate, { new: true }).exec()
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return updatedProduct
  }

  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec()
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return deletedProduct
  }
}
