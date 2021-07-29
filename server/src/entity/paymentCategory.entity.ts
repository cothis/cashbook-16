import { Entity, Column, PrimaryColumn, OneToMany, BaseEntity } from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';

@Entity()
export class PaymentCategory extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => PaymentHistory, (history) => history.category)
  histories: PaymentHistory[];
}
