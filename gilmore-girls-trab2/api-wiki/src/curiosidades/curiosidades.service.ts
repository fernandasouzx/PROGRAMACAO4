import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curiosidade } from './entities/curiosidade.entity';
import { CreateCuriosidadeDto } from './dto/create-curiosidade.dto';

@Injectable()
export class CuriosidadesService {
  constructor(
    @InjectRepository(Curiosidade)
    private curiosidadesRepository: Repository<Curiosidade>,
  ) {}

  create(createCuriosidadeDto: CreateCuriosidadeDto) {
    const curiosidade = this.curiosidadesRepository.create(createCuriosidadeDto);
    return this.curiosidadesRepository.save(curiosidade);
  }

  findAll() {
    return this.curiosidadesRepository.find();
  }

  async remove(id: number) {
    const curiosidade = await this.curiosidadesRepository.findOne({ where: { id } });
    if (!curiosidade) {
      throw new NotFoundException(`Curiosidade com id ${id} não encontrada`);
    }
    return this.curiosidadesRepository.remove(curiosidade);
  }

  async update(id: number, updateCuriosidadeDto: CreateCuriosidadeDto) {
    const curiosidade = await this.curiosidadesRepository.findOne({ where: { id } });
    if (!curiosidade) {
      throw new NotFoundException(`Curiosidade com id ${id} não encontrada`);
    }
    Object.assign(curiosidade, updateCuriosidadeDto);
    return this.curiosidadesRepository.save(curiosidade);
  }
}
