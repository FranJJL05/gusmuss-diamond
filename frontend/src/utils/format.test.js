import { describe, it, expect } from 'vitest';
import { formatPrice } from './format';

describe('formatPrice', () => {
  it('debe formatear céntimos correctamente a euros', () => {
    expect(formatPrice(10000)).toContain('100,00');
    expect(formatPrice(150000)).toContain('1.500,00');
    expect(formatPrice(50)).toContain('0,50');
  });

  it('debe manejar valores no numéricos o inválidos de forma segura', () => {
    expect(formatPrice(null)).toBe('0,00 €');
    expect(formatPrice(undefined)).toBe('0,00 €');
    expect(formatPrice('abc')).toBe('0,00 €');
    expect(formatPrice(NaN)).toBe('0,00 €');
  });
});
