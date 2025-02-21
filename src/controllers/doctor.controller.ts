import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DoctorService } from '../services/doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from '../dtos/doctor.dto';
import { Doctor } from '../models/doctor.model';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor successfully created', type: Doctor })
  async create(@Body() createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of all doctors', type: [Doctor] })
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor found', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async findOne(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor updated successfully', type: Doctor })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.doctorService.delete(id);
  }
}
