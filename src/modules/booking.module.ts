import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../models/booking.model';
import { BookingController } from '../controllers/booking.controller';
import { BookingService } from '../services/booking.service';
import { BookingRepository } from '../repositories/booking.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
  exports: [BookingService, BookingRepository],
})
export class BookingModule {}
