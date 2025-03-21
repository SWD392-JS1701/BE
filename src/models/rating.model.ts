import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type RatingDocument = HydratedDocument<Rating>

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true })
  user_id!: string

  @Prop({ required: true })
  product_id!: string

  @Prop({ required: true, min: 1, max: 5 })
  rating!: number

  @Prop({ maxlength: 255 })
  comment?: string
}

export const RatingSchema = SchemaFactory.createForClass(Rating)
