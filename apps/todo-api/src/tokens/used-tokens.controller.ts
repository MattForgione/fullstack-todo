import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { StoredTokenDto } from '../auth/dto/stored-token.dto';
import { UsedTokensService } from './used-tokens.service';

@Controller('tokens')
export class UsedTokensController {
  constructor(private usedTokenService: UsedTokensService) {}

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
