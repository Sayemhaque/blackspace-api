import { IsNotEmpty } from 'class-validator';

export class AiCreateCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
