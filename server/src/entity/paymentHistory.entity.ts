import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { PaymentCategory } from './paymentCategory.entity';
import { PaymentMethod } from './paymentMethod.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  content: string;

  @Column('decimal')
  amount: number;

  @Column()
  isIncome: boolean;

  @ManyToOne(() => PaymentMethod, (method) => method.histories)
  method: string;

  @ManyToOne(() => PaymentCategory, (category) => category.histories)
  category: string;
}
