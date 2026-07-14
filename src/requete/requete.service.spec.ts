import { Test, TestingModule } from '@nestjs/testing';
import { RequeteService } from './requete.service';

describe('RequeteService', () => {
  let service: RequeteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequeteService],
    }).compile();

    service = module.get<RequeteService>(RequeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
