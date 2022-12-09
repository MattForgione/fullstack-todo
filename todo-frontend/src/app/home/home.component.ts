import { Component } from '@angular/core';
import { Todo, UserTodoList } from '../../interfaces';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  selectedTodoList!: UserTodoList;
  todos!: Todo[];
  todoLists!: UserTodoList[];

  constructor(private todoListService: TodoListService) {
    this.todoListService.getUserTodoLists().subscribe(result => {
      this.todoLists = result;
      console.log(this.todoLists);
    });
  }

  onSelect(todoList: UserTodoList) {
    this.selectedTodoList = todoList;
    this.todoListService
      .getTodoList(this.selectedTodoList.id)
      .subscribe(result => {
        this.todos = result;
      });
  }

  todoEditClicked(todoId: number) {
    console.log(`Todo edit clicked: ${todoId}`);
  }

  todoCompleteClicked(todoId: number) {
    console.log(`Todo complete clicked: ${todoId}`);
  }

  todoDeleteClicked(todoId: number) {
    console.log(`Todo delete clicked: ${todoId}`);
  }
}
