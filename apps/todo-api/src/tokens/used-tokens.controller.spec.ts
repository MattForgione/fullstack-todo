import { Test, TestingModule } from '@nestjs/testing';
import { UsedTokensController } from './used-tokens.controller';

describe('UsedTokensController', () => {
  let controller: UsedTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsedTokensController],
    }).compile();

    controller = module.get<UsedTokensController>(UsedTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
