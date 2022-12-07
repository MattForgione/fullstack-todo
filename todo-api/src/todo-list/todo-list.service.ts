import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './todo-list.entity';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private usersService: UsersService
  ) {}

  async createTodoList(title: string, email: string) {
    const todoList = this.todoListRepository.create({ title });
    todoList.user = await this.usersService.findOne(email);

    return this.todoListRepository.save(todoList);
  }

  async createTodo(title: string, content: string, todoListId: number) {
    const todoList = await this.todoListRepository.findOne({
      where: { id: todoListId },
    });

    if (!todoList)
      throw new NotFoundException(
        `TodoList with id ${todoListId} was not found`
      );

    const todo = this.todoRepository.create({ title, content });
    todo.todoList = todoList;

    return this.todoRepository.save(todo);
  }
}
