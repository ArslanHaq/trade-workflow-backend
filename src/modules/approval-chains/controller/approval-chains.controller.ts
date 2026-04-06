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
import { ApprovalChainsService } from '../service/approval-chains.service';

@Controller('approval-chains')
export class ApprovalChainsController {
  constructor(private readonly approvalChainsService: ApprovalChainsService) {}

  @Get()
  findAll() {
    return this.approvalChainsService.findAll();
  }

  @Post()
  create(@Body() payload: Record<string, unknown>) {
    return this.approvalChainsService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.approvalChainsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.approvalChainsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.approvalChainsService.remove(id);
  }
}
