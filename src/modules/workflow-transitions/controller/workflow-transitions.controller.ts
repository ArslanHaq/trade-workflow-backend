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
import { WorkflowTransitionsService } from '../service/workflow-transitions.service';

@Controller('workflow-transitions')
export class WorkflowTransitionsController {
  constructor(
    private readonly workflowTransitionsService: WorkflowTransitionsService,
  ) {}

  @Get()
  findAll() {
    return this.workflowTransitionsService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.workflowTransitionsService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.workflowTransitionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.workflowTransitionsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workflowTransitionsService.remove(id);
  }
}
