import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  constructor(private apiService: ApiService) {}

  getUserTodoLists() {
    return this.apiService.getUserTodoLists();
  }

  createTodoList(title: string) {
    return this.apiService.createTodoList(title);
  }

  getTodoList(id: number) {
    return this.apiService.getTodoList(id);
  }

  deleteTodoList(todoListId: number) {
    return this.apiService.deleteTodoList(todoListId);
  }
}
