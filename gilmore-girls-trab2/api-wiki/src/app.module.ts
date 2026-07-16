import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonagensModule } from './personagens/personagens.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CuriosidadesModule } from './curiosidades/curiosidades.module';

//O decorador @Module é usado para definir um módulo no NestJS. 
// Ele recebe um objeto de configuração que define os componentes 
// do módulo, como controladores, provedores e outros módulos importados. 
// No caso do AppModule, ele importa o TypeOrmModule para configurar a conexão 
// com o banco de dados MySQL e também importa o PersonagensModule, além de 
// definir o AppController e o AppService como controladores e provedores do módulo, 
// respectivamente.

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //define o tipo de banco de dados que será utilizado, porta, senhas, host, nome do banco de dados e outras configurações necessárias para estabelecer a conexão com o banco de dados MySQL.
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'fernanda',
      password: 'Senha@123456',
      database: 'gilmore_girls',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PersonagensModule,
    UsersModule,
    AuthModule, // Adiciona o AuthModule ao módulo(entity)
    CuriosidadesModule, // Adiciona o CuriosidadesModule ao módulo(entity)
  ],
  controllers: [AppController], // Adiciona o AppController ao módulo(entity)
  providers: [AppService],    //adiciona o AppService ao módulo(entity)
})
export class AppModule {}