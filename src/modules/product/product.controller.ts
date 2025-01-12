import { Body, Controller, Post } from '@nestjs/common';
import { TransformResponseDto } from 'src/shared/decorators/transform-response-dto.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { ProductService } from './product.service';

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
}
