import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowTemplatesController } from './workflow-templates.controller';
import { WorkflowTemplatesService } from '../service/workflow-templates.service';

describe('WorkflowTemplatesController', () => {
  let controller: WorkflowTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowTemplatesController],
      providers: [
        {
          provide: WorkflowTemplatesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WorkflowTemplatesController>(
      WorkflowTemplatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
