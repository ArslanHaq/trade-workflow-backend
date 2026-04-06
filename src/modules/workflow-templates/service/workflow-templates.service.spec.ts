import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { WorkflowTemplatesService } from './workflow-templates.service';

describe('WorkflowTemplatesService', () => {
  let service: WorkflowTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowTemplatesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<WorkflowTemplatesService>(WorkflowTemplatesService);
  });

  it('should create and retrieve workflow templates', async () => {
    const created = await service.create({ name: 'Import Workflow' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Import Workflow',
    });
  });
});
