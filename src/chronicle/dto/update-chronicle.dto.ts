import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateChronicleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    return typeof value === 'string' ? [value] : value; // ✅ Force into array
  })
  images?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (!value) return [];
    return typeof value === 'string' ? [value] : value; // ✅ Force into array
  })
  videos?: string[] = [];
}
