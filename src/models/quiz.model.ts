import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type QuizDocument = Quiz & Document

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, unique: true })
  quiz_ID!: string

  @Prop({ required: true, maxlength: 200 })
  quiz_Name!: string
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)
