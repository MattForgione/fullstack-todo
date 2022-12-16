import { Injectable } from '@angular/core';
import { UserTodoList } from '../../interfaces';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { TodoListService } from './todo-list.service';
import { Store } from '@ngrx/store';
import { TodoListsSelectors } from '../../store/selectors/todoLists.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodoListResolverService
  implements Resolve<UserTodoList | undefined>
{
  constructor(
    private todoListService: TodoListService,
    private router: Router,
    private store: Store,
    private selectors: TodoListsSelectors
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<UserTodoList | undefined>
    | Promise<UserTodoList | undefined>
    | (UserTodoList | undefined) {
    const { id } = route.params;
    return this.store.select(this.selectors.selectTodoList(parseInt(id))).pipe(
      map(result => {
        if (result) return result;
        throw new TypeError('Is undefined');
      }),
      catchError(() => {
        this.router.navigateByUrl('/todo-list-not-found');

        return EMPTY;
      })
    );
  }
}
