import { Test, TestingModule } from '@nestjs/testing';
import { ProductTemplatesController } from './product-templates.controller';
import { ProductTemplatesService } from '../service/product-templates.service';

describe('ProductTemplatesController', () => {
  let controller: ProductTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTemplatesController],
      providers: [
        {
          provide: ProductTemplatesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ProductTemplatesController>(
      ProductTemplatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
