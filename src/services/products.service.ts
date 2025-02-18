import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, UpdateQuery } from 'mongoose'
import { Product, ProductDocument } from '../models/products.model'

interface ProductDTO {
  name: string
  product_rating?: number
  description?: string
  price: number
  stock: number
  product_type_id: number
  image_url?: string
  Supplier?: string
  expired_date?: Date
  volume?: number
}

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
    await this.validateProduct(updateProductDto)
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec()
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }

  private async validateProduct(product: Partial<ProductDTO>) {
    if (!product.name || typeof product.name !== 'string') {
      throw new BadRequestException('Invalid product name')
    }
    if ((await this.findByExactName(product.name))[0] != null) {
      throw new BadRequestException('Product name existed' + product.name)
    }
    if (
      product.product_rating !== undefined &&
      (typeof product.product_rating !== 'number' || product.product_rating < 0 || product.product_rating > 5)
    ) {
      throw new BadRequestException('Invalid product rating')
    }
    if (typeof product.price !== 'number' || product.price < 0) {
      throw new BadRequestException('Invalid price')
    }
    if (typeof product.stock !== 'number' || product.stock < 0) {
      throw new BadRequestException('Invalid stock')
    }
    if (typeof product.product_type_id !== 'number') {
      throw new BadRequestException('Invalid product type ID')
    }
    if (product.expired_date && isNaN(Date.parse(product.expired_date.toString()))) {
      throw new BadRequestException('Invalid expired date')
    }
    if (product.volume !== undefined && (typeof product.volume !== 'number' || product.volume < 0)) {
      throw new BadRequestException('Invalid volume')
    }
  }
}
