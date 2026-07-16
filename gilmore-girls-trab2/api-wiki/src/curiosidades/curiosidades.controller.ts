import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CuriosidadesService } from './curiosidades.service';
import { CreateCuriosidadeDto } from './dto/create-curiosidade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('curiosidades')
export class CuriosidadesController {
  constructor(private readonly curiosidadesService: CuriosidadesService) {}

  @Get()
  findAll() {
    return this.curiosidadesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCuriosidadeDto: CreateCuriosidadeDto) {
    return this.curiosidadesService.create(createCuriosidadeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curiosidadesService.remove(+id);
  }
}
