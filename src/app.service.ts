import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'trade-workflow-backend',
      status: 'ok',
      storage: process.env.DATABASE_URL ? 'database' : 'database-missing',
      modules: [
        'auth',
        'users',
        'roles',
        'product-templates',
        'workflow-templates',
        'workflow-stages',
        'workflow-transitions',
        'form-schemas',
        'document-types',
        'document-rules',
        'approval-chains',
        'cases',
        'audit-logs',
      ],
    };
  }
}
