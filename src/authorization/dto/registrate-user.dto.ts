import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Strings } from '../../data/strings';
import { Fields } from '../../data/enums/strings.enum';

export class RegistrateUserDto {
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.USERNAME) })
  @IsString({ message: Strings.fieldMustBeString(Fields.USERNAME) })
  name: string;

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
