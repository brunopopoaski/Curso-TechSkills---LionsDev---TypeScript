import { divide } from '../divide';

describe('divide function', () => {
  it('should return 5 when dividing 10 by 2', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow();
  });

  it('should report the division-by-zero message', () => {
    expect(() => divide(10, 0)).toThrow('divisão por zero');
  });

  it('should report division-by-zero with a regular expression', () => {
    expect(() => divide(10, 0)).toThrow(/zero/);
  });

  it('should throw an Error instance', () => {
    expect(() => divide(10, 0)).toThrow(Error);
  });

  it('should support negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it('should return zero when the numerator is zero', () => {
    expect(divide(0, 5)).toBe(0);
  });

  it('should return decimal results', () => {
    expect(divide(7, 2)).toBe(3.5);
  });

  it('should not throw for a valid division', () => {
    expect(() => divide(10, 5)).not.toThrow();
  });
});
