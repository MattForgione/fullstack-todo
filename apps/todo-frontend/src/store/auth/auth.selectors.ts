import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export class AuthSelectors {
  featureKey = 'auth';

  selectFeature = createFeatureSelector<AuthState>(this.featureKey);

  selectUserSignedIn = createSelector(
    this.selectFeature,
    (state: AuthState) => state.userSignedIn
  );
}
