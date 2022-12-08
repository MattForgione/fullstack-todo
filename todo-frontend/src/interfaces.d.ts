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
}

export interface TodoList {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
