import { Component, OnInit } from '@angular/core';
import { UserTodoList } from '../../../interfaces';
import { TodoListService } from '../todo-list.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoListsActions } from '../../../store/actions/todoLists.actions';
import { TodoListsSelectors } from '../../../store/selectors/todoLists.selectors';

@Component({
  selector: 'app-todo-list-index',
  templateUrl: './todo-list-index.component.html',
  styleUrls: ['./todo-list-index.component.scss'],
})
export class TodoListIndexComponent implements OnInit {
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
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(TodoListsActions.loadTodoLists());
  }

  onSelect(todoList: UserTodoList) {
    this.store.dispatch(TodoListsActions.onSelectTodoList({ todoList }));
    this.currentlySelected$ = this.store.select(
      this.selectors.selectCurrentlySelected
    );
    this.router.navigateByUrl(`todo-list/${todoList.id}`);
  }
}
