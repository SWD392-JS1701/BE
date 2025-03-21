import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Schedule, ScheduleDocument, Slot } from '../models/schedule.model'
import { UpdateScheduleDto, UpdateSlotDto } from '~/dtos/schedule.dto'

@Injectable()
export class ScheduleRepository {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>) {}

  async create(schedule: Partial<Schedule>): Promise<ScheduleDocument> {
    const newSchedule = new this.scheduleModel(schedule)
    return newSchedule.save()
  }

  async findAll(): Promise<ScheduleDocument[]> {
    return this.scheduleModel.find().exec()
  }

  async findById(id: string): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findById(id).exec()
  }

  async findSlotById(dayOfWeek: string, slotId: string): Promise<Slot | null> {
    const schedule = await this.scheduleModel.findOne({ dayOfWeek, 'slots.slotId': slotId }, { 'slots.$': 1 }).exec()

    return schedule && schedule.slots && schedule.slots.length > 0 ? schedule.slots[0] : null
  }

  async update(id: string, updateData: UpdateScheduleDto): Promise<ScheduleDocument | null> {
    return this.scheduleModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
  }

  async updateSlot(scheduleId: string, slotId: string, updateData: UpdateSlotDto): Promise<Schedule> {
    const schedule = await this.scheduleModel.findById(scheduleId)
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${scheduleId} not found`)
    }

    const slot = schedule.slots.find((slot) => slot.slotId === slotId)
    if (!slot) {
      throw new NotFoundException(`Slot with ID ${slotId} not found in schedule ${scheduleId}`)
    }

    Object.assign(slot, updateData)
    return await schedule.save()
  }

  async findAllSlotsByDoctorId(doctorId: string): Promise<(Slot & { dayOfWeek: string })[]> {
    const schedules = await this.scheduleModel
      .find({
        'slots.doctorId': doctorId
      })
      .exec()

    const matchingSlots: (Slot & { dayOfWeek: string })[] = []

    for (const schedule of schedules) {
      const slots = schedule.slots
        .filter((slot) => slot.doctorId === doctorId)
        .map((slot) => ({
          ...JSON.parse(JSON.stringify(slot)),
          dayOfWeek: schedule.dayOfWeek
        }))
      matchingSlots.push(...slots)
    }

    return matchingSlots
  }

  async findSchedulesByDoctorId(doctorId: string): Promise<ScheduleDocument[]> {
    return this.scheduleModel
      .find({
        'slots.doctorId': doctorId
      })
      .exec()
  }
}
