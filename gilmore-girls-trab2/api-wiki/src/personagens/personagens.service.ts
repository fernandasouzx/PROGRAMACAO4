import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personagem } from './entities/personagem.entity';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdatePersonagemDto } from './dto/update-personagem.dto';

@Injectable()
export class PersonagensService {
  constructor(
    @InjectRepository(Personagem)
    private personagensRepository: Repository<Personagem>,
  ) {}

  create(createPersonagemDto: CreatePersonagemDto) {
    const personagem = this.personagensRepository.create(createPersonagemDto);
    return this.personagensRepository.save(personagem);
  }

  findAll() {
    return this.personagensRepository.find({ order: { ordemApresentacao: 'ASC' } });
  }

  async findOne(id: number) {
    const personagem = await this.personagensRepository.findOne({ where: { id } });
    if (!personagem) {
      throw new NotFoundException(`Personagem com id ${id} não encontrado`);
    }
    return personagem;
  }

  async update(id: number, updatePersonagemDto: UpdatePersonagemDto) {
    const personagem = await this.findOne(id); // já lança 404 se não existir
    Object.assign(personagem, updatePersonagemDto);
    return this.personagensRepository.save(personagem);
  }

  async remove(id: number) {
    const personagem = await this.findOne(id);
    return this.personagensRepository.remove(personagem);
  }
}