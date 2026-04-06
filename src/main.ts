import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  const port = process.env.PORT ?? 3000;
  const host = 'localhost';
  const swaggerPath = 'api/docs';
  const apiBaseUrl = `http://${host}:${port}`;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Trade Workflow Backend')
    .setDescription('API documentation for the trade workflow backend.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description:
          'Send the configured x-api-key header to access protected endpoints.',
      },
      'x-api-key',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(swaggerPath, app, swaggerDocument);

  await app.listen(port);

  const databaseStatus = await prismaService.checkDatabaseConnectivity();

  logger.log(`Trade Workflow Backend is running on ${apiBaseUrl}`);
  logger.log(`Swagger UI is running on ${apiBaseUrl}/${swaggerPath}`);
  logger.log(
    `Environment: ${process.env.NODE_ENV ?? 'development'} | Port: ${port}`,
  );
  logger.log(
    `JWT configuration: ${process.env.JWT_SECRET ? 'configured' : 'missing JWT_SECRET'}`,
  );
  logger.log(
    `x-api-key protection: ${process.env.X_API_KEY ? 'enabled' : 'disabled (set X_API_KEY in .env to enable)'}`,
  );
  logger.log(
    `Database connection: ${databaseStatus.connected ? 'connected' : 'not connected'}`,
  );
  logger.log(databaseStatus.message);
  logger.log(
    `Persistence mode: ${databaseStatus.connected ? 'database-backed Prisma services' : 'database unavailable'}`,
  );
}
void bootstrap();
