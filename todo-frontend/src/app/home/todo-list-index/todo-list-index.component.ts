import { Component } from '@angular/core';
import { UserTodoList } from '../../../interfaces';
import { TodoListService } from '../todo-list.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoListsActions } from '../../../store/todo-lists/todo-lists.actions';
import { TodoListsSelectors } from '../../../store/todo-lists/todo-lists.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { CreateTodoListFormComponent } from '../create-todo-list-form/create-todo-list-form.component';

@Component({
  selector: 'app-todo-list-index',
  templateUrl: './todo-list-index.component.html',
  styleUrls: ['./todo-list-index.component.scss'],
})
export class TodoListIndexComponent {
  private selectors = new TodoListsSelectors();
  currentlySelected$ = this.store.select(
    this.selectors.selectCurrentlySelected
  );
  todoLists$: Observable<UserTodoList[]> = this.store.select(
    this.selectors.selectTodoLists
  );

  constructor(
    private todoListService: TodoListService,
    private router: Router,
    private store: Store,
    private dialog: MatDialog
  ) {}

  onSelect(todoList: UserTodoList) {
    this.store.dispatch(TodoListsActions.onSelectTodoList({ todoList }));
    this.currentlySelected$ = this.store.select(
      this.selectors.selectCurrentlySelected
    );
    this.router.navigateByUrl(`todo-list/${todoList.id}`);
  }

  onCreateTodoList() {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        title: 'Create A New Todo List',
        component: CreateTodoListFormComponent,
      },
    });

    ref.componentInstance.standalone = false;
  }
}
