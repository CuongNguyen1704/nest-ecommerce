import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategotyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
