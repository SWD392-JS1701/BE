import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleRepository } from '../repositories/schedule.repository';
import { Schedule, ScheduleDocument, Slot } from '../models/schedule.model';
import { CreateScheduleDto } from '../dtos/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async createSchedule(createScheduleDto : CreateScheduleDto): Promise<ScheduleDocument> {
    return this.scheduleRepository.create(createScheduleDto);
  }

  async getSchedules(): Promise<ScheduleDocument[]> {
    return this.scheduleRepository.findAll();
  }

  async getScheduleById(id: string): Promise<ScheduleDocument> {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
    return schedule;
  }

  async getSlotById(dayOfWeek: string, slotId: string): Promise<Slot> {
    const slot = await this.scheduleRepository.findSlotById(dayOfWeek, slotId);
    if (!slot) {
      throw new NotFoundException(
        `Slot with id ${slotId} not found on day ${dayOfWeek}`,
      );
    }
    return slot;
  }

  async updateSchedule(id: string, scheduleData: Partial<Schedule>): Promise<ScheduleDocument> {
    const schedule = await this.scheduleRepository.update(id, scheduleData);
    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
    return schedule;
  }

  async deleteSchedule(id: string): Promise<ScheduleDocument> {
    const schedule = await this.scheduleRepository.delete(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${id} not found`);
    }
    return schedule;
  }
}
