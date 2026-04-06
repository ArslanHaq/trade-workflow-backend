import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesService, createPrismaMockProvider()],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should create and retrieve roles', async () => {
    const created = await service.createRole({
      name: 'Administrator',
      code: 'admin',
      description: ' System administrator ',
    });

    await expect(service.getAllRoles()).resolves.toHaveLength(1);
    await expect(service.getRoleById(created.id)).resolves.toMatchObject({
      name: 'Administrator',
      code: 'ADMIN',
      description: 'System administrator',
    });
  });

  it('should update and delete a role', async () => {
    const created = await service.createRole({
      name: 'Approver',
      code: 'APPROVER',
      description: 'Can approve tasks',
    });

    await expect(
      service.updateRole(created.id, {
        description: 'Can approve workflow steps',
      }),
    ).resolves.toMatchObject({
      id: created.id,
      description: 'Can approve workflow steps',
    });

    await expect(service.deleteRole(created.id)).resolves.toMatchObject({
      id: created.id,
      code: 'APPROVER',
    });
  });
});
