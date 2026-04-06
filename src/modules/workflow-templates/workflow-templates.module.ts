import { Module } from '@nestjs/common';
import { WorkflowTemplatesController } from './controller/workflow-templates.controller';
import { WorkflowTemplatesService } from './service/workflow-templates.service';

@Module({
  controllers: [WorkflowTemplatesController],
  providers: [WorkflowTemplatesService],
})
export class WorkflowTemplatesModule {}
