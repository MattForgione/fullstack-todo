import { Module } from '@nestjs/common';
import { UsedTokensService } from './used-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedToken } from './used-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsedToken])],
  providers: [UsedTokensService],
  exports: [UsedTokensService],
})
export class UsedTokensModule {}
