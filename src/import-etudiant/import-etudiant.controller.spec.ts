import { Test, TestingModule } from '@nestjs/testing';
import { ImportEtudiantController } from './import-etudiant.controller';
import { ImportEtudiantService } from './import-etudiant.service';

describe('ImportEtudiantController', () => {
  let controller: ImportEtudiantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportEtudiantController],
      providers: [ImportEtudiantService],
    }).compile();

    controller = module.get<ImportEtudiantController>(ImportEtudiantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
