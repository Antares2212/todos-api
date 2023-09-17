import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from "src/controllers/todos.controller";
import { AutoId, AutoIdSchema } from "src/schemas/auto-id.schema";
import { Todos, TodosSchema } from "src/schemas/todos.schema";
import { AutoIdService } from "src/services/auto-id.service";
import { TodosService } from "src/services/todos.service";
import { Comment, CommentSchema } from "src/schemas/comment.schema";
import { CommentService } from "src/services/comment.service";
import { CommentController } from "src/controllers/comment.controller";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Todos.name, schema: TodosSchema },
    { name: AutoId.name, schema: AutoIdSchema },
    { name: Comment.name, schema: CommentSchema },
  ])],
  controllers: [TodosController, CommentController],
  providers: [TodosService, AutoIdService, CommentService]
})

export class TodosModule {}