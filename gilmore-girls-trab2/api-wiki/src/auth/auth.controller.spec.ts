import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockUsersService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('deve chamar usersService.create com o dto e retornar o usuário criado', async () => {
      const dto = { email: 'teste@teste.com', password: '123456' };
      mockUsersService.create.mockResolvedValue({ id: 1, email: dto.email });

      const resultado = await controller.register(dto);

      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(resultado).toEqual({ id: 1, email: dto.email });
    });
  });

  describe('login', () => {
    it('deve chamar authService.login com email e senha e retornar o access_token', async () => {
      const dto = { email: 'teste@teste.com', password: '123456' };
      mockAuthService.login.mockResolvedValue({ access_token: 'token_falso' });

      const resultado = await controller.login(dto);

      expect(authService.login).toHaveBeenCalledWith(dto.email, dto.password);
      expect(resultado).toEqual({ access_token: 'token_falso' });
    });
  });
});
