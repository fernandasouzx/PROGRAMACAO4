import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from '../pessoa/entities/pessoa.entity';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  @Post('login')
  async login(@Body() body: any) {
    const usuario = await this.pessoaRepository.findOne({ where: { email: body.email } });
    
    if (!usuario) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const senhaValida = await bcrypt.compare(body.senha, usuario.senha);
    
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    return this.authService.login(usuario);
  }
}