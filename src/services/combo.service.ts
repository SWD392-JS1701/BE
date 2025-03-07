import { Injectable, NotFoundException } from '@nestjs/common';
import { ComboRepository } from '../repositories/combo.repository';
import { CreateComboDto, UpdateComboDto } from '../dtos/combo.dto';
import { Combo } from '../models/combo.model';

@Injectable()
export class ComboService {
  constructor(private readonly comboRepository: ComboRepository) {}

  async createCombo(createComboDto: CreateComboDto): Promise<Combo> {
    return this.comboRepository.create(createComboDto);
  }

  async getAllCombos(): Promise<Combo[]> {
    return this.comboRepository.findAll();
  }

  async getComboById(id: string): Promise<Combo> {
    const combo = await this.comboRepository.findById(id);
    if (!combo) throw new NotFoundException('Combo not found');
    return combo;
  }

  async updateCombo(id: string, updateComboDto: UpdateComboDto): Promise<Combo> {
    const updatedCombo = await this.comboRepository.update(id, updateComboDto);
    if (!updatedCombo) throw new NotFoundException('Combo not found');
    return updatedCombo;
  }

  async deleteCombo(id: string): Promise<Combo> {
    const deletedCombo = await this.comboRepository.delete(id);
    if (!deletedCombo) throw new NotFoundException('Combo not found');
    return deletedCombo;
  }
}
