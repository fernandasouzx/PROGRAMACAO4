import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonagensService } from './personagens.service';
import { Personagem } from './entities/personagem.entity';
import { NotFoundException } from '@nestjs/common';

// repositório  precisa ter os mesmos métodos que o service usa
const mockRepo = () => ({
  find: jest.fn(),
  findOne: jest.fn(),   // o service usa findOne (não findOneBy)
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
});

describe('PersonagensService', () => {
  let service: PersonagensService;
  let repo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonagensService,
        { provide: getRepositoryToken(Personagem), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<PersonagensService>(PersonagensService);
    repo = module.get(getRepositoryToken(Personagem));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar a lista de personagens', async () => {
      const fake = [{ id: 1, titulo: 'Rory', ordem: 1 }];
      repo.find.mockResolvedValue(fake);

      const result = await service.findAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual(fake);
    });
  });

  describe('findOne', () => {
    it('deve retornar um personagem existente', async () => {
      const fake = { id: 1, titulo: 'Rory' };
      repo.findOne.mockResolvedValue(fake);

      const result = await service.findOne(1);

      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(fake);
    });

    it('deve lançar NotFoundException se não existir', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('deve criar e salvar um personagem', async () => {
      const dto = { titulo: 'Lorelai', descricao: '...', imagem: 'img.jpg', ordem: 2 };
      repo.create.mockReturnValue(dto);
      repo.save.mockResolvedValue({ id: 2, ...dto });

      const result = await service.create(dto as any);

      expect(repo.save).toHaveBeenCalled();
      expect(result.id).toBe(2);
    });
  });

  describe('update', () => {
    it('deve atualizar um personagem existente', async () => {
      const existing = { id: 1, titulo: 'Rory' };
      repo.findOne.mockResolvedValue(existing);
      repo.save.mockResolvedValue({ ...existing, titulo: 'Rory Gilmore' });

      const result = await service.update(1, { titulo: 'Rory Gilmore' } as any);

      expect(result.titulo).toBe('Rory Gilmore');
    });
  });

  describe('remove', () => {
    it('deve remover um personagem', async () => {
      const existing = { id: 1, titulo: 'Rory' };
      repo.findOne.mockResolvedValue(existing);
      repo.remove.mockResolvedValue(existing);
      repo.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(repo.findOne).toHaveBeenCalled();
    });
  });
});