import { Test, TestingModule } from '@nestjs/testing';
import { CasesController } from './cases.controller';
import { CasesService } from '../service/cases.service';

describe('CasesController', () => {
  let controller: CasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasesController],
      providers: [
        {
          provide: CasesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CasesController>(CasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
