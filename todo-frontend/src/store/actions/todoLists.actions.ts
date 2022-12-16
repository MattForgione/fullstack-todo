import { createAction, props } from '@ngrx/store';
import { UserTodoList } from '../../interfaces';
import { AppRoutes } from '../../app/app.routes';

export class TodoListsActions {
  public static onHomePageEntered = createAction(
    '[Home Page] Home Page Entered'
  );

  public static onLoginPageEntered = createAction(
    '[Login Page] Login Page Entered'
  );

  public static onSignupPageEntered = createAction(
    '[Signup Page] Signup Page Entered'
  );

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

  public static onSelectNavLocation = createAction(
    '[Navbar] Select Nav Location',
    props<{ currentNav: AppRoutes }>()
  );
}
