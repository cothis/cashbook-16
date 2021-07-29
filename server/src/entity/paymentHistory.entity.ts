import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { PaymentCategory } from './paymentCategory.entity';

@Entity()
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: number;

  @Column()
  content: string;

  @Column()
  method_name: string;

  @Column('decimal')
  amount: number;

  @Column()
  isIncome: boolean;

  @ManyToOne(() => PaymentCategory, (category) => category.histories)
  categoryName: string;
}
