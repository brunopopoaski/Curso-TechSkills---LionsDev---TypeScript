import { criarUsuarioService, Usuario } from '../usuarioService';

describe('usuarioService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the repository and return the user', async () => {
    const usuarioMock: Usuario = {
      id: 1,
      nome: 'Maria',
      email: 'maria@exemplo.com',
    };
    const repositorio = {
      buscarPorId: jest.fn().mockResolvedValue(usuarioMock),
    };
    const service = criarUsuarioService(repositorio);

    const resultado = await service.buscarUsuario(1);

    expect(repositorio.buscarPorId).toHaveBeenCalled();
    expect(repositorio.buscarPorId).toHaveBeenCalledWith(1);
    expect(repositorio.buscarPorId).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(usuarioMock);
  });

  it('should return null when the repository does not find a user', async () => {
    const repositorio = {
      buscarPorId: jest.fn().mockResolvedValue(null),
    };
    const service = criarUsuarioService(repositorio);

    await expect(service.buscarUsuario(99)).resolves.toBeNull();
    expect(repositorio.buscarPorId).toHaveBeenCalledWith(99);
  });
});
