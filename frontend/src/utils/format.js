/**
 * Formatea un precio en céntimos de euro a formato legible en español.
 * Ejemplo: 150000 -> 1.500,00 €
 * Se implementa de forma manual para evitar dependencias del ICU en entornos CI sin soporte locale.
 */
export function formatPrice(priceInCents) {
  if (typeof priceInCents !== 'number' || isNaN(priceInCents)) {
    return '0,00 €';
  }
  
  const euros = (priceInCents / 100).toFixed(2); // "1500.00"
  const [integerPart, decimalPart] = euros.split('.');
  
  // Reemplazo regex para meter el punto como separador de miles
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formattedInteger},${decimalPart} €`;
}
