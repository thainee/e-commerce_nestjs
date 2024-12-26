import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async update(updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: {
        endpointId: updatePermissionDto.endpointId,
        roleId: updatePermissionDto.roleId,
      },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    permission.isAllow = updatePermissionDto.isAllow;
    return this.permissionRepository.save(permission);
  }
}
