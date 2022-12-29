import { Injectable } from '@angular/core';
import { UserTodoList } from '../../interfaces';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoListsSelectors } from '../../store/todo-lists/todo-lists.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodoListResolverService
  implements Resolve<UserTodoList | undefined>
{
  private selectors = new TodoListsSelectors();

  constructor(private router: Router, private store: Store) {}

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
