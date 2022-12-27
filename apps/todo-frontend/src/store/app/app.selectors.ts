import { AppState } from './app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppRoutes } from '../../app/app.routes';

export class AppSelectors {
  featureKey = 'app';

  selectFeature = createFeatureSelector<AppState>(this.featureKey);

  selectCurrentNav = createSelector(
    this.selectFeature,
    (state: AppState) => state.currentNav
  );

  compareNavWithCurrent(route: AppRoutes) {
    return createSelector(this.selectCurrentNav, currentNav => {
      return currentNav === route;
    });
  }
}
