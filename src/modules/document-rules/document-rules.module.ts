import { Module } from '@nestjs/common';
import { DocumentRulesController } from './controller/document-rules.controller';
import { DocumentRulesService } from './service/document-rules.service';

@Module({
  controllers: [DocumentRulesController],
  providers: [DocumentRulesService],
})
export class DocumentRulesModule {}
