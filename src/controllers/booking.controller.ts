import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';
import { Booking } from '../models/booking.model';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  async create(@Body() dto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  async findAll(): Promise<Booking[]> {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiParam({ name: 'id', example: 'b123' })
  async findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.getBookingById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiParam({ name: 'id', example: 'b123' })
  async update(@Param('id') id: string, @Body() dto: UpdateBookingDto): Promise<Booking> {
    return this.bookingService.updateBooking(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking' })
  @ApiParam({ name: 'id', example: 'b123' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookingService.deleteBooking(id);
  }
}
