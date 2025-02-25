import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ProductsService } from '../services/product.service'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Post()
  async create(@Body() createProductDto: ProductDTO) {
    return this.productsService.create(createProductDto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
