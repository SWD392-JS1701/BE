import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Doctor, DoctorDocument } from '../models/doctor.model'

@Injectable()
export class DoctorRepository {
  constructor(@InjectModel(Doctor.name) private readonly doctorModel: Model<DoctorDocument>) {}

  /* Create a new doctor */
  async create(doctorData: Partial<Doctor>): Promise<Doctor> {
    const newDoctor = new this.doctorModel(doctorData)
    return newDoctor.save()
  }

  /* Get all doctors */
  async findAll(): Promise<Doctor[]> {
    return this.doctorModel.find().exec()
  }

  /* Get a doctor by ID */
  async findById(id: string): Promise<Doctor | null> {
    const objectId = new Types.ObjectId(id)
    return this.doctorModel.findById(objectId).exec()
  }

  /* Update doctor */
  async update(id: string, updateData: Partial<Doctor>): Promise<Doctor | null> {
    return this.doctorModel.findByIdAndUpdate(id, { $set: updateData, updatedAt: new Date() }, { new: true }).exec()
  }

  /* Delete doctor */
  async delete(id: string): Promise<void> {
    const objectId = new Types.ObjectId(id)
    const doctor = await this.findById(id)
    if (!doctor) throw new NotFoundException('Doctor not found')

    await this.doctorModel.updateOne({ _id: objectId }, { $set: { status: 0 } })
  }
}
