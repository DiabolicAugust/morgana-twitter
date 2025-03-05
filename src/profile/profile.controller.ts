import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get()
  // findAll() {
  //   return this.profileService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const avatarFile = files?.find((file) => file.fieldname === 'avatar');
    const bannerFile = files?.find((file) => file.fieldname === 'banner');

    return this.profileService.update(
      id,
      updateProfileDto,
      avatarFile,
      bannerFile,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.profileService.remove(+id);
  // }
}
