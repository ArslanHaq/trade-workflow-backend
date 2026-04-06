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
import { WorkflowStagesService } from '../service/workflow-stages.service';

@Controller('workflow-stages')
export class WorkflowStagesController {
  constructor(private readonly workflowStagesService: WorkflowStagesService) {}

  @Get()
  findAll() {
    return this.workflowStagesService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.workflowStagesService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workflowStagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.workflowStagesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workflowStagesService.remove(id);
  }
}
