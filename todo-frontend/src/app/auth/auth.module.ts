import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    LinkExpiredComponent,
  ],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
