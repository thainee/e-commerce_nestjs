import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

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

  async getAll() {
    return this.productRepository.find();
  }

  async getById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getBySlug(slug: string) {
    const product = await this.productRepository.findOne({ where: { slug } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.getById(id);

    if (updateProductDto.categoryId) {
      const category = await this.categoryService.getById(
        updateProductDto.categoryId,
      );

      product.category = category;
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.getById(id);

    await this.productRepository.softRemove(product);
  }
}
