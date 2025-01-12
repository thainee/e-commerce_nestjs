import slugify from 'slugify';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  slug: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Category, (c) => c.childrenCategories)
  parentCategory: Category;

  @OneToMany(() => Category, (c) => c.parentCategory)
  childrenCategories: Category[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @BeforeInsert()
  generateSlug() {
    const date = new Date();
    this.slug = slugify(this.name + date.getTime(), { lower: true });
  }
}
