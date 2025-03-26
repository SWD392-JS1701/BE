import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';

@Injectable()
export class BookingRepository {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(bookingData: CreateBookingDto): Promise<Booking> {
    return new this.bookingModel(bookingData).save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    return this.bookingModel.findById(new Types.ObjectId(id)).exec();
  }

  async update(id: string, updateData: UpdateBookingDto): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return { message: "Booking successfully deleted" };
  }
}
