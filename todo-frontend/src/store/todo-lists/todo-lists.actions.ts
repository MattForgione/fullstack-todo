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
}
