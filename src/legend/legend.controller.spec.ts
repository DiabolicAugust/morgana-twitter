import { Test, TestingModule } from '@nestjs/testing';
import { LegendController } from './legend.controller';
import { LegendService } from './legend.service';

describe('LegendController', () => {
  let controller: LegendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegendController],
      providers: [LegendService],
    }).compile();

    controller = module.get<LegendController>(LegendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
