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
import { Endpoints } from '@fullstack-todo/todo-interfaces';

@Controller()
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  @Post(Endpoints.CREATE_TODO_LIST)
  async createTodoList(@Body() body: { title: string; email: string }) {
    const { title, email } = body;
    return this.todoListService.createTodoList(title, email);
  }

  @Get(Endpoints.GET_TODO_LISTS)
  async getTodoLists(@Query('email') email: string) {
    return this.todoListService.getTodoLists(email);
  }

  @Get(Endpoints.GET_FULL_TODO_LIST)
  async getFullTodoList(@Query('todoListId') todoListId: string) {
    return this.todoListService.getTodoList(parseInt(todoListId));
  }

  @Delete(Endpoints.DELETE_TODO_LIST)
  async deleteTodoList(@Param('todoListId') todoListId: string) {
    return this.todoListService.deleteTodoList(parseInt(todoListId));
  }

  @Post(Endpoints.CREATE_TODO)
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

  @Get(Endpoints.GET_TODOS)
  async getTodos(@Query('todoListId') todoListId: string) {
    return this.todoListService.getTodos(parseInt(todoListId));
  }

  @Get(Endpoints.GET_TODO)
  async getTodo(@Param('todoId') todoId: string) {
    return this.todoListService.getOneTodo(parseInt(todoId));
  }

  @Patch(Endpoints.UPDATE_TODO)
  async updateTodo(
    @Param('todoId') todoId: string,
    @Body() body: UpdateTodoDto
  ) {
    const { title, content, complete } = body;
    return this.todoListService.updateTodo(
      title,
      content,
      complete,
      parseInt(todoId)
    );
  }

  @Delete(Endpoints.DELETE_TODO)
  async deleteTodo(@Param('todoId') todoId: string) {
    return this.todoListService.deleteTodo(parseInt(todoId));
  }
}
