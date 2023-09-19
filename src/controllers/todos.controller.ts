import { Get, Post, Put, Delete, Body, Param, Controller } from '@nestjs/common';
import { TodosDto } from 'src/dto/todos.dto';
import { Todos } from 'src/schemas/todos.schema';
import { TodosService } from 'src/services/todos.service';

@Controller('task')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAll() {
    return 'all'
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Todos> {
    return this.todosService.getOne(id)
  }

  @Post()
  create(@Body() todosDto: TodosDto): Promise<Todos> {
    return this.todosService.create(todosDto)
  }

  @Put(':id') 
  update(@Param('id') id: number) {
    return id
  }

  @Delete('id')
  delete(@Param('id') id: number) {
    return id
  }
}