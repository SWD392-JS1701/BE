import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ResetToken extends Document {
  @Prop({ required: true })
  token!: string;
  @Prop({ required: true })
  userId!: string;
  @Prop({ required: true })
  expiryDate!: Date;
}

export const ResetTokenModel = SchemaFactory.createForClass(ResetToken);