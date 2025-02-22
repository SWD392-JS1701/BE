import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {

  @Prop({ required: true })
  user_Id!: string;

  @Prop({ required: true, maxlength: 100 })
  certification!: string;

  @Prop()
  schedule!: string;

  @Prop()
  description!: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
