/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  async hashData(data: string): Promise<string> {
    const saltRounds = 12;
    const hashedData = await bcrypt.hash(
      data + this.configService.get<string>('PASSWORD_PEPPER'),
      saltRounds,
    );
    return hashedData;
  }

  async validateHashedData(
    newData: string,
    hashedData: string,
  ): Promise<boolean> {
    return bcrypt.compare(
      newData + this.configService.get<string>('PASSWORD_PEPPER'),
      hashedData,
    );
  }
}
