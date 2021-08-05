import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
  RelationId,
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

  @RelationId((history: PaymentHistory) => history.method)
  methodId: number;

  @Index('category-idx')
  @ManyToOne(() => PaymentCategory, (category) => category.histories, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: PaymentCategory;

  @RelationId((history: PaymentHistory) => history.category)
  categoryName: string;

  // toJSON() {
  //   return { ...this, uuid: undefined };
  // }
}
