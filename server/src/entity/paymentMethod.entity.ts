import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentHistory } from './paymentHistory.entity';

@Entity()
export class PaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('id-index')
  @Column()
  githubId!: string;

  @Index({ unique: true })
  @Column()
  name: string;

  @OneToMany(() => PaymentHistory, (history) => history.method)
  histories: PaymentHistory[];
}
