import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ type: 'varchar', length: 200, nullable: true })
  author: string | null;

  @Column({ type: 'float', nullable: true })
  rating: number | null;

  @Column({ type: 'text' })
  text: string;

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
