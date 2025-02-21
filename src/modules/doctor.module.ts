import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from '../services/doctor.service';
import { DoctorController } from '../controllers/doctor.controller';
import { Doctor, DoctorSchema } from '../models/doctor.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService]
})
export class DoctorModule {}
