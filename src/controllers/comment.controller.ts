import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { commentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/schemas/comment.schema';
import { Todos } from 'src/schemas/todos.schema';
import { CommentService } from 'src/services/comment.service';

@Controller('task')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:taskId/comments')
  create(
    @Param('taskId') taskId: number,
    @Body() commentDto: commentDto
  ): Promise<Todos> {
    return this.commentService.create(taskId, commentDto)
  }

  @Put('/:taskId/comment/:commentId')
  update(
    @Param('taskId') taskId: number,
    @Param('commentId') commentId: number,
    @Body() commentDto: commentDto 
  ): Promise<Todos> {
    return this.commentService.update(taskId, commentId, commentDto)
  }

  @Delete('/:taskId/comment/:commentId')
  delete(
    @Param('taskId') taskId: number,
    @Param('commentId') commentId: number
  ): Promise<Todos> {
    return this.commentService.delete(taskId, commentId)
  }
}