import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quiz_ID!: Types.ObjectId;

  @Prop({ required: true, maxlength: 200 })
  content!: string;

  @Prop({ required: true, maxlength: 150 })
  answer!: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
