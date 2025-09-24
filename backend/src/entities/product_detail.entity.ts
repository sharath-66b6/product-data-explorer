import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductDetail {
  // product_id acts as PK and FK to product.id
  @PrimaryColumn()
  product_id: number;

  @OneToOne(() => Product, (product) => product.product_detail, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // flexible JSON for specs (publisher, isbn, pub_date, etc.)
  @Column({ type: 'jsonb', nullable: true })
  specs: Record<string, any> | null;

  @Column({ type: 'float', nullable: true })
  ratings_avg: number | null;

  @Column({ type: 'int', default: 0 })
  reviews_count: number;

  @Index()
  @Column({ type: 'timestamp', nullable: true })
  last_scraped_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
