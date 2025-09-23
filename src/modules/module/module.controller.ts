import { Controller, Logger, Param, Post } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { aiModulesCreateAgent } from './ai-agents/ai-course-module-agent';
import { CourseModuleService } from './module.service';

@Controller('modules')
export class CourseModuleController {
  private readonly logger = new Logger(CourseModuleController.name);

  constructor(
    private readonly courseModuleService: CourseModuleService,
    private courseService: CourseService,
  ) {}

  @Post(':courseId')
  async getModulesByCourseId(@Param('courseId') courseId: number) {
    const course = await this.courseService.findById(courseId, {
      title: true,
      description: true,
    });

    const modulesFromAi = await aiModulesCreateAgent(course);
    this.logger.log('AI modules generated:', modulesFromAi);

    const modules = await this.courseModuleService.createMany(modulesFromAi);

    return modules;
  }
}
