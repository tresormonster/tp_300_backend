import { Test, TestingModule } from '@nestjs/testing';
import { EnseignementService } from './enseignement.service';

describe('EnseignementService', () => {
  let service: EnseignementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnseignementService],
    }).compile();

    service = module.get<EnseignementService>(EnseignementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
