import { Get, Post, Put, Delete, Body, Param, Controller } from '@nestjs/common';
import { TodosDto } from 'src/dto/todos.dto';

@Controller('task')
export class TodosController {
  @Get()
  getAll() {
    return 'all'
  }

  @Get(':id')
  getOne(@Param('id') id: Number) {
    return id
  }

  @Post()
  create(@Body() todosDto: TodosDto) {
    return todosDto
  }

  @Put(':id') 
  update(@Param('id') id: Number) {
    return id
  }

  @Delete('id')
  delete(@Param('id') id: Number) {
    return id
  }
}