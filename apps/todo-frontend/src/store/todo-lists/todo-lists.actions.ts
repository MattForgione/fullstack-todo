import { createAction, props } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';

export class TodoListsActions {
  public static resetCurrentlySelected = createAction(
    '[Todo Dashboard] Reset Currently Selected.'
  );

  public static onSelectTodoList = createAction(
    '[Todo Dashboard] TodoList selected',
    props<{ todoList: UserTodoList }>()
  );

  public static loadTodoLists = createAction(
    '[Todo List Index] Load TodoLists'
  );

  public static todosLoadedSuccess = createAction(
    '[Todos Api] Todo Lists Loaded Success',
    props<{ todoLists: UserTodoList[] }>()
  );

  public static todosLoadedFailure = createAction(
    '[Todos Api] Todo Lists Loaded Failure'
  );

  public static createTodoList = createAction(
    '[Todos Api] Create Todo List',
    props<{ title: string }>()
  );
  public static createTodoListSuccess = createAction(
    '[Todos Api] Create Todo List Successful',
    props<{ todoList: UserTodoList }>()
  );
  public static createTodoListFailure = createAction(
    '[Todos Api] Create Todo List Failure'
  );

  public static deleteTodoList = createAction(
    '[Todos Api] Delete Todo List',
    props<{ todoListId: number }>()
  );

  public static deleteTodoListSuccess = createAction(
    '[Todos Api] Delete Todo List Success',
    props<{ todoList: UserTodoList }>()
  );

  public static deleteTodoListFailure = createAction(
    '[Todos Api] Delete Todo List Failure'
  );
}
