import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../apps/todo-api/src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
