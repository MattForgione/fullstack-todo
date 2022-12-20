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
    const user = await this.usersService.findOne(email);

    if (!user)
      throw new NotFoundException('User not found when creating todo list');

    todoList.user = user;

    return this.todoListRepository.save(todoList);
  }

  async getTodoLists(email: string) {
    const user = await this.usersService.findOne(email);

    return await this.todoListRepository
      .createQueryBuilder('todoList')
      .where('todoList.userId = :id', { id: user.id })
      .leftJoinAndSelect('todoList.todos', 'todos')
      .getMany();
  }

  async getTodoList(todoListId: number) {
    const result = await this.todoListRepository
      .createQueryBuilder('todoList')
      .where('todoList.id = :id', { id: todoListId })
      .leftJoinAndSelect('todoList.todos', 'todos')
      .where('todos.todoList.id = :id', { id: todoListId })
      .getOne();

    if (!result) {
      const altered = await this.todoListRepository.findOneBy({
        id: todoListId,
      });

      if (!altered) {
        throw new NotFoundException(
          `TodoList with id ${todoListId} was not found`
        );
      }

      altered.todos = [];

      return altered;
    }

    return result;
  }

  async deleteTodoList(todoListId: number) {
    const todoList = await this.todoListRepository.findOneBy({
      id: todoListId,
    });

    if (!todoListId)
      throw new NotFoundException(
        `Todo list with id ${todoListId} was not found`
      );

    return this.todoListRepository.remove(todoList);
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

  async getTodos(todoListId: number) {
    return await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.todoListId = :todoListId', { todoListId })
      .leftJoinAndSelect('todo.todoList', 'todoList')
      .where('todoList.id = :id', { id: todoListId })
      .getMany();
  }

  async getOneTodo(todoId: number) {
    return await this.todoRepository.findOneBy({ id: todoId });
  }

  async updateTodo(
    title: string,
    content: string,
    complete: boolean,
    todoId: number
  ) {
    const todo = await this.todoRepository.findOneBy({ id: todoId });

    if (!todo)
      throw new NotFoundException(`Todo with id ${todoId} was not found`);

    todo.title = title;
    todo.content = content;
    todo.complete = complete;

    return this.todoRepository.save(todo);
  }

  async deleteTodo(todoId: number) {
    const todo = await this.todoRepository.findOneBy({ id: todoId });

    if (!todo)
      throw new NotFoundException(`Todo with id ${todoId} was not found`);

    return this.todoRepository.remove(todo);
  }
}
