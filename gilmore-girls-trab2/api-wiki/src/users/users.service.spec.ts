import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criptografar a senha e não retornar o hash na resposta', async () => {
      const dto = { email: 'teste@teste.com', password: '123456' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hash_falso');
      mockRepository.create.mockReturnValue({ ...dto, password: 'hash_falso' });
      mockRepository.save.mockResolvedValue({ id: 1, email: dto.email, password: 'hash_falso' });

      const resultado = await service.create(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(resultado).toEqual({ id: 1, email: dto.email });
      expect(resultado).not.toHaveProperty('password');
    });
  });

  describe('findByEmail', () => {
    it('deve retornar o usuário pelo email', async () => {
      const user = { id: 1, email: 'teste@teste.com', password: 'hash' };
      mockRepository.findOne.mockResolvedValue(user);

      const resultado = await service.findByEmail('teste@teste.com');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email: 'teste@teste.com' } });
      expect(resultado).toEqual(user);
    });
  });
});
