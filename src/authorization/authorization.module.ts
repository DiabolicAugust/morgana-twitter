import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from './encryption/encryption.service';
import { AppModule } from '../app.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './token/token.service';
import { JwtStrategy } from './token/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => AppModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthorizationController],
  providers: [
    EncryptionService,
    TokenService,
    AuthorizationService,
    JwtStrategy,
  ],
})
export class AuthorizationModule {}
