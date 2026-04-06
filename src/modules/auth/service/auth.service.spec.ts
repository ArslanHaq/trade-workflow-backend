import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { createPrismaMockProvider } from '../../../test-utils/prisma-service.mock';
import { UsersService } from '../../users/service/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        createPrismaMockProvider(),
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mock-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register and login a user', async () => {
    const registered = await service.register({
      email: 'auth@example.com',
      password: 'secret123',
      name: 'Auth User',
    });

    const loggedIn = await service.login({
      email: 'auth@example.com',
      password: 'secret123',
    });

    expect(registered.accessToken).toEqual(expect.any(String));
    expect(loggedIn.user).toMatchObject({
      email: 'auth@example.com',
      name: 'Auth User',
    });
  });
});
