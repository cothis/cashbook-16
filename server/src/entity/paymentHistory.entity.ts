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

export interface IHistory {
  uuid: number;
  githubId: string;
  content: string;
  amount: number;
  isIncome: boolean;
  payDate: Date;
  method: PaymentMethod;
  category: PaymentCategory;
}

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

  @Index('date-idx')
  @Column()
  payDate: Date;

  @Index('method-idx')
  @ManyToOne(() => PaymentMethod, (method) => method.histories, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  method: PaymentMethod;

  @Index('category-idx')
  @ManyToOne(() => PaymentCategory, (category) => category.histories, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: PaymentCategory;

  toJSON() {
    return { ...this, uuid: undefined };
  }
}
