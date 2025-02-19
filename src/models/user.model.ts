import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true })
  passsword!: string;

  @Prop()
  date_of_birth!: Date;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ default: 'User' }) 
  role!: string;

  @Prop()
  skin_type?: string;

  @Prop()
  membership_id!: number;

  @Prop({ default: 0 })
  point!: number;

  @Prop()
  first_name!: string;

  @Prop()
  last_name!: string;

  @Prop()
  phone_number?: string;

  @Prop()
  address?: string;

  @Prop({ default: 0 })
  status!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
