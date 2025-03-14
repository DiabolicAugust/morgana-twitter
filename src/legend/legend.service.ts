import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLegendDto } from './dto/create-legend.dto';
import { UpdateLegendDto } from './dto/update-legend.dto';
import { S3Service } from '../services/s3.service';
import { PrismaService } from '../prisma.service';
import { Strings } from '../data/strings';
import { Entities, Fields } from '../data/enums/strings.enum';
import { VideosRequestDto } from './dto/videos-request.dto';
import { Legend } from '@prisma/client';
import { HelperService } from '../services/helper.service';

@Injectable()
export class LegendService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createLegendDto: CreateLegendDto,
    userId: string,
    video: Express.Multer.File,
  ) {
    if (!video)
      throw new HttpException(
        Strings.fieldCantBeEmpty(Fields.VIDEO),
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.USER, Fields.ID, userId),
      );

    const videoUrl = await this.s3Service.uploadFile(video);

    const legend = await this.prisma.legend.create({
      data: {
        title: createLegendDto.title,
        description: createLegendDto.description,
        userId: user.id,
        videoUrl: videoUrl,
        profileId: user.profile.id,
      },
    });

    return legend;
  }

  async getWithPagination(videosRequestDto: VideosRequestDto) {
    const legends: Legend[] = await this.prisma.legend.findMany({
      skip: (videosRequestDto.page - 1) * videosRequestDto.amount,
      take: videosRequestDto.amount,
      orderBy: { createdAt: 'desc' },
      include: { profile: true },
    });

    return {
      legends: legends,
      page: videosRequestDto.page,
      amount: videosRequestDto.amount,
    };
  }

  findOne(id: string) {
    return this.prisma.legend.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateLegendDto: UpdateLegendDto) {
    return `This action updates a #${id} legend`;
  }

  async remove(id: string, requestorId: string) {
    const legend = await this.prisma.legend.findUnique({
      where: {
        id,
      },
    });

    if (!legend)
      throw new UnauthorizedException(
        Strings.noEntityWithField(Entities.LEGEND, Fields.ID, id),
      );

    this.helperService.checkPermissions(legend.userId, requestorId);

    await this.prisma.legend.delete({
      where: { id: legend.id },
    });

    await this.s3Service.deleteFile(legend.videoUrl);

    //Todo: Add video removement from aws s3

    return { message: Strings.entityDeleted(Entities.LEGEND) };
  }
}
