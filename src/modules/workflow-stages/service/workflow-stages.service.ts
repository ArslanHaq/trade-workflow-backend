import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from '../../../common/prisma/prisma-crud.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class WorkflowStagesService extends PrismaCrudService {
  constructor(prisma: PrismaService) {
    super(prisma, 'workflowStage', 'Workflow stage');
  }
}
