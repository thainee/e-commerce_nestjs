import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsString()
  @IsNotEmpty()
  endpointId: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsBoolean()
  @IsNotEmpty()
  isAllow: boolean;
}
