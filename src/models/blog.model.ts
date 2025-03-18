import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.model';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class Blog {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user_id!: Types.ObjectId | User;
  
  @Prop({ required: true, maxlength: 255 })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({ default: Date.now })
  created_at!: Date;

  @Prop({ default: Date.now })
  updated_at!: Date;

  author?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Add virtual field for author
BlogSchema.virtual('author').get(function(this: BlogDocument) {
  const user = this.user_id as User;
  if (user && user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`.trim();
  }
  return '';
});

