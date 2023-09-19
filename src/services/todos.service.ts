import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TodosDto } from "src/dto/todos.dto";
import { Todos, TodosDocument } from "src/schemas/todos.schema";
import { AutoIdService } from "./auto-id.service";
import { TaskNotCreatedException } from "src/exceptions/custom-exceptions";

@Injectable()
export class TodosService {
  
  constructor(
    @InjectModel(Todos.name) private readonly TodosModel: Model<TodosDocument>,
    private readonly autoIdService: AutoIdService
  ) {}

  async getAll(): Promise<Todos[]> {
    return this.TodosModel.find().exec()
  }

  async getOne(id: number): Promise<Todos> {
    return this.TodosModel.findOne({_id: id}).exec()
  }

  async create(todosDto: TodosDto): Promise<Todos> {
    try {
      const newTodos = new this.TodosModel(todosDto)
      newTodos.id = await this.autoIdService.getNextSequence('todos')
      return newTodos.save()
    } catch(error) {
      console.error("Ошибка при создании todos:", error);
      throw new TaskNotCreatedException();
    }
  }
}