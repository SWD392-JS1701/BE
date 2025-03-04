import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ProductsService } from '../services/product.service'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Products' })
  async findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() createProductDto: ProductDTO) {
    return this.productsService.create(createProductDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by id' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
