import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowStagesController } from './workflow-stages.controller';
import { WorkflowStagesService } from '../service/workflow-stages.service';

describe('WorkflowStagesController', () => {
  let controller: WorkflowStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowStagesController],
      providers: [
        {
          provide: WorkflowStagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WorkflowStagesController>(WorkflowStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
