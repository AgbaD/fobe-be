import { AppDataSource } from '../utils/database.utils';
import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';
import { Repository } from 'typeorm';
import { AppError } from '../utils/appError.utils';
import { Wallet } from '../entities/Wallet';

export class TransactionService {
  transactionRepository: Repository<Transaction>
  userRepository: Repository<User>
  walletRepository: Repository<Wallet>

  constructor() {
    this.transactionRepository = AppDataSource.getRepository(Transaction);
    this.userRepository = AppDataSource.getRepository(User);
    this.walletRepository = AppDataSource.getRepository(Wallet);
  }

  async getTransactionHistory (userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wallet']
    });
    if (!user) {
      throw new AppError('Invalid user id', 400);
    }

    const wallet = await this.walletRepository.findOne({ 
      where: { id: user.wallet?.id }
    });
    if (!wallet) {
      throw new AppError('Something went wring', 500);
    }
  
    const transactions = await this.transactionRepository.find({
      where: [{ senderWallet: { id: wallet.id } }, { receiverWallet: { id: wallet.id } }],
      order: { createdAt: 'DESC' },
      relations: ['senderWallet', 'receiverWallet']
    });
  
    return transactions;
  };

}
