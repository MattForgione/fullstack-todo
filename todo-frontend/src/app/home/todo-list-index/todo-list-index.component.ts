import { Component, OnInit } from '@angular/core';
import { UserTodoList } from '../../../interfaces';
import { TodoListService } from '../todo-list.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TodoListActions from '../../../store/actions/todoLists.actions';
import { selectCurrentlySelected } from '../../../store/selectors/todoLists.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list-index',
  templateUrl: './todo-list-index.component.html',
  styleUrls: ['./todo-list-index.component.scss'],
})
export class TodoListIndexComponent implements OnInit {
  currentlySelected$: Observable<number | null>;
  selectedTodoList!: UserTodoList | undefined;
  todoLists!: UserTodoList[];

  constructor(
    private todoListService: TodoListService,
    private router: Router,
    private store: Store
  ) {
    this.currentlySelected$ = this.store.select(selectCurrentlySelected);
    this.currentlySelected$.subscribe(result => {
      console.log(result);
    });
  }

  ngOnInit() {
    this.todoListService.getUserTodoLists().subscribe(todoLists => {
      this.todoLists = todoLists;
      console.log(this.todoLists);
    });
  }

  onSelect(todoList: UserTodoList) {
    this.store.dispatch(TodoListActions.onSelectTodoList({ todoList }));
    this.currentlySelected$ = this.store.select(selectCurrentlySelected);
    this.router.navigateByUrl(`todo-list/${todoList.id}`);
  }
}
