export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface UsuarioRepository {
  buscarPorId(id: number): Usuario | null | Promise<Usuario | null>;
}

export function criarUsuarioService(repositorio: UsuarioRepository) {
  return {
    async buscarUsuario(id: number): Promise<Usuario | null> {
      return Promise.resolve(repositorio.buscarPorId(id));
    },
  };
}
