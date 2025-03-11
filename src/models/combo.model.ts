import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from 'mongoose'

export type ComboDoctype = HydratedDocument<Combo>

@Schema()
export class Combo
{
  @Prop({ required: true })
  name!: string

  @Prop({ required: true })
  type!: string

  @Prop({ required: true })
  price!: number

  @Prop({ required: true })
  description!: string
}

export const ComboSchema = SchemaFactory.createForClass(Combo)