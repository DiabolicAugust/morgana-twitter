import { TokenService } from './authorization/token/token.service';
import { EncryptionService } from './authorization/encryption/encryption.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    UserModule,
    AuthorizationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [EncryptionService, AppService, PrismaService],
  exports: [EncryptionService, PrismaService],
})
export class AppModule {}
