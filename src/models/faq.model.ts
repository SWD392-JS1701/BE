import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FaqDocument = HydratedDocument<Faq>;

@Schema()
export class Faq {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id!: Types.ObjectId;

  @Prop({ required: true })
  question!: string;

  @Prop({ required: true })
  answer!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);