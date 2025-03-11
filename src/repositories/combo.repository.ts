import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Combo, ComboDoctype } from '../models/combo.model';
import { CreateComboDto, UpdateComboDto } from '../dtos/combo.dto';

@Injectable()
export class ComboRepository {
  constructor(@InjectModel(Combo.name) private comboModel: Model<ComboDoctype>) {}

  async create(createComboDto: CreateComboDto): Promise<Combo> {
    const combo = new this.comboModel(createComboDto);
    return combo.save();
  }

  async findAll(): Promise<Combo[]> {
    return this.comboModel.find().exec();
  }

  async findById(id: string): Promise<Combo | null> {
    return this.comboModel.findById(id).exec();
  }

  async update(id: string, updateComboDto: UpdateComboDto): Promise<Combo | null> {
    return this.comboModel.findByIdAndUpdate(id, updateComboDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Combo | null> {
    return this.comboModel.findByIdAndDelete(id).exec();
  }
}
