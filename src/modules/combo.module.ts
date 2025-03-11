import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Combo, ComboSchema } from '../models/combo.model';
import { ComboRepository } from '../repositories/combo.repository';
import { ComboService } from '../services/combo.service';   
import { ComboController } from '../controllers/combo.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Combo.name, schema: ComboSchema }])],
  controllers: [ComboController],
  providers: [ComboService, ComboRepository],
  exports: [ComboService],
})
export class ComboModule {}
