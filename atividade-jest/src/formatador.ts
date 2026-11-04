export function formatarNome(nome: string): string {
  const nomeSemEspacos = nome.trim();

  if (nomeSemEspacos.length === 0) {
    return '';
  }

  return nomeSemEspacos[0].toUpperCase() + nomeSemEspacos.slice(1).toLowerCase();
}
