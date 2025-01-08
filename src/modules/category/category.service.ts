import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new Category();

    Object.assign(category, createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  async getById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.getById(id);

    Object.assign(category, updateCategoryDto);

    return this.categoryRepository.save(category);
  }

  async delete(id: string): Promise<void> {
    const category = await this.getById(id);

    await this.categoryRepository.softRemove(category);
  }
}
