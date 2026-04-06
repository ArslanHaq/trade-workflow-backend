import { Module } from '@nestjs/common';
import { AuditLogsController } from './controller/audit-logs.controller';
import { AuditLogsService } from './service/audit-logs.service';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService],
})
export class AuditLogsModule {}
