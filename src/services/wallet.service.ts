import { AppDataSource } from '../utils/database.utils';
import { AppError } from '../utils/appError.utils';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/Wallet';
import { User } from '../entities/User';
import { Transaction } from '../entities/Transaction';
import { PaystackService } from '../utils/paystack.utils';

export interface TransferFundsDto {
  senderId: string,
  receiverId: string,
  amount: number
}
const paystackService = new PaystackService()

export class WalletService {
  walletRepository: Repository<Wallet>;
  userRepository: Repository<User>;
  transactionRepository: Repository<Transaction>;

  constructor() {
    this.walletRepository = AppDataSource.getRepository(Wallet);
    this.userRepository = AppDataSource.getRepository(User);
    this.transactionRepository = AppDataSource.getRepository(Transaction);
  }

  async fundAccount(userId: string, amount: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['wallet']
    });
    if (!user) {
      throw new AppError('Invalid user id', 401)
    }

    const userWallet = await this.walletRepository.findOne({
      where: { id: user.wallet?.id }
    })
    if (!userWallet) {
      throw new AppError('Something went wrong', 500)
    }
    let paystackAmount = (amount * 100).toString();
    const data = await paystackService.createPayment({
      email: user.email,
      amount: paystackAmount,
    })

    if (!data) {
      throw new AppError("Something went wrong", 500)
    }

    const transaction = this.transactionRepository.create({
      receiverWallet: userWallet,
      amount,
      type: "fund",
      reference: data.data.reference,
      completed: false,
    });
  
    await this.transactionRepository.save(transaction);

    return data;
  }

  async transferFunds (
    payload: TransferFundsDto
  ) {
    const sender = await this.userRepository.findOne({
      where: { id: payload.senderId },
      relations: ['wallet']
    });
    const receiver = await this.userRepository.findOne({
      where: { id: payload.receiverId },
      relations: ['wallet']
    });
    if (!sender || !receiver) {
        throw new AppError('Invalid sender or receiver', 400);
    }

    const senderWallet = await this.walletRepository.findOne({ 
      where: { id: sender.wallet?.id }
    });
    const receiverWallet = await this.walletRepository.findOne({ 
      where: {id: receiver.wallet?.id }
    });
    if (!senderWallet || !receiverWallet) {
        throw new AppError('Invalid sender Wallet or receiver wallet', 400);
    }
  
    const amount = payload.amount;
    if (senderWallet.balance < amount) {
      throw new AppError('Insufficient balance', 400);
    }
  
    senderWallet.balance -= amount;
    receiverWallet.balance += amount
  
    await this.walletRepository.save(senderWallet);
    await this.walletRepository.save(receiverWallet);
  
    const transaction = this.transactionRepository.create({
      senderWallet,
      receiverWallet,
      amount,
      completed: true,
      type: "transfer",
    });
  
    await this.transactionRepository.save(transaction);
    return transaction;
  };

}