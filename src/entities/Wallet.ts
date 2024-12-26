import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { User } from './User';
import { Transaction } from './Transaction';
  
  @Entity()
  export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @OneToOne(() => User, (user) => user.wallet, { eager: true })
    user: User;
  
    @Column({ default: 0})
    balance: number;

    @OneToMany(() => Transaction, (transaction) => transaction.senderWallet)
    sentTransactions: Transaction[];
  
    @OneToMany(() => Transaction, (transaction) => transaction.receiverWallet)
    receivedTransactions: Transaction[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
  