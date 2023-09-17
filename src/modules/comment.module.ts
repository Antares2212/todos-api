import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from "src/controllers/comment.controller";
import { AutoId, AutoIdSchema } from "src/schemas/auto-id.schema";
import { Comment, CommentSchema } from "src/schemas/comment.schema";
import { AutoIdService } from "src/services/auto-id.service";
import { CommentService } from "src/services/comment.service";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Comment.name, schema: CommentSchema },
    { name: AutoId.name, schema: AutoIdSchema }
  ])],
  controllers: [CommentController],
  providers: [CommentService, AutoIdService]
})

export class CommentModule {}