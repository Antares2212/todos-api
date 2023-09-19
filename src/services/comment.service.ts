import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentDocument } from 'src/schemas/comment.schema'
import { AutoIdService } from './auto-id.service'
import { commentDto } from 'src/dto/comment.dto'
import { Todos, TodosDocument } from 'src/schemas/todos.schema'
import { CommentNotFoundException, TaskNotFoundException } from 'src/exceptions/custom-exceptions'

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Todos.name) private readonly todosModel: Model<TodosDocument>,
    private readonly autoIdService: AutoIdService
  ) {}

  async createComment(commentDto: commentDto, taskId: number): Promise<Comment> {
    const newComment = new this.commentModel(commentDto);
    newComment.id = await this.autoIdService.getNextSequence('comment');
    newComment.task = taskId;
    await newComment.save();
  
    return newComment;
  }

  async create(taskId: number, commentDto: commentDto): Promise<Todos> {  
    const task = await this.todosModel.findOne({ id: taskId })      
    
    if (!task) throw new TaskNotFoundException()

    const newComment = await this.createComment(commentDto, taskId)
    task.comments.push(newComment)
    await task.save()

    return task
  }

  async update(taskId: number, commentId: number, commentDto: commentDto): Promise<Todos> {    
    const [task, comment] = await Promise.all([
      this.todosModel.findOne({ id: taskId }),
      this.commentModel.findOne({ id: commentId })
    ])
    
    if (!task) throw new TaskNotFoundException()
    if (!comment) throw new CommentNotFoundException()

    const commentIndex = task.comments.findIndex(comment => comment.id = commentId)
    if (commentIndex === -1) throw new CommentNotFoundException()
    task.comments[commentIndex] = { ...task.comments[commentIndex], ...commentDto }
    await task.save()

    return task
  }

  async delete(taskId: number, commentId: number): Promise<Todos> {  
    const task = await this.todosModel.findOne({ id: taskId })
    if (!task) throw new TaskNotFoundException()

    const commentIndex = task.comments.findIndex(comment => comment.id == commentId)
    if (commentIndex === -1) throw new CommentNotFoundException()
 
    task.comments.splice(commentIndex, 1)
    await task.save()

    return task
  }
}