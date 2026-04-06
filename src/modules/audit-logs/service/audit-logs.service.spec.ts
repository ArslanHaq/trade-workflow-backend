import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { AuditLogsService } from './audit-logs.service';

describe('AuditLogsService', () => {
  let service: AuditLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuditLogsService, createPrismaMockProvider()],
    }).compile();

    service = module.get<AuditLogsService>(AuditLogsService);
  });

  it('should create and retrieve audit logs', async () => {
    const created = await service.create({
      action: 'case.created',
      entityType: 'case',
    });

    await expect(service.findAll()).resolves.toHaveLength(1);
    await expect(service.findOne(created.id)).resolves.toMatchObject({
      action: 'case.created',
      entityType: 'case',
    });
  });
});
