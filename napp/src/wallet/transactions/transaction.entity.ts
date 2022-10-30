import { Column, CreateDateColumn, Entity, Index } from 'typeorm';
import { AbstractEntity } from '../../common/entities';

@Entity()
export class Transaction extends AbstractEntity {
  @Column('int', { nullable: true })
  @Index()
  fromUserId: number|null;

  @Column('int')
  @Index()
  toUserId: number;

  @Column('int', { unsigned: true })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  // @ManyToOne(() => User, (user) => user.id)
  // fromUser: User;
  //
  // @ManyToOne(() => User, (user) => user.id)
  // toUser: User;
}
