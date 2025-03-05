import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AppModule } from '../app.module';
import { S3Service } from '../services/s3.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [ProfileController],
  providers: [ProfileService, S3Service],
})
export class ProfileModule {}
