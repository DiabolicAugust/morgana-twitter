import { forwardRef, Module } from '@nestjs/common';
import { ChronicleLikeService } from './chronicle-like.service';
import { ChronicleLikeController } from './chronicle-like.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [ChronicleLikeController],
  providers: [ChronicleLikeService],
})
export class ChronicleLikeModule {}
