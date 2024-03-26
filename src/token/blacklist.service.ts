import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlackListService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private readonly blacklistRepository: Repository<BlacklistedToken>,
  ) {}

  async addToBlackList(token: string) {
    await this.blacklistRepository.insert({ token });
  }

  async isInBlackList(token: string) {
    const isBlackListed = (await this.blacklistRepository.findOneBy({ token }))
      ? true
      : false;

    return isBlackListed;
  }

  async removeExpiredTokens() {
    await this.blacklistRepository
      .createQueryBuilder()
      .delete()
      .where("created_at < now() - interval '40 minutes'")
      .execute();
  }
}
