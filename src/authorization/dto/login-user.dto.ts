import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Fields } from '../../data/enums/strings.enum';
import { Strings } from '../../data/strings';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.PASSWORD) })
  @MinLength(7, { message: Strings.passwordLengthValidation })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: Strings.passwordContentValidation,
  })
  @IsString({ message: Strings.fieldMustBeString(Fields.PASSWORD) })
  password: string;
}
