import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  banner?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  avatar?: string;
}
