import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { RegistrateUserDto } from './dto/create-user.dto';
import { EncryptionService } from './encryption/encryption.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Strings } from '../data/strings';
import { Entities } from '../data/enums/strings.enum';
import { TokenService } from './token/token.service';
import { PayloadDto } from './dto/payload.dto';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(registrateUserDto: RegistrateUserDto): Promise<User> {
    const hashedPassword = await this.encryptionService.hashData(
      registrateUserDto.password,
    );

    const user = await this.prisma.user.create({
      data: {
        username: registrateUserDto.name,
        password: hashedPassword,
        email: registrateUserDto.email,
        isVerifiedEmail: {
          create: {},
        },
      },
      include: {
        isVerifiedEmail: true,
      },
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!user) throw new UnauthorizedException(Strings.noUserFound);

    const passwordVerification =
      await this.encryptionService.validateHashedData(
        loginUserDto.password,
        user.password,
      );

    if (passwordVerification) {
      throw new UnauthorizedException(Strings.wrongPassword);
    }

    const payload: PayloadDto = {
      id: user.id,
      email: user.email,
    };
    const token = await this.tokenService.generateToken(payload);

    return token;
  }
}
