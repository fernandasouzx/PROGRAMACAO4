import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // 👈 Nova importação obrigatória

@Injectable()
export class PessoaService {
  
 constructor(
   @InjectRepository(Pessoa)
   private pessoaRepository: Repository<Pessoa>,
 ) {}
 
  async create(createPessoaDto: CreatePessoaDto) {
   
    const salt = await bcrypt.genSalt();
    
    const senhaCriptografada = await bcrypt.hash(createPessoaDto.senha, salt);
    
    const novaPessoa = this.pessoaRepository.create({
      ...createPessoaDto,
      senha: senhaCriptografada,
    });


    return this.pessoaRepository.save(novaPessoa);
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