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
import { Endpoints } from '@fullstack-todo/todo-interfaces';

@Controller()
export class UsedTokensController {
  constructor(private usedTokenService: UsedTokensService) {}

  @Post(Endpoints.STORE_TOKEN)
  @HttpCode(HttpStatus.CREATED)
  async storeUsedToken(@Body() body: StoredTokenDto) {
    return this.usedTokenService.addToken(body.token);
  }

  @Get(Endpoints.CHECK_TOKEN)
  async checkIfTokenExists(@Query() query: { token: string }) {
    return this.usedTokenService.checkIfTokenExists(query.token);
  }
}
