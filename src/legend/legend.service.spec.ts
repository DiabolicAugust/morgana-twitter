import { Test, TestingModule } from '@nestjs/testing';
import { LegendService } from './legend.service';

describe('LegendService', () => {
  let service: LegendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegendService],
    }).compile();

    service = module.get<LegendService>(LegendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
