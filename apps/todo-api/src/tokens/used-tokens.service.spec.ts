import { Test, TestingModule } from '@nestjs/testing';
import { UsedTokensService } from './used-tokens.service';

describe('UsedTokensService', () => {
  let service: UsedTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsedTokensService],
    }).compile();

    service = module.get<UsedTokensService>(UsedTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
