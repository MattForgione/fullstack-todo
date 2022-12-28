/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LocalConfigService } from './local-config/local-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const localConfig = app.get(LocalConfigService);
  app.enableCors();

  await app.listen(3000);
  Logger.log(
    `[Todo Api] Application is running on: http://localhost:${3000} with env "${
      localConfig.devMode
    }"`
  );
}

bootstrap();
