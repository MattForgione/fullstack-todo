import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginStrategy } from './strategies/login.strategy';
import { MailerService } from './mailer.service';
import { LocalConfigModule } from '../local-config/local-config.module';
import { LocalConfigService } from '../local-config/local-config.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    LocalConfigModule,
    JwtModule.registerAsync({
      inject: [LocalConfigService],
      useFactory: (localConfig: LocalConfigService) => ({
        secret: localConfig.jwtSecret(),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LoginStrategy,
    MailerService,
  ],
})
export class AuthModule {}
