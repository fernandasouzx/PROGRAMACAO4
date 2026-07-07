import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from '../pessoa/entities/pessoa.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]), 
    JwtModule.register({
      secret: 'MINHA_CHAVE_SECRETA_SUPER_SEGURA',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}