import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '../prisma.service';
import { Strings } from '../data/strings';
import { Entities } from '../data/enums/strings.enum';
import { S3Service } from '../services/s3.service';
import { isEqual, omitBy, isUndefined } from 'lodash';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  // findAll() {
  //   return `This action returns all profile`;
  // }

  findOne(id: string) {
    return this.prisma.profile.findUnique({ where: { id: id } });
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
    avatarFile: Express.Multer.File,
    bannerFile: Express.Multer.File,
  ) {
    const profile = await this.prisma.profile.findUnique({ where: { id } });

    if (!profile) {
      throw new HttpException(
        Strings.entityWasNotFoundById(Entities.PROFILE, id),
        HttpStatus.NOT_FOUND,
      );
    }

    const avatarUrl = avatarFile
      ? await this.s3Service.uploadFile(avatarFile)
      : profile.avatar;
    const bannerUrl = bannerFile
      ? await this.s3Service.uploadFile(bannerFile)
      : profile.banner;

    const updatedData = {
      ...updateProfileDto,
      avatar: avatarUrl,
      banner: bannerUrl,
    };

    const cleanedUpdatedData = omitBy(
      updatedData,
      (value) => value === undefined,
    );

    if (
      isEqual(
        cleanedUpdatedData,
        omitBy(profile, (value) => value === undefined),
      )
    ) {
      throw new HttpException('No changes were made', HttpStatus.NOT_MODIFIED);
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { id },
      data: cleanedUpdatedData,
    });

    return updatedProfile;
  }
}
