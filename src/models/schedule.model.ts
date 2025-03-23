import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Slot {

  @Prop({ required: true })
  slotId!: string;

  @Prop({ required: true })
  startTime!: string; 

  @Prop({ required: true })
  endTime!: string;

  @Prop({ type: String, default: null })
  doctorId?: string | null;

  @Prop({ type: String, default: null })
  doctorName?: string | null;

  @Prop({ type: String, default: null })
  specialization?: string | null;

  @Prop({ type: String, default: 'available' })
  status!: string;

  @Prop({ type: Types.ObjectId, ref: 'Schedule'})
  scheduleId!: Types.ObjectId;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);

@Schema({ timestamps: true })
export class Schedule {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  dayOfWeek!: string;

  @Prop({ type: [SlotSchema], default: [] })
  slots!: Slot[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
