import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from "src/schemas/todos.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Todos.name, schema: TodosSchema }
  ])],
  controllers: [],
  providers: []
})

export class TodosModule {}