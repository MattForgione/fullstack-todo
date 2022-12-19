import { Component } from '@angular/core';
import { UserTodoList } from '../../../interfaces';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TodoListsActions } from '../../../store/todo-lists/todo-lists.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  todoList!: UserTodoList;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.data.subscribe(({ todos }) => {
      this.todoList = todos;
      this.store.dispatch(
        TodoListsActions.onSelectTodoList({ todoList: todos })
      );
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
