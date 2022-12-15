import { createReducer, on } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import * as TodoActions from '../actions/todoLists.actions';

export interface State {
  todoLists: UserTodoList[];
  currentlySelected: number | null;
}

export const initialState: State = {
  todoLists: [],
  currentlySelected: null,
};

export const todoListReducer = createReducer(
  initialState,
  on(TodoActions.enter, (state): State => ({ ...state })),
  on(
    TodoActions.onSelectTodoList,
    (state, { todoList }): State => ({
      ...state,
      currentlySelected: todoList.id,
    })
  )
);
