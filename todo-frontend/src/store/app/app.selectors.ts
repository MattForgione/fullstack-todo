import { AppState } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export class AppSelectors {
  featureKey = 'app';

  selectFeature = createFeatureSelector<AppState>(this.featureKey);

  selectCurrentNav = createSelector(
    this.selectFeature,
    (state: AppState) => state.currentNav
  );
}
