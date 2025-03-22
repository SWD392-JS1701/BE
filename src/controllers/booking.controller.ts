import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto, UpdateBookingDto } from '../dtos/booking.dto';
import { Booking } from '../models/booking.model';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking successfully created', type: Booking })
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'List of all bookings', type: [Booking] })
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking found', type: Booking })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findOne(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking updated successfully', type: Booking })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async delete(@Param('id') id: string) {
    await this.bookingService.delete(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all bookings for a specific user' })
  @ApiResponse({ status: 200, description: 'List of user bookings', type: [Booking] })
  @ApiResponse({ status: 404, description: 'No bookings found for user' })
  async findByUserId(@Param('userId') userId: string): Promise<Booking[]> {
    return this.bookingService.findByUserId(userId);
  }

  @Get('user/:userId/active')
  @ApiOperation({ summary: 'Check if user has an active booking' })
  @ApiResponse({ status: 200, description: 'Boolean indicating if user has an active booking', type: Boolean })
  async hasActiveBooking(@Param('userId') userId: string): Promise<boolean> {
    return this.bookingService.hasActiveBooking(userId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update booking status' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<Booking> {
    return this.bookingService.updateStatus(id, body.status);
  }
}
