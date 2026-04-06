import { Module } from '@nestjs/common';
import { DocumentTypesController } from './controller/document-types.controller';
import { DocumentTypesService } from './service/document-types.service';

@Module({
  controllers: [DocumentTypesController],
  providers: [DocumentTypesService],
})
export class DocumentTypesModule {}
