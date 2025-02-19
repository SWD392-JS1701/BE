import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MembershipDocument = HydratedDocument<Membership>;

@Schema({ timestamps: true }) 
export class Membership {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Number, default: 0 })
  discount_percentage!: number;

  @Prop({ type: Number, default: 0 })
  point_value!: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
