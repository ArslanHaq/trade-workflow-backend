import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';

interface CreateUserInput {
  email: string;
  name?: string;
  password?: string;
  roles?: string[];
  status?: string;
  profile?: Record<string, unknown>;
}

type UpdateUserInput = Partial<CreateUserInput>;

interface StoredUser extends Record<string, unknown> {
  id: number;
  email: string;
  name: string | null;
  passwordHash: string | null;
  roles: string[];
  status: string;
  profile: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });

    return users.map((user) => this.toPublicUser(user));
  }

  async create(input: CreateUserInput) {
    try {
      const storedUser = await this.prisma.user.create({
        data: {
          email: input.email,
          name: input.name ?? null,
          passwordHash: await bcrypt.hash(input.password ?? 'change-me', 10),
          roles: input.roles ?? [],
          status: input.status ?? 'active',
          profile: this.toPrismaJsonValue(input.profile),
        },
      });

      return this.toPublicUser(storedUser);
    } catch (error) {
      this.handleUserWriteError(error, input.email);
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" does not exist.`);
    }

    return this.toPublicUser(user);
  }

  async update(id: number, input: UpdateUserInput) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException(`User with id "${id}" does not exist.`);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          email: input.email ?? existingUser.email,
          name: input.name ?? existingUser.name,
          passwordHash: input.password
            ? await bcrypt.hash(input.password, 10)
            : existingUser.passwordHash,
          roles: input.roles ?? existingUser.roles,
          status: input.status ?? existingUser.status,
          profile:
            input.profile === undefined
              ? this.toPrismaJsonValue(existingUser.profile)
              : this.toPrismaJsonValue(input.profile),
        },
      });

      return this.toPublicUser(updatedUser);
    } catch (error) {
      this.handleUserWriteError(error, input.email, id);
    }
  }

  async remove(id: number) {
    try {
      const removedUser = await this.prisma.user.delete({
        where: { id },
      });

      return this.toPublicUser(removedUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id "${id}" does not exist.`);
      }

      throw error;
    }
  }

  async findStoredUserByEmail(email: string): Promise<StoredUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    }) as Promise<StoredUser | null>;
  }

  private handleUserWriteError(
    error: unknown,
    email?: string,
    id?: number,
  ): never {
    if (
      error instanceof ConflictException ||
      error instanceof NotFoundException
    ) {
      throw error;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002' && email) {
        throw new ConflictException(
          `A user with email "${email}" already exists.`,
        );
      }

      if (error.code === 'P2025' && id !== undefined) {
        throw new NotFoundException(`User with id "${id}" does not exist.`);
      }
    }

    throw error;
  }

  private toPublicUser(user: Record<string, unknown>) {
    const { passwordHash, ...publicUser } = user;
    void passwordHash;
    return publicUser;
  }

  private toPrismaJsonValue(
    value: Prisma.JsonValue | Record<string, unknown> | undefined,
  ): Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput {
    if (value === undefined || value === null) {
      return Prisma.JsonNull;
    }

    return value as Prisma.InputJsonValue;
  }
}
