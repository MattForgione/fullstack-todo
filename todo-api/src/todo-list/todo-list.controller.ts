import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async getTodoLists(@Query('email') email: string) {
    return this.todoListService.getTodoLists(email);
  }

  @Delete(':todoListId')
  async deleteTodoList(@Param('todoListId') todoListId: string) {
    return this.todoListService.deleteTodoList(parseInt(todoListId));
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

  @Delete('todo/:todoId')
  async deleteTodo(@Param('todoId') todoId: string) {
    return this.todoListService.deleteTodo(parseInt(todoId));
  }
}
