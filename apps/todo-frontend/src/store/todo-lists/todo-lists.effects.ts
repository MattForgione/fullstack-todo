import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { TodoListsActions } from './todo-lists.actions';
import { ApiService } from '../../app/api.service';

@Injectable()
export class TodoListsEffects {
  loadTodoLists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListsActions.loadTodoLists),
      switchMap(() =>
        this.apiService.getUserTodoLists().pipe(
          map(todoLists => {
            return TodoListsActions.todosLoadedSuccess({ todoLists });
          }),
          catchError(() => of(TodoListsActions.todosLoadedFailure))
        )
      )
    );
  });

  createTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListsActions.createTodoList),
      switchMap(action => {
        return this.apiService.createTodoList(action.title).pipe(
          map(todoList => TodoListsActions.createTodoListSuccess({ todoList })),
          catchError(() => of(TodoListsActions.createTodoListFailure))
        );
      })
    );
  });

  deleteTodoList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodoListsActions.deleteTodoList),
      switchMap(action => {
        return this.apiService.deleteTodoList(action.todoListId).pipe(
          map(todoList => TodoListsActions.deleteTodoListSuccess({ todoList })),
          catchError(() => of(TodoListsActions.deleteTodoListFailure))
        );
      })
    );
  });

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
