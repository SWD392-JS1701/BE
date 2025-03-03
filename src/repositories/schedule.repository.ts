import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument, Slot } from '../models/schedule.model';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  async create(schedule: Partial<Schedule>): Promise<ScheduleDocument> {
    const newSchedule = new this.scheduleModel(schedule);
    return newSchedule.save();
  }

  async findAll(): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find().exec();
  }

  async findById(id: string): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findById(id).exec();
  }

  async findSlotById(dayOfWeek: string, slotId: string): Promise<Slot | null> {
    const schedule = await this.scheduleModel
      .findOne(
        { dayOfWeek, 'slots.slotId': slotId },
        { 'slots.$': 1 } 
      )
      .exec();

    return schedule && schedule.slots && schedule.slots.length > 0
      ? schedule.slots[0]
      : null;
  }

  async update(id: string, schedule: Partial<Schedule>): Promise<ScheduleDocument | null> {
    return this.scheduleModel
      .findByIdAndUpdate(id, schedule, { new: true })
      .exec();
  }

  async delete(id: string): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findByIdAndDelete(id).exec();
  }
}
