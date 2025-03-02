import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Mongoose, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username!: string

  @Prop({ required: true })
  password!: string

  @Prop()
  date_of_birth!: Date

  @Prop({ required: true, unique: true })
  email!: string

  @Prop()
  role!: string

  @Prop()
  skin_type?: string

  @Prop()
  membership_id!: string

  @Prop({ default: 0 })
  point!: number

  @Prop()
  first_name!: string

  @Prop()
  last_name!: string

  @Prop()
  phone_number?: string

  @Prop()
  address?: string

  @Prop({ default: 1 })
  status!: number

  @Prop()
  skinType?: string

  @Prop()
  sensitivity?: string

  createdAt!: Date
  updatedAt!: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
