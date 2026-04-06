import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'Administrator',
    description: 'Human-readable role name.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Unique system code used across the platform.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;

  @ApiPropertyOptional({
    example: 'Full access to system management features.',
    description: 'Optional description of the role.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
