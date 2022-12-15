import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoListService } from '../../app/home/todo-list.service';
import * as TodoListsActions from '../actions/todoLists.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TodoListsEffects {
  loadTodoLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListsActions.loadTodoLists),
      switchMap(() =>
        this.todoListService.getUserTodoLists().pipe(
          map(todoLists => {
            return TodoListsActions.todosLoadedSuccess({ todoLists });
          }),
          catchError(() => of(TodoListsActions.todosLoadedFailure))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private todoListService: TodoListService
  ) {}
}
