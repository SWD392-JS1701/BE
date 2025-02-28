import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import { Schedule, ScheduleDocument, Slot } from '../models/schedule.model';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async createSchedule(@Body() scheduleData: Partial<Schedule>): Promise<ScheduleDocument> {
    return this.scheduleService.createSchedule(scheduleData);
  }

  @Get()
  async getSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleService.getSchedules();
  }

  @Get(':id')
  async getScheduleById(@Param('id') id: string): Promise<ScheduleDocument> {
    return this.scheduleService.getScheduleById(id);
  }

  @Get(':dayOfWeek/slots/:slotId')
  async getSlotById(
    @Param('dayOfWeek') dayOfWeek: string,
    @Param('slotId') slotId: string
  ): Promise<Slot> {
    return this.scheduleService.getSlotById(dayOfWeek, slotId);
  }

  @Put(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() scheduleData: Partial<Schedule>
  ): Promise<ScheduleDocument> {
    return this.scheduleService.updateSchedule(id, scheduleData);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string): Promise<ScheduleDocument> {
    return this.scheduleService.deleteSchedule(id);
  }
}
