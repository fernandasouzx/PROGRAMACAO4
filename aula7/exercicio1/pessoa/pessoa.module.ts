import { Module } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService],
})
export class PessoaModule {}
