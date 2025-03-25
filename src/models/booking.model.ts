import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ required: true })
  user_id!: string;

  @Prop({ required: true })
  doctor_id!: string;

  @Prop({ required: true })
  combo_id!: string;

  @Prop({ required: true })
  booking_time!: Date;

  @Prop({ required: true })
  booking_date!: string;

  @Prop({ required: true })
  dayofweek!: string;

  @Prop({ required: true, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' })
  status!: string;

  @Prop({ type: Types.ObjectId, ref: 'Schedule' })
  scheduleId!: Types.ObjectId;

  @Prop({ required: true })
  slotId!: string;

  @Prop({ required: true })
  type!: string;

  @Prop({ type: String, default: '' })
  description?: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
