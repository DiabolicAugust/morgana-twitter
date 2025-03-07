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
  UseInterceptors,
  UploadedFile,
  Request,
  Query,
} from '@nestjs/common';
import { LegendService } from './legend.service';
import { CreateLegendDto } from './dto/create-legend.dto';
import { UpdateLegendDto } from './dto/update-legend.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosRequestDto } from './dto/videos-request.dto';

@Controller('legend')
export class LegendController {
  constructor(private readonly legendService: LegendService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('video'))
  create(
    @Body() createLegendDto: CreateLegendDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: Request,
  ) {
    const userId = req['user'].id;
    return this.legendService.create(createLegendDto, userId, file);
  }

  @Get()
  // @UsePipes(ValidationPipe)
  findAll(@Query() videosRequestDto: VideosRequestDto) {
    return this.legendService.getWithPagination(videosRequestDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legendService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLegendDto: UpdateLegendDto) {
    return this.legendService.update(+id, updateLegendDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: Request) {
    const requestorId = req['user'].id;
    return this.legendService.remove(id, requestorId);
  }
}
