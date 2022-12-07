import { Body, Controller, Param, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Post()
  async createTodoList(@Body() body: { title: string; email: string }) {
    const { title, email } = body;
    return this.todoListService.createTodoList(title, email);
  }

  @Post(':todoListId/todo')
  async createTodo(
    @Body() body: { title: string; content: string },
    @Param('todoListId') todoListId: string
  ) {
    const { title, content } = body;
    return this.todoListService.createTodo(
      title,
      content,
      parseInt(todoListId)
    );
  }
}
