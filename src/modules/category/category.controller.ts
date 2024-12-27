import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('categories')
@TransformResponseDto(ResponseCategoryDto)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
}
