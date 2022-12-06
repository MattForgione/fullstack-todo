import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { LocalConfigModule } from './local-config/local-config.module';
import { APP_PIPE } from '@nestjs/core';
import { UsedTokensModule } from './tokens/used-tokens.module';
import { UsedToken } from './tokens/used-token.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, UsedToken],
      synchronize: true,
    }),
    LocalConfigModule,
    UsedTokensModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
