import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  // optional FK to your users table if you add authentication later
  @Column({ type: 'int', nullable: true })
  user_id: number | null;

  @Index()
  @Column({ type: 'varchar',  length: 200, nullable: true })
  session_id: string | null;

  // JSON blob of path/history: e.g. [{path:'/categories/fiction', ts:...}, ...]
  @Column({ type: 'jsonb', nullable: true })
  path_json: any[] | null;

  @CreateDateColumn()
  created_at: Date;
}
