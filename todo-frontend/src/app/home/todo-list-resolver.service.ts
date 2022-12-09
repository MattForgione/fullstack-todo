import { Injectable } from '@angular/core';
import { UserTodoList } from '../../interfaces';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, Observable, take } from 'rxjs';
import { TodoListService } from './todo-list.service';

@Injectable({
  providedIn: 'root',
})
export class TodoListResolverService implements Resolve<UserTodoList> {
  constructor(
    private todoListService: TodoListService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserTodoList> | Promise<UserTodoList> | UserTodoList {
    const { id } = route.params;

    return this.todoListService.getTodoList(id).pipe(
      take(1),
      catchError(() => {
        this.router.navigateByUrl('/todo-list-not-found');

        return EMPTY;
      })
    );
  }
}
