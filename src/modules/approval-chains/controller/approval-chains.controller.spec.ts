import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalChainsController } from './approval-chains.controller';
import { ApprovalChainsService } from '../service/approval-chains.service';

describe('ApprovalChainsController', () => {
  let controller: ApprovalChainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalChainsController],
      providers: [
        {
          provide: ApprovalChainsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApprovalChainsController>(ApprovalChainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
