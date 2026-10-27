import { calcularFrete } from './shipping';

describe('calcularFrete function', () => {
  it('should charge 10 reais for exactly 1 kilogram', () => {
    // Arrange
    const cep = '01001000';
    const peso = 1;

    // Act
    const valor = calcularFrete(cep, peso);

    // Assert
    expect(valor).toBe(10);
  });

  it('should charge 2 reais for each additional kilogram', () => {
    // Arrange
    const cep = '01001000';
    const peso = 3;

    // Act
    const valor = calcularFrete(cep, peso);

    // Assert
    expect(valor).toBe(14);
  });

  it('should charge 18 reais at exactly 5 kilograms', () => {
    // Arrange
    const cep = '01001000';
    const peso = 5;

    // Act
    const valor = calcularFrete(cep, peso);

    // Assert
    expect(valor).toBe(18);
  });

  it('should charge 25 reais above 5 kilograms', () => {
    // Arrange
    const cep = '01001000';
    const peso = 6;

    // Act
    const valor = calcularFrete(cep, peso);

    // Assert
    expect(valor).toBe(25);
  });

  it('should add 5 reais when the CEP starts with 9', () => {
    // Arrange
    const cep = '90000000';
    const peso = 1;

    // Act
    const valor = calcularFrete(cep, peso);

    // Assert
    expect(valor).toBe(15);
  });

  it('should throw when the CEP is invalid', () => {
    // Arrange
    const cep = '123';
    const peso = 2;

    // Act
    const calculation = () => calcularFrete(cep, peso);

    // Assert
    expect(calculation).toThrow('CEP inválido');
  });

  it('should throw when the CEP is absent', () => {
    // Arrange
    const cep = undefined;
    const peso = 2;

    // Act
    const calculation = () => calcularFrete(cep, peso);

    // Assert
    expect(calculation).toThrow('CEP inválido');
  });
});
