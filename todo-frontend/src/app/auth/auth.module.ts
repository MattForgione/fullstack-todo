import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, SignupComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
