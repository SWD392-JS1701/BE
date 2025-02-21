import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from '../models/doctor.model';
import { CreateDoctorDto, UpdateDoctorDto } from '../dtos/doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = new this.doctorModel(createDoctorDto);
    return newDoctor.save();
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec();
  }

  async findOne(doctorId: number): Promise<Doctor> {
    const doctor = await this.doctorModel.findOne({ doctor_Id: doctorId }).exec();
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    return doctor;
  }

  async update(doctorId: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const updatedDoctor = await this.doctorModel.findOneAndUpdate(
      { doctor_Id: doctorId },
      updateDoctorDto,
      { new: true }
    );

    if (!updatedDoctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    return updatedDoctor;
  }

  async delete(doctorId: number): Promise<{ message: string }> {
    const result = await this.doctorModel.deleteOne({ doctor_Id: doctorId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }
    return { message: 'Doctor deleted successfully' };
  }
}
