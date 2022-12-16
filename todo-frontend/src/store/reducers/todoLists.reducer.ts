import { createReducer, on } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import * as TodoActions from '../actions/todoLists.actions';
import { AppRoutes } from '../../app/app.routes';

export interface State {
  todoLists: UserTodoList[];
  currentlySelected: number | null;
  currentNav: AppRoutes | null;
}

export const initialState: State = {
  todoLists: [],
  currentlySelected: null,
  currentNav: null,
};

export const todoListReducer = createReducer(
  initialState,
  on(TodoActions.enter, (state): State => ({ ...state })),
  on(
    TodoActions.resetCurrentlySelected,
    (state): State => ({
      ...state,
      currentlySelected: null,
    })
  ),
  on(
    TodoActions.onSelectTodoList,
    (state, { todoList }): State => ({
      ...state,
      currentlySelected: todoList.id,
    })
  ),
  on(
    TodoActions.todosLoadedSuccess,
    (state, { todoLists }): State => ({
      ...state,
      todoLists: todoLists,
    })
  ),
  on(
    TodoActions.onSelectNavLocation,
    (state, { currentNav }): State => ({
      ...state,
      currentNav,
    })
  )
);
