import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@TransformResponseDto(ResponseProductDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  @Get()
  async getAll() {
    const products = await this.productService.getAll();

    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productService.getById(id);

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    const product = await this.productService.getBySlug(slug);

    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(id, updateProductDto);

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.productService.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
