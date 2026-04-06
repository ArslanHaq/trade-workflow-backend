import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from '../service/roles.service';

describe('RolesController', () => {
  let controller: RolesController;
  const rolesService = {
    createRole: jest.fn(),
    getAllRoles: jest.fn(),
    getRoleById: jest.fn(),
    updateRole: jest.fn(),
    deleteRole: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: rolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    jest.clearAllMocks();
  });

  it('should delegate CRUD calls to the service', async () => {
    const createDto = {
      name: 'Trade Officer',
      code: 'TRADE_OFFICER',
      description: 'Handles trade operations',
    };
    const updateDto = {
      description: 'Handles end-to-end trade operations',
    };

    await controller.createRole(createDto);
    await controller.getAllRoles();
    await controller.getRoleById(1);
    await controller.updateRole(1, updateDto);
    await controller.deleteRole(1);

    expect(rolesService.createRole).toHaveBeenCalledWith(createDto);
    expect(rolesService.getAllRoles).toHaveBeenCalled();
    expect(rolesService.getRoleById).toHaveBeenCalledWith(1);
    expect(rolesService.updateRole).toHaveBeenCalledWith(1, updateDto);
    expect(rolesService.deleteRole).toHaveBeenCalledWith(1);
  });
});
