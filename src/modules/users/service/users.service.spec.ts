import { Test, TestingModule } from '@nestjs/testing';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, createPrismaMockProvider()],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create users without exposing password hashes', async () => {
    const created = await service.create({
      email: 'user@example.com',
      password: 'secret123',
      name: 'Trade User',
    });

    expect(created).toMatchObject({
      email: 'user@example.com',
      name: 'Trade User',
    });
    expect(created).not.toHaveProperty('passwordHash');
  });
});
