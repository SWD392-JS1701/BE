import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';
import { Booking } from '../models/booking.model';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async createBooking(dto: CreateBookingDto): Promise<Booking> {
    return this.bookingRepository.create(dto);
  }

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingRepository.findAll();
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
    return booking;
  }

  async updateBooking(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const updatedBooking = await this.bookingRepository.update(id, dto);
    if (!updatedBooking) throw new NotFoundException(`Booking with ID ${id} not found`);
    return updatedBooking;
  }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
