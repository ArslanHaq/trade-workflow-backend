import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { CasesService } from './cases.service';

describe('CasesService', () => {
  let service: CasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<CasesService>(CasesService);
  });

  it('should create and retrieve cases', async () => {
    const created = await service.create({
      title: 'Import LC',
      status: 'draft',
    });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      title: 'Import LC',
      status: 'draft',
    });
  });
});
