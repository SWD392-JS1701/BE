import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common'
import { ScheduleService } from '../services/schedule.service'
import { Schedule, ScheduleDocument, Slot } from '../models/schedule.model'
import { CreateScheduleDto, UpdateScheduleDto, UpdateSlotDto } from '~/dtos/schedule.dto'

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<ScheduleDocument> {
    return this.scheduleService.createSchedule(createScheduleDto)
  }

  @Get()
  async getSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleService.getSchedules()
  }

  @Get(':id')
  async getScheduleById(@Param('id') id: string): Promise<ScheduleDocument> {
    return this.scheduleService.getScheduleById(id)
  }

  @Get(':dayOfWeek/slots/:slotId')
  async getSlotById(@Param('dayOfWeek') dayOfWeek: string, @Param('slotId') slotId: string): Promise<Slot> {
    return this.scheduleService.getSlotById(dayOfWeek, slotId)
  }

  @Put(':id')
  async updateSchedule(@Param('id') id: string, @Body() scheduleData: UpdateScheduleDto): Promise<ScheduleDocument> {
    return this.scheduleService.updateSchedule(id, scheduleData)
  }

  @Put(':scheduleId/slots/:slotId')
  async updateSlot(
    @Param('scheduleId') scheduleId: string,
    @Param('slotId') slotId: string,
    @Body() updateSlotDto: UpdateSlotDto
  ) {
    return await this.scheduleService.updateSlot(scheduleId, slotId, updateSlotDto)
  }

  @Get('slots/doctor/:doctorId')
  async getSlotsByDoctorId(@Param('doctorId') doctorId: string): Promise<Slot[]> {
    return this.scheduleService.getSlotsByDoctorId(doctorId)
  }
}
