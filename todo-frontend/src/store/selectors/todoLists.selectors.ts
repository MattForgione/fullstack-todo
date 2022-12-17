import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/todoLists.reducer';

export class TodoListsSelectors {
  featureKey = 'todos';

  selectFeature = createFeatureSelector<State>(this.featureKey);

  selectCurrentlySelected = createSelector(
    this.selectFeature,
    (state: State) => state.currentlySelected
  );

  selectTodoLists = createSelector(
    this.selectFeature,
    (state: State) => state.todoLists
  );

  selectCurrentNav = createSelector(
    this.selectFeature,
    (state: State) => state.currentNav
  );

  selectUserSignedIn = createSelector(
    this.selectFeature,
    (state: State) => state.userSignedIn
  );

  selectTodoList(id: number) {
    return createSelector(this.selectTodoLists, todoLists => {
      return todoLists.find(todoList => todoList.id === id);
    });
  }
}
