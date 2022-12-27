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
import { LocalConfigService } from '../local-config/local-config.service';
import { UsedTokensModule } from '../tokens/used-tokens.module';

@Module({
  imports: [
    UsersModule,
    UsedTokensModule,
    PassportModule,
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
  exports: [AuthService, MailerService],
})
export class AuthModule {}
