import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { UpdateChronicleDto } from './dto/update-chronicle.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('chronicle')
export class ChronicleController {
  constructor(private readonly chronicleService: ChronicleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 3 },
      { name: 'videos', maxCount: 2 },
    ]),
  )
  create(
    @Body() createChronicleDto: CreateChronicleDto,
    @Request() req: Request,
    @UploadedFiles()
    files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
  ) {
    const userId: string = req['user'].id;
    return this.chronicleService.create(
      createChronicleDto,
      files.images || [],
      files.videos || [],
      userId,
    );
  }

  @Get()
  findAll() {
    return this.chronicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chronicleService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'newImages', maxCount: 3 },
      { name: 'newVideos', maxCount: 2 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateChronicleDto: UpdateChronicleDto,
    @Request() req: Request,
    @UploadedFiles()
    files: {
      newImages?: Express.Multer.File[];
      newVideos?: Express.Multer.File[];
    },
  ) {
    const userId: string = req['user'].id;

    return this.chronicleService.update(
      id,
      updateChronicleDto,
      files.newImages || [],
      files.newVideos || [],
      userId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: Request) {
    const userId: string = req['user'].id;

    return this.chronicleService.remove(id, userId);
  }
}
