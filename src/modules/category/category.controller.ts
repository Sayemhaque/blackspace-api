import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AiCreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: AiCreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll({
      title: true,
      description: true,
    });
  }
}
