import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('Задание не удалось найти', HttpStatus.NOT_FOUND);
  }
}

export class TaskNotCreatedException extends HttpException {
  constructor() {
    super('Ошибка при создании задания', HttpStatus.NOT_FOUND);
  }
}

export class CommentNotFoundException extends HttpException {
  constructor() {
    super('Комментарий не удалось найти', HttpStatus.NOT_FOUND);
  }
}