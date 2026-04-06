import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

type CrudEntity = {
  id: number;
} & Record<string, unknown>;

export abstract class PrismaCrudService {
  protected constructor(
    protected readonly prisma: PrismaService,
    private readonly delegateName: string,
    private readonly entityLabel: string,
  ) {}

  async findAll(): Promise<CrudEntity[]> {
    return await this.getDelegate().findMany({
      orderBy: { id: 'asc' },
    });
  }

  async create(payload: Record<string, unknown>): Promise<CrudEntity> {
    try {
      return await this.getDelegate().create({
        data: payload,
      });
    } catch (error) {
      this.handlePrismaError(error, this.entityLabel);
    }
  }

  async findOne(id: number): Promise<CrudEntity> {
    const entity = await this.getDelegate().findUnique({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(
        `${this.entityLabel} with id "${id}" was not found.`,
      );
    }

    return entity;
  }

  async update(
    id: number,
    payload: Record<string, unknown>,
  ): Promise<CrudEntity> {
    try {
      return await this.getDelegate().update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      this.handlePrismaError(error, this.entityLabel, id);
    }
  }

  async remove(id: number): Promise<CrudEntity> {
    try {
      return await this.getDelegate().delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error, this.entityLabel, id);
    }
  }

  protected handlePrismaError(
    error: unknown,
    entityLabel: string,
    id?: number,
  ): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `${entityLabel} with id "${id}" was not found.`,
        );
      }

      if (error.code === 'P2002') {
        throw new ConflictException(
          `${entityLabel} already exists with the provided unique value.`,
        );
      }
    }

    throw error;
  }

  private getDelegate(): {
    findMany(args: { orderBy: { id: 'asc' } }): Promise<CrudEntity[]>;
    create(args: { data: Record<string, unknown> }): Promise<CrudEntity>;
    findUnique(args: { where: { id: number } }): Promise<CrudEntity | null>;
    update(args: {
      where: { id: number };
      data: Record<string, unknown>;
    }): Promise<CrudEntity>;
    delete(args: { where: { id: number } }): Promise<CrudEntity>;
  } {
    return (
      this.prisma as unknown as Record<
        string,
        {
          findMany(args: { orderBy: { id: 'asc' } }): Promise<CrudEntity[]>;
          create(args: { data: Record<string, unknown> }): Promise<CrudEntity>;
          findUnique(args: {
            where: { id: number };
          }): Promise<CrudEntity | null>;
          update(args: {
            where: { id: number };
            data: Record<string, unknown>;
          }): Promise<CrudEntity>;
          delete(args: { where: { id: number } }): Promise<CrudEntity>;
        }
      >
    )[this.delegateName];
  }
}
