import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedToken } from './used-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsedTokensService {
  constructor(
    @InjectRepository(UsedToken) private repo: Repository<UsedToken>
  ) {}

  async checkIfTokenExists(token: string) {
    const tokenResult = await this.repo.findOneBy({ token });
    console.log('token result: ' + token);
    console.log('repo result: ' + tokenResult);

    if (!tokenResult) return { tokenExists: false };
    return { tokenExists: true };
  }

  async addToken(token: string) {
    const newToken = this.repo.create({ token });

    return this.repo.save(newToken);
  }
}
