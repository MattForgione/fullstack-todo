import { createAction, props } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';

export const enter = createAction('[Todo Dashboard] Dashboard enter.');

export const onSelectTodoList = createAction(
  '[Todo Dashboard] TodoList selected',
  props<{ todoList: UserTodoList }>()
);

export const loadTodoLists = createAction('[Todo List Index] Load TodoLists');

export const todosLoadedSuccess = createAction(
  '[Todos Api] Todo Lists Loaded Success',
  props<{ todoLists: UserTodoList[] }>()
);

export let todosLoadedFailure = createAction(
  '[Todos Api] Todo Lists Loaded Failure'
);
