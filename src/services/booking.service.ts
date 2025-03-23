import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../models/booking.model';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {     
      const booking = new this.bookingModel({
        ...createBookingDto,
        booking_id: uuidv4(),  // Generate a unique booking_id
      });
      return await booking.save();
    } catch (error) {
      console.error("Booking creation error:", error);
      throw new Error("Failed to create booking");
    }
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

  async findByUserId(userId: string): Promise<Booking[]> {
    const bookings = await this.bookingModel.find({ user_id: userId }).exec();
    if (!bookings || bookings.length === 0) {
      throw new NotFoundException(`No bookings found for user with ID ${userId}`);
    }
    return bookings;
  }

  async hasActiveBooking(userId: string): Promise<boolean> {
    try {
      const activeBooking = await this.bookingModel.findOne({
        user_id: userId,
        status: { $ne: 'Cancelled' }
      }).exec();
      
      return !!activeBooking;
    } catch (error) {
      return false;
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
    if (!updatedBooking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return updatedBooking;
  }

  async updateStatus(id: string, status: string): Promise<Booking> {
    const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
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
