import { Module } from '@nestjs/common';
import { WorkflowStagesController } from './controller/workflow-stages.controller';
import { WorkflowStagesService } from './service/workflow-stages.service';

@Module({
  controllers: [WorkflowStagesController],
  providers: [WorkflowStagesService],
})
export class WorkflowStagesModule {}
