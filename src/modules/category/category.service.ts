import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    let parentCategory: Category;
    if (createCategoryDto.parentCategoryId) {
      parentCategory = await this.getById(createCategoryDto.parentCategoryId);
    }

    const category = new Category();
    category.parentCategory = parentCategory;

    Object.assign(category, createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      where: { parentCategory: IsNull() },
      relations: { childrenCategories: true },
    });

    return categories;
  }

  async getById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
        relations: { childrenCategories: true },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      return category;
    } catch {
      throw new NotFoundException('Category not found');
    }
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
