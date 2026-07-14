import { Test, TestingModule } from '@nestjs/testing';
import { AnonymatController } from './anonymat.controller';
import { AnonymatService } from './anonymat.service';

describe('AnonymatController', () => {
  let controller: AnonymatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnonymatController],
      providers: [AnonymatService],
    }).compile();

    controller = module.get<AnonymatController>(AnonymatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
