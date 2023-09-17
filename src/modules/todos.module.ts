import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from "src/controllers/todos.controller";
import { AutoId, AutoIdSchema } from "src/schemas/auto-id.schema";
import { Todos, TodosSchema } from "src/schemas/todos.schema";
import { AutoIdService } from "src/services/auto-id.service";
import { TodosService } from "src/services/todos.service";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Todos.name, schema: TodosSchema },
    { name: AutoId.name, schema: AutoIdSchema }
  ])],
  controllers: [TodosController],
  providers: [TodosService, AutoIdService]
})

export class TodosModule {}