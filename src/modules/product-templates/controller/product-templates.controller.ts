import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductTemplatesService } from '../service/product-templates.service';

@Controller('product-templates')
export class ProductTemplatesController {
  constructor(
    private readonly productTemplatesService: ProductTemplatesService,
  ) {}

  @Get()
  findAll() {
    return this.productTemplatesService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.productTemplatesService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.productTemplatesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productTemplatesService.remove(id);
  }
}
