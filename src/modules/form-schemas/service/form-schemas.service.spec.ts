import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { FormSchemasService } from './form-schemas.service';

describe('FormSchemasService', () => {
  let service: FormSchemasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormSchemasService, createPrismaMockProvider()],
    }).compile();

    service = module.get<FormSchemasService>(FormSchemasService);
  });

  it('should create and retrieve form schemas', async () => {
    const created = await service.create({
      name: 'Trade Form',
      fields: ['amount'],
    });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      name: 'Trade Form',
    });
  });
});
