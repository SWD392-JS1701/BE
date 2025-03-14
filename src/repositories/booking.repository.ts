import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>) {}

  async create(data: Partial<Booking>): Promise<Booking> {
    return new this.bookingModel(data).save();
  }

  async findAll(): Promise<Booking[]> { 
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Booking>): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.bookingModel.findByIdAndDelete(id);
  }
}
