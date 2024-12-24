import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { ReponseRoleDto } from './dto/response-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NonEmptyBody } from 'src/shared/decorators/non-empty-body.decorator';

@Controller('roles')
@TransformResponseDto(ReponseRoleDto)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.roleService.getById(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() @NonEmptyBody() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
