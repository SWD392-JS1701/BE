import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(createBookingDto);
    return booking.save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return updatedBooking;
  }

  async delete(id: string): Promise<void> {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }
}
