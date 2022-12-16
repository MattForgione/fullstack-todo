import { createAction, props } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import { AppRoutes } from '../../app/app.routes';

export const enter = createAction('[Todo Dashboard] Dashboard enter.');

export const resetCurrentlySelected = createAction(
  '[Todo Dashboard] Reset Currently Selected.'
);

export const onSelectTodoList = createAction(
  '[Todo Dashboard] TodoList selected',
  props<{ todoList: UserTodoList }>()
);

export const loadTodoLists = createAction('[Todo List Index] Load TodoLists');

export const todosLoadedSuccess = createAction(
  '[Todos Api] Todo Lists Loaded Success',
  props<{ todoLists: UserTodoList[] }>()
);

export const todosLoadedFailure = createAction(
  '[Todos Api] Todo Lists Loaded Failure'
);

export const onSelectNavLocation = createAction(
  '[Navbar] Select Nav Location',
  props<{ currentNav: AppRoutes }>()
);
