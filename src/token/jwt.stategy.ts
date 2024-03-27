import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { BlackListService } from './blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly blackListService: BlackListService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const isInBlacklist = await this.blackListService.isInBlackList(token);

    if (isInBlacklist) {
      throw new UnauthorizedException('The token has expired');
    }

    await this.blackListService.addToBlackList(token);

    return {};
  }
}
