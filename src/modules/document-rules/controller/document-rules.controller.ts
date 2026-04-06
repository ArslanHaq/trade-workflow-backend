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
import { DocumentRulesService } from '../service/document-rules.service';

@Controller('document-rules')
export class DocumentRulesController {
  constructor(private readonly documentRulesService: DocumentRulesService) {}

  @Get()
  findAll() {
    return this.documentRulesService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.documentRulesService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentRulesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.documentRulesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentRulesService.remove(id);
  }
}
