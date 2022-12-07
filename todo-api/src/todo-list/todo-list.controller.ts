import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Post()
  async createTodoList(@Body() body: { title: string; email: string }) {
    const { title, email } = body;
    return this.todoListService.createTodoList(title, email);
  }

  @Get()
  async getTodoLists(@Body() body: { email: string }) {
    const { email } = body;

    return this.todoListService.getTodoLists(email);
  }

  @Post(':todoListId')
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

  @Get(':todoListId')
  async getTodos(@Param('todoListId') todoListId: string) {
    return this.todoListService.getTodos(parseInt(todoListId));
  }

  @Get('todo/:todoId')
  async getTodo(@Param('todoId') todoId: string) {
    return this.todoListService.getOneTodo(parseInt(todoId));
  }

  @Patch('todo/:todoId')
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() body: UpdateTodoDto
  ) {
    const { title, content } = body;
    return this.todoListService.updateTodo(title, content, parseInt(todoId));
  }
}
