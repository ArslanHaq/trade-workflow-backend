import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { ApprovalChainsService } from './approval-chains.service';

describe('ApprovalChainsService', () => {
  let service: ApprovalChainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalChainsService, createPrismaMockProvider()],
    }).compile();

    service = module.get<ApprovalChainsService>(ApprovalChainsService);
  });

  it('should create and retrieve approval chains', async () => {
    const created = await service.create({ name: 'Trade Approval' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      id: created.id,
      name: 'Trade Approval',
    });
  });
});
