import { forwardRef, Module } from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { ChronicleController } from './chronicle.controller';
import { AppModule } from '../app.module';
import { S3Service } from '../services/s3.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [ChronicleController],
  providers: [ChronicleService, S3Service],
})
export class ChronicleModule {}
