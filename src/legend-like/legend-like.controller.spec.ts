import { Test, TestingModule } from '@nestjs/testing';
import { LegendLikeController } from './legend-like.controller';
import { LegendLikeService } from './legend-like.service';

describe('LegendLikeController', () => {
  let controller: LegendLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegendLikeController],
      providers: [LegendLikeService],
    }).compile();

    controller = module.get<LegendLikeController>(LegendLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
