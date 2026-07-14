import { Test, TestingModule } from '@nestjs/testing';
import { AnonymatService } from './anonymat.service';

describe('AnonymatService', () => {
  let service: AnonymatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnonymatService],
    }).compile();

    service = module.get<AnonymatService>(AnonymatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
