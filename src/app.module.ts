import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApprovalChainsModule } from './modules/approval-chains/approval-chains.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { CasesModule } from './modules/cases/cases.module';
import { DocumentRulesModule } from './modules/document-rules/document-rules.module';
import { DocumentTypesModule } from './modules/document-types/document-types.module';
import { FormSchemasModule } from './modules/form-schemas/form-schemas.module';
import { ProductTemplatesModule } from './modules/product-templates/product-templates.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { WorkflowStagesModule } from './modules/workflow-stages/workflow-stages.module';
import { WorkflowTemplatesModule } from './modules/workflow-templates/workflow-templates.module';
import { WorkflowTransitionsModule } from './modules/workflow-transitions/workflow-transitions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProductTemplatesModule,
    WorkflowTemplatesModule,
    WorkflowStagesModule,
    WorkflowTransitionsModule,
    FormSchemasModule,
    DocumentTypesModule,
    DocumentRulesModule,
    ApprovalChainsModule,
    CasesModule,
    AuditLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
