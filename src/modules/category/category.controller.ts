import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@TransformResponseDto(ResponseCategoryDto)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log('create');
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
  async getById(@Param('id') id: string) {
    const category = await this.categoryService.getById(id);

    return {
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, updateCategoryDto);

    return {
      message: 'Category updated successfully',
      data: category,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.categoryService.delete(id);

    return {
      message: 'Category deleted successfully',
    };
  }
}
