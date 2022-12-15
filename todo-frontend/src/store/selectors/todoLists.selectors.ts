import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/todoLists.reducer';

export const featureKey = 'todos';

export const selectFeature = createFeatureSelector<State>(featureKey);

export const selectCurrentlySelected = createSelector(
  selectFeature,
  (state: State) => state.currentlySelected
);

export const selectTodoLists = createSelector(
  selectFeature,
  (state: State) => state.todoLists
);

export const selectTodoList = (id: number) =>
  createSelector(selectTodoLists, todoLists => {
    return todoLists.find(todoList => todoList.id === id);
  });
