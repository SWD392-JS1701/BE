import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common'
import { ProductsService } from '../services/product.service'
import { ProductDTO, UpdateProductDTO } from '~/dtos/product.dto'
import { ApiOperation, ApiQuery } from '@nestjs/swagger'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Products' })
  async findAll() {
    return this.productsService.findAll()
  }

  @Get('searchProduct')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'minPrice', required: false })
  @ApiQuery({ name: 'maxPrice', required: false })
  @ApiQuery({ name: 'minRating', required: false })
  @ApiQuery({ name: 'maxRating', required: false })
  @ApiQuery({ name: 'supplier', required: false })
  async searchProduct(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('minRating') minRating?: number,
    @Query('maxRating') maxRating?: number,
    @Query('supplier') supplier?: string
  ) {
    try {
      return await this.productsService.SearchProduct(name, minPrice, maxPrice, minRating, maxRating, supplier)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error searching for products:', error.message)
      } else {
        console.error('An unknown error occurred')
      }
      throw new HttpException('Failed to search for products', HttpStatus.INTERNAL_SERVER_ERROR)
    }
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
