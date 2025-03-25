import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, maxlength: 200 })
  quiz_Name!: string;

  @Prop({ required: true, default: 0 })
  point!: number;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
