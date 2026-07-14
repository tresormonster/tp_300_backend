import { Test, TestingModule } from '@nestjs/testing';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';

describe('EnseignantController', () => {
  let controller: EnseignantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignantController],
      providers: [EnseignantService],
    }).compile();

    controller = module.get<EnseignantController>(EnseignantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
