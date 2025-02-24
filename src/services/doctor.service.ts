import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorRepository } from '../repositories/doctor.repository';
import { CreateDoctorDto, UpdateDoctorDto } from '../dtos/doctor.dto';
import { Doctor } from '~/models/doctor.model';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  /* Create a new doctor */
  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = await this.doctorRepository.create({
      ...createDoctorDto,
    });
    return newDoctor;
  }

  /* Get all doctors */
  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.findAll();
  }

  /* Get a doctor by ID */
  async getDoctorById(id: string): Promise<Doctor> {
    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  /* Update doctor */
  async updateDoctor(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const updatedDoctor = await this.doctorRepository.update(id, updateDoctorDto);
    if (!updatedDoctor) throw new NotFoundException('Doctor not found');
    return updatedDoctor;
  }

  /* Delete doctor */
  async deleteDoctor(id: string): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
