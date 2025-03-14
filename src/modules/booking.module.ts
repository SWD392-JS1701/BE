import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { BookingController } from '../controllers/booking.controller';
import { BookingRepository } from '../repositories/booking.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService],
})
export class BookingModule {}
