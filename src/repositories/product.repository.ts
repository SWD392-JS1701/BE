import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid product ID format', HttpStatus.BAD_REQUEST)
    }
    const objectId = new Types.ObjectId(id)
    return this.productModel.findById(objectId).exec()
  }

  async searchProduct({
    name,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    supplier
  }: {
    name?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    maxRating?: number
    supplier?: string
  }): Promise<Product[]> {
    try {
      // Get ALL products from the database
      const allProducts = await this.productModel.find().exec()

      // Filter them in-memory
      const filteredProducts = allProducts.filter((product) => {
        if (name && !product.name.toLowerCase().includes(name.toLowerCase())) return false
        if (minPrice !== undefined && product.price < minPrice) return false
        if (maxPrice !== undefined && product.price > maxPrice) return false
        if (minRating !== undefined && product.product_rating < minRating) return false
        if (maxRating !== undefined && product.product_rating > maxRating) return false
        if (supplier && !product.Supplier.toLowerCase().includes(supplier.toLowerCase())) return false
        return true
      })

      return filteredProducts
    } catch (error) {
      console.error('Error fetching and filtering products:', error)
      throw new HttpException('Failed to search for products', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByExactName(name: string): Promise<Product | null> {
    return this.productModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } }).exec()
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const newProduct = new this.productModel(productData)
    return newProduct.save()
  }

  async update(id: string, updateData: Partial<Product>): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid product ID format', HttpStatus.BAD_REQUEST)
    }
    return this.productModel.findByIdAndUpdate(id, { $set: updateData, updatedAt: new Date() }, { new: true }).exec()
  }

  async delete(id: string): Promise<Product | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid product ID format', HttpStatus.BAD_REQUEST)
    }
    return this.productModel.findByIdAndDelete(id).exec()
  }
}
