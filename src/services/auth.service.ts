import { AppDataSource } from '../utils/database.utils';
import { User } from '../entities/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError.utils';
import { Repository } from 'typeorm';
import config from '../config';
import { Wallet } from '../entities/Wallet';

export interface RegisterUserDto {
  email: string, 
  password: string, 
  firstname: string, 
  lastname: string,
}

export interface LoginUserDto {
  email: string, 
  password: string,
}

export class AuthService {
  userRepository: Repository<User>;
  walletRepository: Repository<Wallet>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.walletRepository = AppDataSource.getRepository(Wallet);
  }

  async registerUser (payload: RegisterUserDto) {
    const { email, password, firstname, lastname } = payload;
    const existingUser = await this.userRepository.findOne({ 
      where: { email: email }
    });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const wallet = this.walletRepository.create({
      balance: 0
    })
    await this.walletRepository.save(wallet);
  
    const newUser = this.userRepository.create({ 
      email, password: hashedPassword, 
      firstname, lastname,
      wallet,
    });
    await this.userRepository.save(newUser);
  
    delete newUser.password;
    return newUser;
  };

  async loginUser(payload: LoginUserDto) {
    const { email, password } = payload;
    const user =  await this.userRepository.findOne({ 
      where: {email: email }
    });
    if (!user) {
      throw new AppError('Invalid credentials', 404);
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }
  
    const token = jwt.sign({ id: user.id }, config.jwt.secretKey!, {
      expiresIn: '1h',
    });
  
    delete user.password;
    return {token, user};
  };
}
