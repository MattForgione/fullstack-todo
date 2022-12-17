import { createReducer, on } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import { AppRoutes } from '../../app/app.routes';
import { TodoListsActions } from '../actions/todoLists.actions';

export interface State {
  todoLists: UserTodoList[];
  currentlySelected: number | null;
  currentNav: AppRoutes | null;
  userSignedIn: boolean;
}

export const initialState: State = {
  todoLists: [],
  currentlySelected: null,
  currentNav: null,
  userSignedIn: false,
};

export const todoListReducer = createReducer(
  initialState,
  on(
    TodoListsActions.resetCurrentlySelected,
    (state): State => ({
      ...state,
      currentlySelected: null,
    })
  ),
  on(
    TodoListsActions.onSelectTodoList,
    (state, { todoList }): State => ({
      ...state,
      currentlySelected: todoList.id,
    })
  ),
  on(
    TodoListsActions.todosLoadedSuccess,
    (state, { todoLists }): State => ({
      ...state,
      todoLists: todoLists,
    })
  ),
  on(
    TodoListsActions.onSelectNavLocation,
    (state, { currentNav }): State => ({
      ...state,
      currentNav,
    })
  ),
  on(
    TodoListsActions.onHomePageEntered,
    (state): State => ({
      ...state,
      currentNav: AppRoutes.HOME,
    })
  ),
  on(
    TodoListsActions.onLoginPageEntered,
    (state): State => ({
      ...state,
      currentNav: AppRoutes.LOGIN,
    })
  ),
  on(
    TodoListsActions.onSignupPageEntered,
    (state): State => ({
      ...state,
      currentNav: AppRoutes.SIGNUP,
    })
  ),
  on(
    TodoListsActions.setUserSignedIn,
    (state, { userSignedIn }): State => ({
      ...state,
      userSignedIn,
    })
  )
);
