import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, unique: true, default: uuidv4 })
  booking_id!: string;
  
  @Prop({ required: true })
  user_id!: string;

  @Prop({ required: true })
  doctor_id!: string;

  @Prop({ required: true })
  combo_id!: string;

  @Prop({ required: true })
  booking_time!: Date;

  @Prop({required: true})
  booking_date!: string;

  @Prop({ required: true })
  dayofweek!: string;

  @Prop({ required: true, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' })
  status!: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
