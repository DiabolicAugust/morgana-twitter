import { Test, TestingModule } from '@nestjs/testing';
import { ChronicleLikeService } from './chronicle-like.service';

describe('ChronicleLikeService', () => {
  let service: ChronicleLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChronicleLikeService],
    }).compile();

    service = module.get<ChronicleLikeService>(ChronicleLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
