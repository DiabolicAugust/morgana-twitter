import { forwardRef, Module } from '@nestjs/common';
import { LegendCommentService } from './legend-comment.service';
import { LegendCommentController } from './legend-comment.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [LegendCommentController],
  providers: [LegendCommentService],
})
export class LegendCommentModule {}
