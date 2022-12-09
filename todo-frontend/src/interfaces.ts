export interface DecodedJwtToken {
  email: string;
  exp: number;
  iat: number;
  sub: number;
}

export interface UserTodoList {
  id: number;
  title: string;
  created_at: Date;
  todos: Todo[] | [];
}

export interface Todo {
  id: number;
  title: string;
  content: string;
  complete: boolean;
  todoList: UserTodoList;
  created_at: Date;
  updated_at: Date;
}
