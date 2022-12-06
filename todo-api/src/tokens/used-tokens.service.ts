import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedToken } from './used-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsedTokensService {
  constructor(
    @InjectRepository(UsedToken) private repo: Repository<UsedToken>
  ) {}

  async findOne(token: string) {
    const tokenResult = this.repo.findOneBy({ token });
    if (!tokenResult) throw new NotFoundException(`Token does not exist`);

    return token;
  }

  async addToken(token: string) {
    const newToken = this.repo.create({ token });

    return this.repo.save(newToken);
  }
}
