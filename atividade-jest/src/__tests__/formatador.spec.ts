import { formatarNome } from '../formatador';

describe('formatarNome function', () => {
  it('should capitalize the first letter', () => {
    expect(formatarNome('maria')).toBe('Maria');
  });

  it('should trim spaces and capitalize the first letter', () => {
    expect(formatarNome(' joão ')).toBe('João');
  });

  it('should normalize uppercase letters', () => {
    expect(formatarNome('ANA')).toBe('Ana');
  });

  it('should keep an empty string empty', () => {
    expect(formatarNome('')).toBe('');
  });
});
