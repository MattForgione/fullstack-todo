import { Injectable } from '@nestjs/common';
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
}
