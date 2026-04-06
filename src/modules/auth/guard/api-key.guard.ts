import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const configuredApiKey = this.configService.get<string>('X_API_KEY');

    if (!configuredApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const providedApiKey = request.header('x-api-key');

    if (!providedApiKey) {
      throw new UnauthorizedException('Missing x-api-key header.');
    }

    if (providedApiKey !== configuredApiKey) {
      throw new UnauthorizedException('Invalid x-api-key header.');
    }

    return true;
  }
}
