import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from '../dtos/doctor.dto';
import { Doctor } from '../models/doctor.model';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.doctorService.delete(id);
  }
}
