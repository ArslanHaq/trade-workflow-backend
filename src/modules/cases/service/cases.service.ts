import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from '../../../common/prisma/prisma-crud.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CasesService extends PrismaCrudService {
  constructor(prisma: PrismaService) {
    super(prisma, 'case', 'Case');
  }
}
