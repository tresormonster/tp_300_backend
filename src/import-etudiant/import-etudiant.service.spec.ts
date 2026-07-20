import { Test, TestingModule } from '@nestjs/testing';
import { ImportEtudiantService } from './import-etudiant.service';

describe('ImportEtudiantService', () => {
  let service: ImportEtudiantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportEtudiantService],
    }).compile();

    service = module.get<ImportEtudiantService>(ImportEtudiantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
