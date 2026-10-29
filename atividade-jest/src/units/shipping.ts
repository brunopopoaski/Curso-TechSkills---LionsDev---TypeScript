export function calcularFrete(cep: string | undefined, peso: number): number {
  if (!cep || !/^\d{8}$/.test(cep)) {
    throw new Error('CEP inválido');
  }

  if (!Number.isFinite(peso) || peso <= 0) {
    throw new Error('Peso inválido');
  }

  let valorFrete: number;

  if (peso <= 1) {
    valorFrete = 10;
  } else if (peso <= 5) {
    valorFrete = 10 + (peso - 1) * 2;
  } else {
    valorFrete = 25;
  }

  if (cep.startsWith('9')) {
    valorFrete += 5;
  }

  return Number(valorFrete.toFixed(2));
}
