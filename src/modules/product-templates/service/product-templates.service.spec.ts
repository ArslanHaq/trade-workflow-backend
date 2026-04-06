import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { ProductTemplatesService } from './product-templates.service';

describe('ProductTemplatesService', () => {
  let service: ProductTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTemplatesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<ProductTemplatesService>(ProductTemplatesService);
  });

  it('should create and retrieve product templates', async () => {
    const created = await service.create({ name: 'Trade Finance' });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Trade Finance',
    });
  });
});
