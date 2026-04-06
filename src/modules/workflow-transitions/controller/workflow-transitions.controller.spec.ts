import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowTransitionsController } from './workflow-transitions.controller';
import { WorkflowTransitionsService } from '../service/workflow-transitions.service';

describe('WorkflowTransitionsController', () => {
  let controller: WorkflowTransitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowTransitionsController],
      providers: [
        {
          provide: WorkflowTransitionsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<WorkflowTransitionsController>(
      WorkflowTransitionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
