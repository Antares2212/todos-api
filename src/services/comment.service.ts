import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { AutoIdService } from './auto-id.service';
import { commentDto } from 'src/dto/comment.dto';
import { Todos, TodosDocument } from 'src/schemas/todos.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Todos.name) private readonly todosModel: Model<TodosDocument>,
    private readonly autoIdService: AutoIdService
  ) {}

  async create(taskId: number, commentDto: commentDto): Promise<Todos> {  
    const task = await this.todosModel.findOne({ id: taskId })      

    if (!task) {
      throw new Error('Нет такой таски')
    }

    const newComment = new this.commentModel(commentDto)
    newComment.id = await this.autoIdService.getNextSequence('comment')
    newComment.task = task.id
    await newComment.save()

    task.comments.push(newComment)
    await task.save()

    return task
  }

  async update(taskId: number, commentId: number, commentDto: commentDto): Promise<Todos> {    
    const task = await this.todosModel.findOne({ id: taskId })
    const comment = await this.commentModel.findOne({ id: commentId })
    
    if (!task) {
      throw new Error('Нет такой таски')
    }

    if (!comment) {
      throw new Error('Нет такого комментария')
    }

    const commentIndex = task.comments.findIndex(comment => comment.id = commentId)
    if (commentIndex === -1) {
      throw new Error('Комментарий не найден');
    }

    task.comments[commentIndex] = { ...task.comments[commentIndex], ...commentDto }
    await task.save()

    return task
  }

  async delete(taskId: number, commentId: number): Promise<Todos> {  
    const task = await this.todosModel.findOne({ id: taskId });
    if (!task) {
      throw new Error('Task not found');
    }

    const commentIndex = task.comments.findIndex(comment => comment.id == commentId);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
 
    task.comments.splice(commentIndex, 1);
    await task.save();

    return task;
  }
}