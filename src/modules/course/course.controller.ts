import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { aiCategoryCreateAgent } from '../category/ai-agents/ai-category-agent';
import { CategoryService } from '../category/category.service';
import { AiCreateCategoryDto } from '../category/dto/create-category.dto';
import { aiCourseCreateAgent } from './ai-agents/ai-course-agent';
import { CourseService } from './course.service';
import { AiCourseCreateDto } from './dtos/ai-course-create.dto';

@Controller('courses')
export class CourseController {
  private readonly logger = new Logger(CourseController.name);

  constructor(
    private readonly courseService: CourseService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async aiCreateCourse(@Body() body: { prompt: string }) {
    try {
      const { prompt } = body;
      this.logger.log(`Starting AI course creation for: ${prompt}`);

      const category = await this.createCategoryFromPrompt(prompt);

      const course = await this.createCourseFromPrompt(prompt, category.id);

      this.logger.log('Course and category created successfully');
      return course;
    } catch (error) {
      this.logger.error('Error in aiCreateCourse:', error.message, error.stack);
      throw new Error(`Course creation failed: ${error.message}`);
    }
  }

  async createCategoryFromPrompt(prompt: string) {
    const categoryData = await aiCategoryCreateAgent(prompt);
    this.logger.log('AI category generated:', categoryData);

    const categoryDto: AiCreateCategoryDto = {
      title: categoryData.title,
      description: categoryData.description,
    };

    return this.categoryService.create(categoryDto);
  }

  async createCourseFromPrompt(prompt: string, categoryId: number) {
    const enhancedPrompt = `Create a course about: ${prompt}. Use categoryId: ${categoryId}`;
    const courseData = await aiCourseCreateAgent(enhancedPrompt);
    this.logger.log('AI course generated:', courseData);

    const courseDto: AiCourseCreateDto = {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      categoryId: categoryId,
      image: courseData.image,
      discount: courseData.discount,
    };

    return this.courseService.create(courseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll({
      title: true,
      description: true,
      price: true,
      discount: true,
      categoryId: true,
      image: true,
    });
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: number) {
    return this.courseService.findById(courseId, {
      title: true,
      description: true,
      price: true,
      discount: true,
    });
  }
}
