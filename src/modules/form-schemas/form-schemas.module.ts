import { Module } from '@nestjs/common';
import { FormSchemasController } from './controller/form-schemas.controller';
import { FormSchemasService } from './service/form-schemas.service';

@Module({
  controllers: [FormSchemasController],
  providers: [FormSchemasService],
})
export class FormSchemasModule {}
