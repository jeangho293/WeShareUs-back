import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Aggregate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ select: false })
  private readonly createdAt!: Date;

  @UpdateDateColumn({ select: false })
  private readonly updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  private readonly deletedAt!: Date;
}
