import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
  @Prop({ required: true, unique: true })
  id: number
  
  @Prop({ required: true })
  author: string

  @Prop({ required: true })
  text: string

  @Prop()
  date: Date

  @Prop({ required: true })
  task: number
}

export const CommentSchema = SchemaFactory.createForClass(Comment)