import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.getById(
      createProductDto.categoryId,
    );

    const product = new Product();
    product.category = category;

    Object.assign(product, createProductDto);

    return this.productRepository.save(product);
  }
}
