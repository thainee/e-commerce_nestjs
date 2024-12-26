import { Body, Controller, Patch } from '@nestjs/common';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Patch()
  update(@Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(updatePermissionDto);
  }
}
