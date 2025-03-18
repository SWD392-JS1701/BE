import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { CreatePromotedProductDto } from '~/dtos/promotedProduct.dto'
import { PromotedProductService } from '~/services/promotedProduct.service'

@Controller('promoted-products')
export class PromotedProductController {
  constructor(private readonly promotedProductService: PromotedProductService) {}

  @Post()
  create(@Body() createPromotedProductDto: CreatePromotedProductDto) {
    return this.promotedProductService.create(createPromotedProductDto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedPromotedProductDto: Partial<CreatePromotedProductDto>) {
    return this.promotedProductService.update(id, updatedPromotedProductDto)
  }

  @Get()
  findAll() {
    return this.promotedProductService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotedProductService.findOne(id)
  }

  @Get('/product/:productId')
  async findPromotionsByProductId(@Param('productId') productId: string) {
    return this.promotedProductService.findPromotionsByProductId(productId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotedProductService.remove(id)
  }
}
