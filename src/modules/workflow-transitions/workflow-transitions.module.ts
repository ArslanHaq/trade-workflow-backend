import { Module } from '@nestjs/common';
import { WorkflowTransitionsController } from './controller/workflow-transitions.controller';
import { WorkflowTransitionsService } from './service/workflow-transitions.service';

@Module({
  controllers: [WorkflowTransitionsController],
  providers: [WorkflowTransitionsService],
})
export class WorkflowTransitionsModule {}
