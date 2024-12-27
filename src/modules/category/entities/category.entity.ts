import slugify from 'slugify';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @BeforeInsert()
  generateSlug() {
    const date = new Date();
    this.slug = slugify(this.name + date.getTime(), { lower: true });
  }
}
