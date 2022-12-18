import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { FormComponent } from '../../shared/form/form.component';
import { MatCardTitle } from '@angular/material/card';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

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
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AuthModule,
        HttpClientModule,
        SharedModule,
      ],
      declarations: [LoginComponent],
      providers: [AuthService, provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form component', () => {
    const form = fixture.debugElement.query(By.directive(FormComponent));
    expect(form).toBeTruthy();
  });

  it('should have "Login" as form title', () => {
    const title = fixture.debugElement.query(By.directive(MatCardTitle));
    expect(title.nativeElement.innerHTML).toEqual('Login');
  });
});
