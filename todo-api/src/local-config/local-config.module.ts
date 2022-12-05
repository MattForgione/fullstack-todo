import { Module } from '@nestjs/common';
import { LocalConfigService } from './local-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
  ],
  providers: [LocalConfigService],
  exports: [LocalConfigService],
})
export class LocalConfigModule {}
