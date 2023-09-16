import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import { Todos } from "./todos.schema";

export type TodosDocument = Comment & Document

@Schema()
export class Comment {
  @Prop({required: true})
  author: string

  @Prop({required: true})
  text: string

  @Prop({required: true})
  date: Date

  @Prop({ type: [{ type: Number, ref: 'Todos' }] })
  task: Todos
}

export const CommentSchema = SchemaFactory.createForClass(Comment)