import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Socket } from 'net';
import { TLSSocket, connect as tlsConnect } from 'tls';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    const databaseUrl = configService.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is required for Prisma runtime access.');
    }

    const normalizedDatabaseUrl = new URL(databaseUrl);
    normalizedDatabaseUrl.searchParams.delete('sslmode');

    const adapter = new PrismaPg({
      connectionString: normalizedDatabaseUrl.toString(),
      ssl: {
        rejectUnauthorized: false,
      },
    });

    super({
      adapter,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', () => {
      void app.close();
    });
  }

  async checkDatabaseConnectivity(): Promise<{
    configured: boolean;
    connected: boolean;
    message: string;
  }> {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    if (!databaseUrl) {
      return {
        configured: false,
        connected: false,
        message:
          'DATABASE_URL not found. Runtime is using in-memory placeholder services.',
      };
    }

    try {
      const parsedUrl = new URL(databaseUrl);
      const host = parsedUrl.hostname;
      const port = Number(parsedUrl.port || '5432');
      const sslMode = parsedUrl.searchParams.get('sslmode');
      const requiresTls = sslMode === 'require';

      await this.probeSocket(host, port, requiresTls);

      return {
        configured: true,
        connected: true,
        message: `Database host ${host}:${port} is reachable.`,
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown database connectivity error.';

      return {
        configured: true,
        connected: false,
        message: `Database connectivity check failed: ${message}`,
      };
    }
  }

  private probeSocket(
    host: string,
    port: number,
    useTls: boolean,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeoutMs = 5000;
      let socket: Socket | TLSSocket;

      const cleanup = () => {
        socket.removeAllListeners();
        socket.destroy();
      };

      const onConnect = () => {
        cleanup();
        resolve();
      };

      const onError = (error: Error) => {
        cleanup();
        reject(error);
      };

      if (useTls) {
        socket = tlsConnect({
          host,
          port,
          servername: host,
          rejectUnauthorized: false,
        });
        socket.once('secureConnect', onConnect);
      } else {
        socket = new Socket();
        socket.connect(port, host, onConnect);
      }

      socket.setTimeout(timeoutMs);
      socket.once('timeout', () => {
        onError(new Error(`Connection timed out after ${timeoutMs}ms.`));
      });
      socket.once('error', onError);
    });
  }
}
