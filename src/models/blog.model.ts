import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ type: Types.ObjectId, ref: 'Staff', required: true })
  staff_id!: Types.ObjectId;

  @Prop({ required: true, maxlength: 255 })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

