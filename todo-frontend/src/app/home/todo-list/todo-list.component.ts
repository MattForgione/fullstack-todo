import { Component } from '@angular/core';
import { UserTodoList } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todoList!: UserTodoList;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(({ todos }) => {
      this.todoList = todos;
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
