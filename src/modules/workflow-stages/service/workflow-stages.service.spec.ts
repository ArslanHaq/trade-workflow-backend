import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { WorkflowStagesService } from './workflow-stages.service';

describe('WorkflowStagesService', () => {
  let service: WorkflowStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowStagesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<WorkflowStagesService>(WorkflowStagesService);
  });

  it('should create and retrieve workflow stages', async () => {
    const created = await service.create({ name: 'Review', position: 1 });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Review',
      position: 1,
    });
  });
});
