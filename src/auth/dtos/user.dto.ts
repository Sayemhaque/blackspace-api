import { IsNotEmpty, IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;
}
