import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, UpdateQuery } from 'mongoose'
import { Product, ProductDocument } from '../models/product.model'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec()
  }

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto)
    return createdProduct.save()
  }

  async update(id: string, updateProductDto: UpdateQuery<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec()
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }
}
