import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/todoLists.reducer';

export const featureKey = 'todos';

export const selectFeature = createFeatureSelector<State>(featureKey);

export const selectCurrentlySelected = createSelector(
  selectFeature,
  (state: State) => state.currentlySelected
);
