import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Endpoints } from '@fullstack-todo/todo-interfaces';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { PasswordResetDto } from './dto/password-reset.dto';

interface VerifyEmailToken {
  token: string;
}

interface ResetPasswordEmail {
  email: string;
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginAuthGuard)
  @Post(Endpoints.AUTH_LOGIN)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post(Endpoints.AUTH_SIGNUP)
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser.email, createUser.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get(Endpoints.AUTH_USER)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @Post(Endpoints.AUTH_VERIFY_EMAIL)
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() body: VerifyEmailToken) {
    return this.authService.verifyEmail(body.token);
  }

  @Post(Endpoints.AUTH_PASSWORD_RESET)
  @HttpCode(HttpStatus.OK)
  async resetPasswordEmail(@Body() body: ResetPasswordEmail) {
    return await this.authService.sendResetPasswordEmail(body.email);
  }

  @Patch(Endpoints.AUTH_PASSWORD_RESET_FORM)
  @HttpCode(HttpStatus.OK)
  async passwordResetFormSubmission(
    @Param('token') token: string,
    @Body() body: PasswordResetDto
  ) {
    return this.authService.submitResetPasswordForm(token, body);
  }
}
