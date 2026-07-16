import { Test, TestingModule } from '@nestjs/testing';
import { PersonagensController } from './personagens.controller';
import { PersonagensService } from './personagens.service';

describe('PersonagensController', () => {
  let controller: PersonagensController;
  let service: PersonagensService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonagensController],
      providers: [{ provide: PersonagensService, useValue: mockService }],
    }).compile();

    controller = module.get<PersonagensController>(PersonagensController);
    service = module.get<PersonagensService>(PersonagensService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar service.create ao criar um personagem', async () => {
    const dto = { titulo: 'Teste', conteudo: 'Teste', ordemApresentacao: 1 };
    mockService.create.mockResolvedValue({ id: 1, ...dto });

    const resultado = await controller.create(dto as any);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(resultado).toEqual({ id: 1, ...dto });
  });

  it('deve chamar service.findAll ao listar personagens', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1, titulo: 'Teste' }]);

    const resultado = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(resultado).toEqual([{ id: 1, titulo: 'Teste' }]);
  });

  it('deve chamar service.findOne convertendo o id para número', async () => {
    mockService.findOne.mockResolvedValue({ id: 1, titulo: 'Teste' });

    const resultado = await controller.findOne('1');

    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(resultado).toEqual({ id: 1, titulo: 'Teste' });
  });

  it('deve chamar service.update com o id e os dados corretos', async () => {
    const dto = { titulo: 'Atualizado' };
    mockService.update.mockResolvedValue({ id: 1, ...dto });

    const resultado = await controller.update('1', dto as any);

    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(resultado).toEqual({ id: 1, ...dto });
  });

  it('deve chamar service.remove com o id correto', async () => {
    mockService.remove.mockResolvedValue({ id: 1 });

    const resultado = await controller.remove('1');

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(resultado).toEqual({ id: 1 });
  });
});
