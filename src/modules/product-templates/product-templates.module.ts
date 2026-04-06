import { Module } from '@nestjs/common';
import { ProductTemplatesController } from './controller/product-templates.controller';
import { ProductTemplatesService } from './service/product-templates.service';

@Module({
  controllers: [ProductTemplatesController],
  providers: [ProductTemplatesService],
})
export class ProductTemplatesModule {}
