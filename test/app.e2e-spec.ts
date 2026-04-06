import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

interface StatusResponse {
  name: string;
  status: string;
  storage: string;
  modules: string[];
}

interface UserResponse {
  email: string;
  name: string;
  passwordHash?: string;
}

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const originalApiKey = process.env.X_API_KEY;

  beforeEach(async () => {
    process.env.X_API_KEY = '';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(({ body }: { body: StatusResponse }) => {
        expect(body.name).toBe('trade-workflow-backend');
        expect(body.status).toBe('ok');
        expect(['database', 'database-missing']).toContain(body.storage);
        expect(body.modules).toContain('auth');
      });
  });

  it('/users (POST)', () => {
    const email = `review-${Date.now()}@example.com`;

    return request(app.getHttpServer())
      .post('/users')
      .send({
        email,
        name: 'Reviewer',
        password: 'secret123',
      })
      .expect(201)
      .expect(({ body }: { body: UserResponse }) => {
        expect(body.email).toBe(email);
        expect(body.name).toBe('Reviewer');
        expect(body.passwordHash).toBeUndefined();
      });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }

    process.env.X_API_KEY = originalApiKey;
  });
});

describe('ApiKeyGuard (e2e)', () => {
  let app: INestApplication<App>;
  const originalApiKey = process.env.X_API_KEY;

  beforeAll(() => {
    process.env.X_API_KEY = 'super-secret-api-key';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) should reject requests without x-api-key', () => {
    return request(app.getHttpServer()).get('/users').expect(401);
  });

  it('/users (GET) should allow requests with x-api-key', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('x-api-key', 'super-secret-api-key')
      .expect(200);
  });

  it('/auth/login (POST) should remain public', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'missing@example.com',
        password: 'secret123',
      })
      .expect(401);
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  afterAll(() => {
    process.env.X_API_KEY = originalApiKey;
  });
});
