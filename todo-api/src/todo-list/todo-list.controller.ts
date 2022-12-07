import { Body, Controller, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Post()
  async createTodoList(@Body() body: { title: string; email: string }) {
    const { title, email } = body;
    return this.todoListService.createTodoList(title, email);
  }
}
