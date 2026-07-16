import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Personagem {

  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "titulo": string;

  @Column({ nullable: true })
  "resumo": string; // frase curta, sempre visível no card

  @Column('text')
  "conteudo": string;

  @Column({nullable: true})
  "imagem": string; //url ou path da imagem

  @Column({default: 0})
  "ordemApresentacao": number; //ordem de retorno na API
}