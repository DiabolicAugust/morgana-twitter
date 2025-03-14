import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChronicleDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
