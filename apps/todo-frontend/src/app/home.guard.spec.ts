import { TestBed } from '@angular/core/testing';

import { HomeGuard } from './home.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home/home.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthState } from '../store/auth/auth.reducer';
import { initialState } from '../test-utils';
import { HttpClientModule } from '@angular/common/http';
import { AuthActions } from '../store/auth/auth.actions';
import { Router } from '@angular/router';

describe('HomeGuard', () => {
  let guard: HomeGuard;
  let store: MockStore<AuthState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent,
            canLoad: [HomeGuard],
          },
        ]),
      ],
      providers: [HomeGuard, provideMockStore({ initialState })],
    });
    guard = TestBed.inject(HomeGuard);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call this.store.select one time', () => {
    const storeSpy = spyOn(store, 'select').and.callThrough();
    guard.canLoad();
    expect(storeSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to navigate to home if user is signed in through the store', async () => {
    store.dispatch(AuthActions.setUserSignedIn({ userSignedIn: true }));
    guard.canLoad();

    expect(router.url).toEqual('/');
  });

  it('should return canLoad as false if user is signed in through the store', async () => {
    const result = await guard.canLoad();

    console.log(result);
  });
});
