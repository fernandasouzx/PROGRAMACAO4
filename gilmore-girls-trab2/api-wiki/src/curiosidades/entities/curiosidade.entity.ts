import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Curiosidade {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column('text')
  "texto": string;
}
