import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from "src/controllers/todos.controller";
import { Todos, TodosSchema } from "src/schemas/todos.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Todos.name, schema: TodosSchema }
  ])],
  controllers: [TodosController],
  providers: []
})

export class TodosModule {}