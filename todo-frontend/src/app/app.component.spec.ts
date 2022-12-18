import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeGuard } from './home.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardModule } from '@angular/material/card';

describe('AppComponent', () => {
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  let guard: HomeGuard;
  let store: MockStore;
  let fixture: ComponentFixture<AppComponent>;

  const initialState = {
    todos: {
      todoLists: [],
      currentlySelected: null,
    },
    app: {
      currentNav: null,
    },
    auth: {
      userSignedIn: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatTabsModule,
        MatCardModule,
      ],
      providers: [HomeGuard, provideMockStore({ initialState })],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    guard = TestBed.inject(HomeGuard);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
