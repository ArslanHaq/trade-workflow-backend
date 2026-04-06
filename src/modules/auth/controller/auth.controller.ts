import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(
    @Body()
    payload: {
      email: string;
      password: string;
      name?: string;
    },
  ) {
    return this.authService.register(payload);
  }

  @Public()
  @Post('login')
  login(
    @Body()
    payload: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.login(payload);
  }
}
