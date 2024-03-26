import { Controller, Get } from '@nestjs/common';
import { TokenService } from './token.service';
import { ApiTags } from '@nestjs/swagger';
import { BlackListService } from './blacklist.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly blackListService: BlackListService,
  ) {}

  @Get()
  getToken() {
    return this.tokenService.createToken();
  }

  @Cron(CronExpression.EVERY_HOUR)
  removeExpireTokens() {
    this.blackListService.removeExpiredTokens();
  }
}
