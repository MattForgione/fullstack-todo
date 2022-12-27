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
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { PasswordResetDto } from './dto/password-reset.dto';
import { StoredTokenDto } from './dto/stored-token.dto';
import { UsedTokensService } from '../tokens/used-tokens.service';

interface VerifyEmailToken {
  token: string;
}

interface ResetPasswordEmail {
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usedTokenService: UsedTokensService
  ) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser.email, createUser.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() body: VerifyEmailToken) {
    return this.authService.verifyEmail(body.token);
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  async resetPasswordEmail(@Body() body: ResetPasswordEmail) {
    return await this.authService.sendResetPasswordEmail(body.email);
  }

  @Patch('reset-password-form/:token')
  @HttpCode(HttpStatus.OK)
  async passwordResetFormSubmission(
    @Param('token') token: string,
    @Body() body: PasswordResetDto
  ) {
    return this.authService.submitResetPasswordForm(token, body);
  }

  @Post('store-used-token')
  @HttpCode(HttpStatus.CREATED)
  async storeUsedToken(@Body() body: StoredTokenDto) {
    return this.usedTokenService.addToken(body.token);
  }

  @Get('check-used-token-exists')
  async checkIfTokenExists(@Query() query: { token: string }) {
    return this.usedTokenService.checkIfTokenExists(query.token);
  }
}
