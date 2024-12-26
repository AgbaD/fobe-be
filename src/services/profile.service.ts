import { AppDataSource } from '../utils/database.utils';
import { User } from '../entities/User';
import { AppError } from '../utils/appError.utils';
import { Repository } from 'typeorm';


export class ProfileService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAllProfiles() {
    const users = await this.userRepository.find({
      relations: ['wallet'],
      order: { createdAt: 'DESC' },
    })
    return users;
  }

  async getProfile(profileId: string) {
    const profile = await this.userRepository.findOne({
        where: { id: profileId },
        relations: ['wallet'],
    })
    if (!profile) {
        throw new AppError('Invalid profile id', 400)
    }
    return profile;
  }
}