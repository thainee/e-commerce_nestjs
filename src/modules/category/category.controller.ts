import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { ResponseUpdateCategoryDto } from './dto/response-update-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@TransformResponseDto(ResponseCategoryDto)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);

    return {
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  async getAll() {
    const categories = await this.categoryService.getAll();

    return {
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoryService.getById(id);

    return {
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  @Patch(':id')
  @TransformResponseDto(ResponseUpdateCategoryDto)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, updateCategoryDto);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.categoryService.delete(id);

    return {
      message: 'Category deleted successfully',
    };
  }
}
