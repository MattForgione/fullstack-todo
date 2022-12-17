import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoListsState } from './todo-lists.reducer';

export class TodoListsSelectors {
  featureKey = 'todos';

  selectFeature = createFeatureSelector<TodoListsState>(this.featureKey);

  selectCurrentlySelected = createSelector(
    this.selectFeature,
    (state: TodoListsState) => state.currentlySelected
  );

  selectTodoLists = createSelector(
    this.selectFeature,
    (state: TodoListsState) => state.todoLists
  );

  selectTodoList(id: number) {
    return createSelector(this.selectTodoLists, todoLists => {
      return todoLists.find(todoList => todoList.id === id);
    });
  }
}
