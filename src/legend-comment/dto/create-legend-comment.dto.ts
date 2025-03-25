import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLegendCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
