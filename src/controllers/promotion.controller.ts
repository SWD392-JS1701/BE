import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreatePromotionDto } from '~/dtos/createPromotion.dto'
import { UpdatePromotionDto } from '~/dtos/updatePromotion.dto'
import { PromotionService } from '~/services/promotion.service'

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto)
  }

  @Get()
  findAll() {
    return this.promotionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionService.update(id, updatePromotionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionService.remove(id)
  }
}
