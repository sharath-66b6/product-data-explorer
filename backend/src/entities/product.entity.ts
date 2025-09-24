import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductDetail } from './product_detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // string type (no union) + explicit varchar
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 200 })
  source_id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 1000, nullable: true })
  source_url: string;

  @Column({ type: 'varchar', length: 1000 })
  title: string;

  // use simple string type; let DB allow NULL
  @Column({ type: 'varchar', length: 500, nullable: true })
  author: string;

  // explicitly varchar to avoid any "Object" design:type issues
  @Column({ type: 'varchar', length: 50, nullable: true })
  price: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  currency: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at: Date;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true, onDelete: 'SET NULL' })
  category: Category;

  @OneToOne(() => ProductDetail, (detail) => detail.product, { cascade: true })
  @JoinColumn({ name: 'product_detail_id' })
  product_detail: ProductDetail;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
