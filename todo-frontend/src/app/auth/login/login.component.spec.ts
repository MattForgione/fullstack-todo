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
import { InputComponent } from '../../shared/input/input.component';
import { MatError, MatLabel } from '@angular/material/form-field';

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

  afterEach(() => {
    fixture.destroy();
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

  it('should have two inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    expect(inputs.length).toBe(2);
  });

  it('should have "Email" as the first input label', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const label = inputs[0].query(By.directive(MatLabel));

    expect(label.nativeElement.innerHTML).toEqual('Email');
  });

  it('should have "Password" as the second input label', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const label = inputs[1].query(By.directive(MatLabel));

    expect(label.nativeElement.innerHTML).toEqual('Password');
  });

  it('should have "example@example.com" as the Email input placeholder', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[0];

    expect(input.query(By.css('input')).nativeElement.placeholder).toEqual(
      'example@example.com'
    );
  });

  it('should not have a placeholder in Password input placeholder', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[1];

    expect(input.query(By.css('input')).nativeElement.placeholder).toBeFalsy();
  });

  it('should have the input type as "text" for the email input', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[0];

    expect(input.query(By.css('input')).nativeElement.type).toEqual('text');
  });

  it('should have the input type as "password" for the password input', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[1];

    expect(input.query(By.css('input')).nativeElement.type).toEqual('password');
  });

  it('should have a button that contains " Login! "', () => {
    const button = fixture.debugElement.query(By.css('.mdc-button__label'));

    // strangely, spaces are inserted before and after the starting and
    //  ending characters when passed to mat-raised-button directive
    expect(button.nativeElement.innerHTML).toEqual(' Login! ');
  });

  it('should hold the characters that are typed into the email input as its value', () => {
    fixture.componentInstance.loginForm.controls.email.setValue('123');
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[0];

    expect(input.query(By.css('input')).nativeElement.value).toEqual('123');
  });

  it('should hold the characters that are typed into the password input as its value', () => {
    fixture.componentInstance.loginForm.controls.password.setValue('123');
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[1];

    expect(input.query(By.css('input')).nativeElement.value).toEqual('123');
  });

  it('shows the "You must enter a value" error element on blur for email input', () => {
    fixture.componentInstance.loginForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[0].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('You must enter a value');
  });

  it('shows the "You must enter a value" error element on blur for password input', () => {
    fixture.componentInstance.loginForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[1].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('You must enter a value');
  });

  it('shows the "Must be an email" error element when invalid email string is entered in email input', () => {
    fixture.componentInstance.loginForm.controls.email.setValue('notvalid');
    fixture.componentInstance.loginForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[0].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('Not a valid email');
  });

  it('shows the "Password must be at least 3 characters" error message when password input is less than 3 characters', () => {
    fixture.componentInstance.loginForm.controls.password.setValue('12');
    fixture.componentInstance.loginForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[1].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual(
      'Password must be at least 3 characters'
    );
  });

  it('shows that if both inputs are empty, the Login button is disabled', () => {
    const button = fixture.debugElement.query(By.css('.button'));

    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if the email input is valid and password input is invalid, the Login button is disabled', () => {
    fixture.componentInstance.loginForm.controls.email.setValue(
      'valid@email.com'
    );
    fixture.componentInstance.loginForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if the email input is invalid and password input is valid, the Login button is disabled', () => {
    fixture.componentInstance.loginForm.controls.password.setValue(
      'validpasswordsorta'
    );
    fixture.componentInstance.loginForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if both inputs are valid, the Login button is enabled', () => {
    fixture.componentInstance.loginForm.controls.email.setValue(
      'valid@email.com'
    );
    fixture.componentInstance.loginForm.controls.email.markAsTouched();
    fixture.componentInstance.loginForm.controls.password.setValue(
      'validpasswordsorta'
    );
    fixture.componentInstance.loginForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(false);
  });

  it('displays the "Forgot your password?" prompt at the bottom of the form', () => {
    expect(fixture.debugElement.query(By.css('.reset-container'))).toBeTruthy();
  });
});
