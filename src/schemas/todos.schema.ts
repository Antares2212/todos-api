import { Schema, Prop,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment.schema";

export type TodosDocument = Todos & Document

@Schema()
export class Todos {
  @Prop({required: true})
  title: string

  @Prop({required: true})
  desc: string

  @Prop({required: true})
  status: string

  @Prop({required: true})
  date: Date

  @Prop({ type: [{ type: Number, ref: 'Comment' }] })
  comments: Comment[]
}

export const TodosSchema = SchemaFactory.createForClass(Todos)