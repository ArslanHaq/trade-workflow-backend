import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { DocumentTypesService } from './document-types.service';

describe('DocumentTypesService', () => {
  let service: DocumentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentTypesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<DocumentTypesService>(DocumentTypesService);
  });

  it('should create and retrieve document types', async () => {
    const created = await service.create({ name: 'Invoice' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Invoice',
    });
  });
});
