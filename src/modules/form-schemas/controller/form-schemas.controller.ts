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
import { FormSchemasService } from '../service/form-schemas.service';

@Controller('form-schemas')
export class FormSchemasController {
  constructor(private readonly formSchemasService: FormSchemasService) {}

  @Get()
  findAll() {
    return this.formSchemasService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.formSchemasService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formSchemasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.formSchemasService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.formSchemasService.remove(id);
  }
}
