import { Test, TestingModule } from '@nestjs/testing';
import { ChronicleLikeController } from './chronicle-like.controller';
import { ChronicleLikeService } from './chronicle-like.service';

describe('ChronicleLikeController', () => {
  let controller: ChronicleLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChronicleLikeController],
      providers: [ChronicleLikeService],
    }).compile();

    controller = module.get<ChronicleLikeController>(ChronicleLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
