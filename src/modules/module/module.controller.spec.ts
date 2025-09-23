import { Test, TestingModule } from '@nestjs/testing';
import { CourseModuleController } from './module.controller';
import { CourseModuleService } from './module.service';

describe('CourseModuleController', () => {
  let controller: CourseModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseModuleController],
      providers: [CourseModuleService],
    }).compile();

    controller = module.get<CourseModuleController>(CourseModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
