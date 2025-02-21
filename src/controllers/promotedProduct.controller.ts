import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProductService } from '~/services/promotedProduct.service'

@Controller('promoted-products')
export class PromotedProductController {
  constructor(private readonly promotedProductService: PromotedProductService) {}

  @Post()
  create(@Body() createPromotedProductDto: CreatePromotedProductDto) {
    return this.promotedProductService.create(createPromotedProductDto)
  }

  @Get()
  findAll() {
    return this.promotedProductService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotedProductService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotedProductService.remove(id)
  }
}
