import { Test, TestingModule } from '@nestjs/testing';
import { RequeteController } from './requete.controller';
import { RequeteService } from './requete.service';

describe('RequeteController', () => {
  let controller: RequeteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequeteController],
      providers: [RequeteService],
    }).compile();

    controller = module.get<RequeteController>(RequeteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
