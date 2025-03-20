import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(bookingData: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(bookingData);
    return booking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
  }

  async update(id: string, updateData: UpdateBookingDto): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.bookingModel.findByIdAndDelete(id).exec();
  }
}
