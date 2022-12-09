import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecodedJwtToken, Todo, UserTodoList } from '../../interfaces';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  url = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUserTodoLists() {
    const cookie = this.cookieService.get('authToken');
    const decoded = jwt_decode(cookie) as DecodedJwtToken;

    return this.http.get<UserTodoList[]>(
      `${this.url}/todo-list?email=${decoded.email}`
    );
  }

  getTodoList(id: number) {
    return this.http.get<Todo[]>(
      `${this.url}/todo-list/todos?todoListId=${id}`
    );
  }
}
