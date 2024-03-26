import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokenDto } from './dto/get-token.dto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createToken(): GetTokenDto {
    const token = this.jwtService.sign({});
    return {
      success: true,
      token,
    };
  }
}
