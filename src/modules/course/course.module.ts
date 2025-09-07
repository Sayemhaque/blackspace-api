import { Logger, Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [CategoryModule],
  controllers: [CourseController],
  providers: [CourseService, Logger],
  exports: [CourseService],
})
export class CourseModule {}
