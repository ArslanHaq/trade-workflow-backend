import { Test, TestingModule } from '@nestjs/testing';
import { FormSchemasController } from './form-schemas.controller';
import { FormSchemasService } from '../service/form-schemas.service';

describe('FormSchemasController', () => {
  let controller: FormSchemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormSchemasController],
      providers: [
        {
          provide: FormSchemasService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FormSchemasController>(FormSchemasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
