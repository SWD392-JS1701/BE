import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'
import { ProductTypeDTO, UpdateProductTypeDTO } from '~/dtos/productType.dto'
import { ProductTypesService } from '~/services/productType.service'

@Controller('producttypes')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all productTypes' })
  async findAll() {
    return this.productTypesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get productType by id' })
  async findOne(@Param('id') id: string) {
    return this.productTypesService.findOne(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new productType' })
  async create(@Body() createproductTypeDto: ProductTypeDTO) {
    return this.productTypesService.create(createproductTypeDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a productType by id' })
  async update(@Param('id') id: string, @Body() updateproductTypeDto: UpdateProductTypeDTO) {
    return this.productTypesService.update(id, updateproductTypeDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a productType by id' })
  async remove(@Param('id') id: string) {
    return this.productTypesService.remove(id)
  }
}
