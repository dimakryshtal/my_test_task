import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.stategy';
import { BlackListService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlacklistedToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtStrategy, BlackListService],
})
export class TokenModule {}
