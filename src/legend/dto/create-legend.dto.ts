import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLegendDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
