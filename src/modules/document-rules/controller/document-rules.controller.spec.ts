import { Test, TestingModule } from '@nestjs/testing';
import { DocumentRulesController } from './document-rules.controller';
import { DocumentRulesService } from '../service/document-rules.service';

describe('DocumentRulesController', () => {
  let controller: DocumentRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentRulesController],
      providers: [
        {
          provide: DocumentRulesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DocumentRulesController>(DocumentRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
