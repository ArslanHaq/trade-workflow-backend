import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return service status', () => {
      const status = appController.getStatus();

      expect(status.name).toBe('trade-workflow-backend');
      expect(status.status).toBe('ok');
      expect(['database', 'database-missing']).toContain(status.storage);
      expect(status.modules).toEqual(
        expect.arrayContaining(['auth', 'users', 'cases']),
      );
    });
  });
});
