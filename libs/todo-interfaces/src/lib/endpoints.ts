export class Endpoints {
  // Auth Controller
  static AUTH_LOGIN = 'auth/login';
  static AUTH_SIGNUP = 'auth/signup';
  static AUTH_USER = 'auth/user';
  static AUTH_VERIFY_EMAIL = 'auth/verify-email';
  static AUTH_PASSWORD_RESET = 'auth/password-reset';
  static AUTH_PASSWORD_RESET_FORM = 'auth/password-reset-form/:token';

  // Used-Token Controller
  static STORE_TOKEN = 'tokens/store-used-token';
  static CHECK_TOKEN = 'tokens/check-used-token-exists';

  // TodoList Controller
  static CREATE_TODO_LIST = 'todo-list';
  static GET_TODO_LISTS = 'todo-list';
  static GET_FULL_TODO_LIST = 'todo-list/full-todo-list';
  static DELETE_TODO_LIST = 'todo-list/:todoListId';
  static CREATE_TODO = 'todo-list/:todoListId';
  static GET_TODOS = 'todo-list/todos';
  static GET_TODO = 'todo-list/todo/:todoId';
  static UPDATE_TODO = 'todo-list/todo/:todoId';
  static DELETE_TODO = 'todo-list/todo/:todoId';

  // static util functions
  static resetPasswordForm(token: string) {
    return `auth/password-reset-form/${token}`;
  }

  static checkTokenExists(token: string) {
    return `tokens/check-used-token-exists/${token}`;
  }

  static storeUsedToken(token: string) {
    return `tokens/store-used-token/${token}`;
  }
}
