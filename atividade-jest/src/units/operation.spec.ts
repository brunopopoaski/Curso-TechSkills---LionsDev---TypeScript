import { montarOperacao } from './operation';

describe('montarOperacao function', () => {
  it('should compare operation fields with the appropriate matchers', () => {
    // Arrange
    const a = 10;
    const b = 4;

    // Act
    const operation = montarOperacao(a, b);

    // Assert
    expect(operation.operacao).toBe('subtracao');
    expect(operation.valores).toEqual([10, 4]);
    expect(operation.valores).toContain(4);
    expect(operation.resultado).toBeTruthy();
    expect(operation.resultado).toBe(6);
  });

  it('should return null when the operation is absent', () => {
    // Arrange
    const operation = null;

    // Act
    const result = operation;

    // Assert
    expect(result).toBeNull();
  });
});
