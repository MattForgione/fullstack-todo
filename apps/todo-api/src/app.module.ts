import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { LocalConfigModule } from './local-config/local-config.module';
import { APP_PIPE } from '@nestjs/core';
import { UsedTokensModule } from './tokens/used-tokens.module';
import { UsedToken } from './tokens/used-token.entity';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoList } from './todo-list/todo-list.entity';
import { Todo } from './todo-list/todo.entity';
import { LocalConfigService } from './local-config/local-config.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [LocalConfigService],
      useFactory: (config: LocalConfigService) => ({
        type: 'sqlite',
        database: config.dbName,
        entities: [User, UsedToken, Todo, TodoList],
        synchronize: true,
      }),
    }),
    LocalConfigModule,
    UsedTokensModule,
    TodoListModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
