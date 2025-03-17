import { Test, TestingModule } from '@nestjs/testing';
import { LegendLikeService } from './legend-like.service';

describe('LegendLikeService', () => {
  let service: LegendLikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegendLikeService],
    }).compile();

    service = module.get<LegendLikeService>(LegendLikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
