import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, UpdateQuery } from 'mongoose'
import { Product, ProductDocument } from '../models/product.model'
import { ProductDTO } from '~/dtos/product.dto'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec()
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.productModel.findById(id).exec()
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.productModel.find({ name: { $regex: new RegExp(name, 'i') } }).exec()
  }

  async findByExactName(name: string): Promise<Product[]> {
    return await this.productModel.find({ name: { $regex: new RegExp(`^${name}$`, 'i') } }).exec()
  }

  async create(createProductDto: ProductDTO): Promise<Product> {
    await this.validateProduct(createProductDto)
    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save()
  }

  async update(id: string, updateProductDto: UpdateQuery<ProductDTO>): Promise<Product | null> {
    await this.validateProduct(updateProductDto as ProductDTO)
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec()
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }

  private async validateProduct(product: ProductDTO) {
    const existingProducts = await this.findByExactName(product.name)
    if (existingProducts.length > 0) {
      throw new BadRequestException(`Product name existed: ${product.name}`)
    }
  }
}
