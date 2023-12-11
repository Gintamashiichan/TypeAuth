import { Test, TestingModule } from '@nestjs/testing';
import { RevokeTokenController } from './revoke-token.controller';

describe('RevokeTokenController', () => {
  let controller: RevokeTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevokeTokenController],
    }).compile();

    controller = module.get<RevokeTokenController>(RevokeTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
