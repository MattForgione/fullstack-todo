import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatchPassword } from '../../shared/validators/match-password';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';

interface SignupData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  buttonDisabled = false;

  signupForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3)]],
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private fb: FormBuilder,
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onSubmit() {
    this.buttonDisabled = true;
    const { email, password } = this.signupForm.value as SignupData;

    this.authService
      .signup(email, password)
      .pipe(
        finalize(() => {
          this.buttonDisabled = false;
        })
      )
      .subscribe({
        next: () => {
          return this.openDialog();
        },
        error: ({ error }) => {
          if (error) {
            this.signupForm.setErrors({ responseError: error.message });
          }
        },
      });
  }

  async openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Dear user,',
        content: `An email has been sent to ${this.signupForm.value.email} with a verification link to complete the signup process!`,
      },
    });

    await dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('auth/login');
    });
  }
}
