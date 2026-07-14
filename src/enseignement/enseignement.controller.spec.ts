import { Test, TestingModule } from '@nestjs/testing';
import { EnseignementController } from './enseignement.controller';
import { EnseignementService } from './enseignement.service';

describe('EnseignementController', () => {
  let controller: EnseignementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnseignementController],
      providers: [EnseignementService],
    }).compile();

    controller = module.get<EnseignementController>(EnseignementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
