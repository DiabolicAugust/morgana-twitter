import { forwardRef, Module } from '@nestjs/common';
import { LegendService } from './legend.service';
import { LegendController } from './legend.controller';
import { AppModule } from '../app.module';
import { S3Service } from '../services/s3.service';
import { JwtStrategy } from '../authorization/token/jwt.strategy';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [LegendController],
  providers: [LegendService, S3Service, JwtStrategy],
})
export class LegendModule {}
