import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
} from 'typeorm';
import { PaymentCategory } from './paymentCategory.entity';
import { PaymentMethod } from './paymentMethod.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Index('id-index')
  @Column()
  githubId!: string;

  @Column()
  content: string;

  @Column('decimal')
  amount: number;

  @Index('income-idx')
  @Column()
  isIncome: boolean;

  @Index('method-idx')
  @ManyToOne(() => PaymentMethod, (method) => method.histories)
  method: string;

  @Index('category-idx')
  @ManyToOne(() => PaymentCategory, (category) => category.histories)
  category: string;

  toJSON() {
    return { ...this, uuid: undefined };
  }
}
