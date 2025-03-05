import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payloadData: PayloadDto) {
    return {
      token: this.jwtService.sign(payloadData),
    };
  }
}
