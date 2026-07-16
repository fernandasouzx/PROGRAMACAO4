import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PersonagensService } from './personagens.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('personagens')
export class PersonagensController {
  constructor(private readonly personagensService: PersonagensService) {}

  @UseGuards(JwtAuthGuard) // Adiciona o guard de autenticação JWT para proteger a rota de criação de personagens
  @Post()
  create(@Body() createPersonagemDto: CreatePersonagemDto) {
    return this.personagensService.create(createPersonagemDto);
  }

  @Get()
  findAll() {
    return this.personagensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personagensService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard) // Adiciona o guard de autenticação JWT para proteger a rota de atualização de personagens
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonagemDto: UpdatePersonagemDto) {
    return this.personagensService.update(+id, updatePersonagemDto);
  }

  @UseGuards(JwtAuthGuard) // Adiciona o guard de autenticação JWT para proteger a rota de remoção de personagens
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personagensService.remove(+id);
  }
}