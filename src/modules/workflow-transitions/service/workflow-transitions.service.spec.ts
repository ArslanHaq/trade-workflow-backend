import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { WorkflowTransitionsService } from './workflow-transitions.service';

describe('WorkflowTransitionsService', () => {
  let service: WorkflowTransitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowTransitionsService, createPrismaMockProvider()],
    }).compile();

    service = module.get<WorkflowTransitionsService>(
      WorkflowTransitionsService,
    );
  });

  it('should create and retrieve workflow transitions', async () => {
    const created = await service.create({ name: 'submit-for-review' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'submit-for-review',
    });
  });
});
