import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Product, ProductDocument } from '../models/product.model'

@Injectable()
export class ProductRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findById(id: string): Promise<Product | null> {
    const objectId = new Types.ObjectId(id)
    return this.productModel.findById(objectId).exec()
  }

  async findByName(name: string): Promise<Product[]> {
    return this.productModel.find({ name: { $regex: new RegExp(name, 'i') } }).exec()
  }

  async findByExactName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } }).exec()
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(productData)
    return newProduct.save()
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, { $set: updateData, updatedAt: new Date() }, { new: true }).exec()
  }

  async delete(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }
}
