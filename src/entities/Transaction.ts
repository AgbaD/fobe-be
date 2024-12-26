import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
import { Wallet } from './Wallet';
  
@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.sentTransactions)
    senderWallet: Wallet;

    @ManyToOne(() => Wallet, (wallet) => wallet.receivedTransactions)
    receiverWallet: Wallet;
  
    @Column({ default: 0})
    amount: number;

    @Column()
    type: string;

    @Column({ nullable: true })
    reference?: string;

    @Column({ default: false })
    completed: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
}
  