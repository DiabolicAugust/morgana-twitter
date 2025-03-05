import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrateUserDto } from './dto/registrate-user.dto';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() registrateUserDto: RegistrateUserDto) {
    return this.authorizationService.registration(registrateUserDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authorizationService.login(loginUserDto);
  }
}
