import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ComboService } from '../services/combo.service';
import { CreateComboDto, UpdateComboDto } from '../dtos/combo.dto';

@Controller('combos')
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @Post()
  async create(@Body() createComboDto: CreateComboDto) {
    return this.comboService.createCombo(createComboDto);
  }

  @Get()
  async findAll() {
    return this.comboService.getAllCombos();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.comboService.getComboById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateComboDto: UpdateComboDto) {
    return this.comboService.updateCombo(id, updateComboDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.comboService.deleteCombo(id);
  }
}
