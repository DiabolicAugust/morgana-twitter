import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { UpdateChronicleDto } from './dto/update-chronicle.dto';
import { PrismaService } from '../prisma.service';
import { S3Service } from '../services/s3.service';
import { Chronicle } from '@prisma/client';
import { Strings } from '../data/strings';
import { Entities } from '../data/enums/strings.enum';
import { HelperService } from '../services/helper.service';

@Injectable()
export class ChronicleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
    private readonly helperService: HelperService,
  ) {}

  async create(
    createChronicleDto: CreateChronicleDto,
    images: Express.Multer.File[],
    videos: Express.Multer.File[],
    userId: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('User does not exist');
    }

    const imageUrls: string[] = await Promise.all(
      images.map(async (value: Express.Multer.File) => {
        const image: string = await this.s3Service.uploadFile(value);
        return image;
      }),
    );

    const videoUrls: string[] = await Promise.all(
      videos.map(async (value: Express.Multer.File) => {
        return this.s3Service.uploadFile(value);
      }),
    );

    const chronicle: Chronicle = await this.prisma.chronicle.create({
      data: {
        ...createChronicleDto,
        videos: videoUrls,
        images: imageUrls,
        userId: userId,
      },
    });

    return chronicle;
  }

  findAll() {
    return `This action returns all chronicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chronicle`;
  }

  async update(
    id: string,
    updateChronicleDto: UpdateChronicleDto,
    images: Express.Multer.File[],
    videos: Express.Multer.File[],
    requestorId: string,
  ) {
    if (
      images.length + updateChronicleDto.images.length > 3 ||
      videos.length + updateChronicleDto.videos.length > 2
    )
      throw new HttpException(Strings.tooManyMedia, HttpStatus.BAD_REQUEST);

    const chronicle = await this.prisma.chronicle.findUnique({
      where: {
        id,
      },
    });

    if (!chronicle)
      throw new HttpException(
        Strings.entityWasNotFoundById(Entities.CHRONICLE, id),
        HttpStatus.NOT_FOUND,
      );

    this.helperService.checkPermissions(chronicle.userId, requestorId);

    const deletedImages = chronicle.images.filter(
      (value) => !updateChronicleDto.images?.includes(value),
    );

    const deletedVideos = chronicle.videos.filter(
      (value) => !updateChronicleDto.videos?.includes(value),
    );
    console.log(deletedImages);
    console.log(deletedVideos);
    await Promise.all([
      ...deletedImages.map((value) => this.s3Service.deleteFile(value)),
      ...deletedVideos.map((value) => this.s3Service.deleteFile(value)),
    ]);

    const imageUrls: string[] = await Promise.all(
      images.map(async (value: Express.Multer.File) => {
        const image: string = await this.s3Service.uploadFile(value);
        return image;
      }),
    );

    const videoUrls: string[] = await Promise.all(
      videos.map(async (value: Express.Multer.File) => {
        return this.s3Service.uploadFile(value);
      }),
    );

    const updatedChronicle: Chronicle = await this.prisma.chronicle.update({
      where: { id },
      data: {
        images: [...imageUrls, ...updateChronicleDto.images],
        videos: [...videoUrls, ...updateChronicleDto.videos],
        text: updateChronicleDto.text,
      },
    });

    return updatedChronicle;
  }

  async remove(id: string, requestorId: string) {
    const chronicle = await this.prisma.chronicle.findUnique({
      where: {
        id,
      },
    });

    if (!chronicle)
      throw new HttpException(
        Strings.entityWasNotFoundById(Entities.CHRONICLE, id),
        HttpStatus.NOT_FOUND,
      );

    this.helperService.checkPermissions(chronicle.userId, requestorId);

    await Promise.all([
      ...chronicle.images.map((value) => this.s3Service.deleteFile(value)),
      ...chronicle.videos.map((value) => this.s3Service.deleteFile(value)),
    ]);

    return this.prisma.chronicle.delete({ where: { id } });
  }
}
