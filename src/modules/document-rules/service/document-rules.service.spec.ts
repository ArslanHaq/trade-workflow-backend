import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { DocumentRulesService } from './document-rules.service';

describe('DocumentRulesService', () => {
  let service: DocumentRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentRulesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<DocumentRulesService>(DocumentRulesService);
  });

  it('should create and retrieve document rules', async () => {
    const created = await service.create({ name: 'Invoice Rule' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Invoice Rule',
    });
  });
});
