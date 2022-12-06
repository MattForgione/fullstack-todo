import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent {
  buttonDisabled = false;

  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  onSubmit() {
    this.buttonDisabled = true;
    const email = this.emailForm.value.email as string;

    this.authService
      .sendPasswordResetEmail(email)
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
            this.emailForm.setErrors({ responseError: error.message });
          }
        },
      });
  }

  async openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Password Reset Email Has Been Sent!',
        content: `An email has been sent to ${this.emailForm.value.email} with a verification link to perform the password reset!`,
      },
    });

    await dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
