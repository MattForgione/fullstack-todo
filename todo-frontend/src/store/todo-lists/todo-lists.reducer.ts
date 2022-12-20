import { createReducer, on } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import { TodoListsActions } from './todo-lists.actions';

export interface TodoListsState {
  todoLists: UserTodoList[];
  currentlySelected: number | null;
}

export const initialState: TodoListsState = {
  todoLists: [],
  currentlySelected: null,
};

export const todoListReducer = createReducer(
  initialState,
  on(
    TodoListsActions.resetCurrentlySelected,
    (state): TodoListsState => ({
      ...state,
      currentlySelected: null,
    })
  ),
  on(
    TodoListsActions.onSelectTodoList,
    (state, { todoList }): TodoListsState => ({
      ...state,
      currentlySelected: todoList.id,
    })
  ),
  on(
    TodoListsActions.todosLoadedSuccess,
    (state, { todoLists }): TodoListsState => ({
      ...state,
      todoLists: todoLists,
    })
  ),
  on(
    TodoListsActions.createTodoListSuccess,
    (state, { todoList }): TodoListsState => ({
      ...state,
      todoLists: [...state.todoLists, todoList],
    })
  ),
  on(
    TodoListsActions.createTodoListFailure,
    (state): TodoListsState => ({
      ...state,
    })
  )
);
