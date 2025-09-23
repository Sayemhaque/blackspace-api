import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AiModuleCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  sequence: number;
}
