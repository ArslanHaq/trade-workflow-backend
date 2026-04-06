import { Module } from '@nestjs/common';
import { CasesController } from './controller/cases.controller';
import { CasesService } from './service/cases.service';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
