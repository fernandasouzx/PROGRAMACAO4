import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PessoaService {
  
 constructor(
 @InjectRepository(Pessoa)
 private pessoaRepository: Repository<Pessoa>,
 ) {}
 

  create(createPessoaDto: CreatePessoaDto) {
    return this.pessoaRepository.save(createPessoaDto);
  }

  findAll() {
    return this.pessoaRepository.find();
  }

  findOne(id: number) {
    return this.pessoaRepository.findOne({ where: { id } });
  }

  update(id: number, updatePessoaDto: UpdatePessoaDto) {
    return this.pessoaRepository.update(id, updatePessoaDto);
  }

  remove(id: number) {
    return this.pessoaRepository.delete(id);
  }
}
