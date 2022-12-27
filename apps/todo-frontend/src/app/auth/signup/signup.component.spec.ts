import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../test-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { FormComponent } from '../../shared/form/form.component';
import { MatCardTitle } from '@angular/material/card';
import { InputComponent } from '../../shared/input/input.component';
import { MatError, MatLabel } from '@angular/material/form-field';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;

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
      declarations: [SignupComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form component', () => {
    const form = fixture.debugElement.query(By.directive(FormComponent));
    expect(form).toBeTruthy();
  });

  it('should have "Sign Up" as form title', () => {
    const title = fixture.debugElement.query(By.directive(MatCardTitle));
    expect(title.nativeElement.innerHTML).toEqual('Sign Up');
  });

  it('should have three inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    expect(inputs.length).toBe(3);
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

  it('should have "Password Confirm" as the third input label', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const label = inputs[2].query(By.directive(MatLabel));

    expect(label.nativeElement.innerHTML).toEqual('Password Confirm');
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

  it('should not have a placeholder in Password Confirm input placeholder', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[2];

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

  it('should have the input type as "password" for the password input', () => {
    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[2];

    expect(input.query(By.css('input')).nativeElement.type).toEqual('password');
  });

  it('should have a button that contains " Sign Up! "', () => {
    const button = fixture.debugElement.query(By.css('.mdc-button__label'));

    expect(button.nativeElement.innerHTML).toEqual(' Sign Up! ');
  });

  it('should hold the characters that are typed into the email input as its value', () => {
    fixture.componentInstance.signupForm.controls.email.setValue('123');
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[0];

    expect(input.query(By.css('input')).nativeElement.value).toEqual('123');
  });

  it('should hold the characters that are typed into the password input as its value', () => {
    fixture.componentInstance.signupForm.controls.password.setValue('123');
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[1];

    expect(input.query(By.css('input')).nativeElement.value).toEqual('123');
  });

  it('should hold the characters that are typed into the password confirm input as its value', () => {
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      '123'
    );
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const input = inputs[2];

    expect(input.query(By.css('input')).nativeElement.value).toEqual('123');
  });

  it('shows the "You must enter a value" error element on blur for email input', () => {
    fixture.componentInstance.signupForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[0].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('You must enter a value');
  });

  it('shows the "You must enter a value" error element on blur for password input', () => {
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[1].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('You must enter a value');
  });

  it('shows the "You must enter a value" error element on blur for password input', () => {
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[2].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('You must enter a value');
  });

  it('shows the "Must be an email" error element when invalid email string is entered in email input', () => {
    fixture.componentInstance.signupForm.controls.email.setValue('notvalid');
    fixture.componentInstance.signupForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[0].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual('Not a valid email');
  });

  it('shows the "Password must be at least 3 characters" error message when password input is less than 3 characters', () => {
    fixture.componentInstance.signupForm.controls.password.setValue('12');
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[1].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual(
      'Password must be at least 3 characters'
    );
  });

  it('shows the "Password must be at least 3 characters" error message when password confirm input is less than 3 characters', () => {
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      '12'
    );
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.directive(InputComponent));
    const matError = inputs[2].query(By.directive(MatError));

    expect(matError.nativeElement.innerHTML).toEqual(
      'Password must be at least 3 characters'
    );
  });

  it('shows that if all inputs are empty, the Sign Up button is disabled', () => {
    const button = fixture.debugElement.query(By.css('.button'));

    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if only the email input is valid, the Sign Up button is disabled', () => {
    fixture.componentInstance.signupForm.controls.email.setValue(
      'valid@email.com'
    );
    fixture.componentInstance.signupForm.controls.email.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if only the password input is valid, the Sign Up button is disabled', () => {
    fixture.componentInstance.signupForm.controls.password.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if only the password confirm input is valid, the Sign Up button is disabled', () => {
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('shows that if only password input is valid but doesn\'t match password confirm, the "Passwords must match" error displays and button is disabled', () => {
    fixture.componentInstance.signupForm.controls.password.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    expect(submitButton.nativeElement.disabled).toEqual(true);

    const mustMatchButton = fixture.debugElement.query(
      By.css('.mdc-button__label')
    );
    expect(mustMatchButton.nativeElement.innerHTML).toEqual(
      ' Passwords must match '
    );
  });

  it('shows that if password confirm is valid, yet password isn\'t, the "Passwords must match" error will display', () => {
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    expect(submitButton.nativeElement.disabled).toEqual(true);

    const mustMatchButton = fixture.debugElement.query(
      By.css('.mdc-button__label')
    );
    expect(mustMatchButton.nativeElement.innerHTML).toEqual(
      ' Passwords must match '
    );
  });

  it('shows that if both password inputs are valid and the same, yet the email is invalid, the signup button will be disabled', () => {
    fixture.componentInstance.signupForm.controls.password.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    expect(submitButton.nativeElement.disabled).toEqual(true);
  });

  it('shows that if both password inputs are valid and the same and email is valid, the signup button will be enabled', () => {
    fixture.componentInstance.signupForm.controls.email.setValue(
      'valid@email.com'
    );
    fixture.componentInstance.signupForm.controls.email.markAsTouched();
    fixture.componentInstance.signupForm.controls.password.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.password.markAsTouched();
    fixture.componentInstance.signupForm.controls.passwordConfirm.setValue(
      'validpassword'
    );
    fixture.componentInstance.signupForm.controls.passwordConfirm.markAsTouched();
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    expect(submitButton.nativeElement.disabled).toEqual(false);
  });
});
