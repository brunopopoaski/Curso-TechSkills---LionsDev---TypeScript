export interface OperationResult {
  operacao: 'subtracao';
  valores: [number, number];
  resultado: number;
}

export function montarOperacao(a: number, b: number): OperationResult {
  return {
    operacao: 'subtracao',
    valores: [a, b],
    resultado: a - b,
  };
}
