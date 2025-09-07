import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AiCourseCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  discount: number;
}
