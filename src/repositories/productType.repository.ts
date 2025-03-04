import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { ProductType, ProductTypeDocument } from '~/models/productType.model'

@Injectable()
export class ProductTypeRepository {
  constructor(@InjectModel(ProductType.name) private readonly productTypeModel: Model<ProductTypeDocument>) {}

  async findAll(): Promise<ProductType[]> {
    return this.productTypeModel.find().exec()
  }

  async findById(id: string): Promise<ProductType | null> {
    const objectId = new Types.ObjectId(id)
    return this.productTypeModel.findById(objectId).exec()
  }

  async findByName(name: string): Promise<ProductType[]> {
    return this.productTypeModel.find({ name: { $regex: new RegExp(name, 'i') } }).exec()
  }

  async findByExactName(name: string): Promise<ProductType | null> {
    return this.productTypeModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } }).exec()
  }

  async create(productTypeData: Partial<ProductType>): Promise<ProductType> {
    const newProductType = new this.productTypeModel(productTypeData)
    return newProductType.save()
  }

  async update(id: string, updateData: Partial<ProductType>): Promise<ProductType | null> {
    return this.productTypeModel.findByIdAndUpdate(id, { $set: updateData }, { new: true }).exec()
  }

  async delete(id: string): Promise<ProductType | null> {
    return this.productTypeModel.findByIdAndDelete(id).exec()
  }
}
