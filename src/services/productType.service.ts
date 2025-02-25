import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { ProductTypeDTO, UpdateProductTypeDTO } from '~/dtos/productType.dto'
import { ProductType } from '~/models/productType.model'
import { ProductTypeRepository } from '~/repositories/productType.repository'

@Injectable()
export class ProductTypesService {
  constructor(private readonly productTypeRepository: ProductTypeRepository) {}

  async findAll(): Promise<ProductType[]> {
    return this.productTypeRepository.findAll()
  }

  async findOne(id: string): Promise<ProductType> {
    const productType = await this.productTypeRepository.findById(id)
    if (!productType) throw new NotFoundException(`Product Type with ID ${id} not found`)
    return productType
  }

  async findByName(name: string): Promise<ProductType[]> {
    return this.productTypeRepository.findByName(name)
  }

  async findByExactName(name: string): Promise<ProductType | null> {
    return this.productTypeRepository.findByExactName(name)
  }

  async create(createProductTypeDto: ProductTypeDTO): Promise<ProductType> {
    const existingProductType = await this.findByExactName(ProductTypeDTO.name)
    if (existingProductType) throw new BadRequestException(`Product Type name already exists: ${ProductTypeDTO.name}`)

    return this.productTypeRepository.create(createProductTypeDto)
  }

  async update(id: string, updateProductTypeDto: UpdateProductTypeDTO): Promise<ProductType> {
    const filteredUpdate = Object.fromEntries(
      Object.entries(updateProductTypeDto).filter(([, value]) => value !== null && value !== undefined && value !== '')
    )

    if (Object.keys(filteredUpdate).length === 0) {
      throw new BadRequestException('No valid fields provided for update')
    }

    const updatedProductType = await this.productTypeRepository.update(id, filteredUpdate)
    if (!updatedProductType) {
      throw new NotFoundException(`Product Type with ID ${id} not found`)
    }
    return updatedProductType
  }

  async remove(id: string): Promise<ProductType> {
    const deletedProductType = await this.productTypeRepository.delete(id)
    if (!deletedProductType) {
      throw new NotFoundException(`Product Type with ID ${id} not found`)
    }
    return deletedProductType
  }
}
