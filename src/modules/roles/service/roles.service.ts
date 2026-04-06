import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: this.toCreateRoleData(createRoleDto),
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async getAllRoles() {
    return await this.prisma.role.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getRoleById(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with id "${id}" was not found.`);
    }

    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: { id },
        data: this.toUpdateRoleData(updateRoleDto),
      });
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async deleteRole(id: number) {
    try {
      return await this.prisma.role.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private toCreateRoleData(
    createRoleDto: CreateRoleDto,
  ): Prisma.RoleCreateInput {
    return {
      name: createRoleDto.name.trim(),
      code: createRoleDto.code.trim().toUpperCase(),
      description: this.normalizeDescription(createRoleDto.description),
    };
  }

  private toUpdateRoleData(
    updateRoleDto: UpdateRoleDto,
  ): Prisma.RoleUpdateInput {
    const data: Prisma.RoleUpdateInput = {};

    if (updateRoleDto.name !== undefined) {
      data.name = updateRoleDto.name.trim();
    }

    if (updateRoleDto.code !== undefined) {
      data.code = updateRoleDto.code.trim().toUpperCase();
    }

    if (updateRoleDto.description !== undefined) {
      data.description = this.normalizeDescription(updateRoleDto.description);
    }

    return data;
  }

  private normalizeDescription(
    description?: string,
  ): string | null | undefined {
    if (description === undefined) {
      return undefined;
    }

    const normalizedDescription = description.trim();

    return normalizedDescription.length > 0 ? normalizedDescription : null;
  }

  private handlePrismaError(error: unknown, id?: number): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Role already exists with the provided unique value.',
        );
      }

      if (error.code === 'P2025') {
        throw new NotFoundException(`Role with id "${id}" was not found.`);
      }
    }

    throw error;
  }
}
