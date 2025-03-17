import { forwardRef, Module } from '@nestjs/common';
import { LegendLikeService } from './legend-like.service';
import { LegendLikeController } from './legend-like.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [LegendLikeController],
  providers: [LegendLikeService],
})
export class LegendLikeModule {}
