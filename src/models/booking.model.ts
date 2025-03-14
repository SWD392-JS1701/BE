import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true, unique: true })
  booking_id!: string;

  @Prop({ required: true })
  user_id!: string;

  @Prop({ required: true })
  doctor_id!: string;

  @Prop({ required: true })
  combo_id!: string;

  @Prop({ required: true })
  booking_time!: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
