import { Logger, Module } from '@nestjs/common';
import { CourseModule } from '../course/course.module';
import { CourseModuleController } from './module.controller';
import { CourseModuleService } from './module.service';

@Module({
  imports: [CourseModule],
  controllers: [CourseModuleController],
  providers: [CourseModuleService, Logger],
  exports: [CourseModuleService],
})
export class CourseModules {}
