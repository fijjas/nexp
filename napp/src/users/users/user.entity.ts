import { Column, CreateDateColumn, Entity, Index, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from '../../common/entities';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 255 })
  @Index()
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255, unique: true })
  @Index()
  email: string;

  @Column({ length: 255 })
  @Exclude()
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
