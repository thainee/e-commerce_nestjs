import slugify from 'slugify';
import { Category } from 'src/modules/category/entities/category.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  offerPrice: number;

  @Column()
  shortDescription: string;

  @Column({ nullable: true })
  longDescription: string;

  @Column()
  quantity: number;

  @Column()
  slug: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @BeforeInsert()
  generateSlug() {
    const date = new Date();
    this.slug = slugify(this.name + date.getTime(), { lower: true });
  }
}
