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
import { LegendModule } from './legend/legend.module';
import { ChronicleModule } from './chronicle/chronicle.module';
import { HelperService } from './services/helper.service';
import { LegendLikeModule } from './legend-like/legend-like.module';
import { LegendCommentModule } from './legend-comment/legend-comment.module';
import { ChronicleLikeModule } from './chronicle-like/chronicle-like.module';

@Module({
  imports: [
    UserModule,
    AuthorizationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProfileModule,
    LegendModule,
    ChronicleModule,
    LegendLikeModule,
    LegendCommentModule,
    ChronicleLikeModule,
  ],
  controllers: [AppController],
  providers: [EncryptionService, AppService, PrismaService, HelperService],
  exports: [EncryptionService, PrismaService, HelperService],
})
export class AppModule {}
