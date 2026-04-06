import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/service/users.service';

interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const user = await this.usersService.create(input);
    return this.issueSession(user.id as number, user.email as string, user);
  }

  async login(input: LoginInput) {
    const storedUser = await this.usersService.findStoredUserByEmail(
      input.email,
    );

    if (!storedUser) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!storedUser.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      storedUser.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const user = await this.usersService.findOne(storedUser.id);
    return this.issueSession(storedUser.id, storedUser.email, user);
  }

  private issueSession(
    id: number,
    email: string,
    user: Record<string, unknown>,
  ) {
    return {
      accessToken: this.jwtService.sign({
        sub: id,
        email,
      }),
      user,
    };
  }
}
