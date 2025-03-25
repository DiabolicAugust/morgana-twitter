import { Test, TestingModule } from '@nestjs/testing';
import { LegendCommentController } from './legend-comment.controller';
import { LegendCommentService } from './legend-comment.service';

describe('LegendCommentController', () => {
  let controller: LegendCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegendCommentController],
      providers: [LegendCommentService],
    }).compile();

    controller = module.get<LegendCommentController>(LegendCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
