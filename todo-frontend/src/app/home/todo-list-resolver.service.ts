import { Injectable } from '@angular/core';
import { UserTodoList } from '../../interfaces';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TodoListService } from './todo-list.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListResolverService implements Resolve<UserTodoList> {
  constructor(private todoListService: TodoListService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserTodoList> | Promise<UserTodoList> | UserTodoList {
    const { id } = route.params;

    return this.todoListService.getTodoList(id);
  }
}
