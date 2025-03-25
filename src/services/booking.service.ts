import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingModel.create(createBookingDto);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return updatedBooking;
  }

  async updateStatus(id: string, status: string): Promise<Booking> {
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }
    return this.update(id, { status } as UpdateBookingDto);
  }

  async delete(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();
    if (!deletedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return { message: "Booking successfully deleted" };
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(`Invalid User ID format: ${userId}`);
    }
  
    const bookings = await this.bookingModel.find({ user_id: userId }).exec();
    
    if (!bookings.length) {
      throw new NotFoundException(`No bookings found for user with ID ${userId}`);
    }
  
    return bookings;
  }
  

  async hasActiveBooking(userId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException(`Invalid User ID format: ${userId}`);
    }
  
    const activeBooking = await this.bookingModel.findOne({
      user_id: userId,
      status: { $ne: 'Cancelled' },
    }).exec();
  
    return !!activeBooking; 
  }
}
