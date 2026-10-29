import { subtract } from './subtract';

describe('subtract function', () => {
  it('should subtract two positive numbers correctly', () => {
    // Arrange
    const a = 10;
    const b = 4;

    // Act
    const result = subtract(a, b);

    // Assert
    expect(result).toBe(6);
  });

  it('should return a negative result when the second number is larger', () => {
    // Arrange
    const a = 3;
    const b = 8;

    // Act
    const result = subtract(a, b);

    // Assert
    expect(result).toBe(-5);
  });

  it('should keep the number unchanged when subtracting zero', () => {
    // Arrange
    const a = 7;
    const b = 0;

    // Act
    const result = subtract(a, b);

    // Assert
    expect(result).toBe(7);
  });

  it('should subtract two negative numbers correctly', () => {
    // Arrange
    const a = -5;
    const b = -2;

    // Act
    const result = subtract(a, b);

    // Assert
    expect(result).toBe(-3);
  });

  it('should subtract decimal numbers correctly', () => {
    // Arrange
    const a = 5.5;
    const b = 2.5;

    // Act
    const result = subtract(a, b);

    // Assert
    expect(result).toBe(3);
  });
});
