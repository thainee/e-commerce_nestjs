import slugify from 'slugify';
import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
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
  deletedDate?: Date;

  @BeforeInsert()
  generateSlug() {
    const date = new Date();
    this.slug = slugify(this.name + date.getTime(), { lower: true });
  }
}
