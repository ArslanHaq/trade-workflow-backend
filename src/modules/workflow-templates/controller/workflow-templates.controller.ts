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
import { WorkflowTemplatesService } from '../service/workflow-templates.service';

@Controller('workflow-templates')
export class WorkflowTemplatesController {
  constructor(
    private readonly workflowTemplatesService: WorkflowTemplatesService,
  ) {}

  @Get()
  findAll() {
    return this.workflowTemplatesService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.workflowTemplatesService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workflowTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.workflowTemplatesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workflowTemplatesService.remove(id);
  }
}
