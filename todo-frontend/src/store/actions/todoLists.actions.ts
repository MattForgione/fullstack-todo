import { createAction, props } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';

export const enter = createAction('[Todo Dashboard] Dashboard enter.');

export const onSelectTodoList = createAction(
  '[Todo Dashboard] TodoList selected',
  props<{ todoList: UserTodoList }>()
);
