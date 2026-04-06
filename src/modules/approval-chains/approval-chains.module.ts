import { Module } from '@nestjs/common';
import { ApprovalChainsController } from './controller/approval-chains.controller';
import { ApprovalChainsService } from './service/approval-chains.service';

@Module({
  controllers: [ApprovalChainsController],
  providers: [ApprovalChainsService],
})
export class ApprovalChainsModule {}
