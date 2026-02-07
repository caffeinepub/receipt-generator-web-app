export function parseAmount(value: string): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) || parsed < 0 ? 0 : parsed;
}

export function isValidAmount(value: string): boolean {
  if (value === '') return true;
  const parsed = parseFloat(value);
  return !isNaN(parsed) && parsed >= 0;
}

export function calculateTotal(amounts: string[]): number {
  return amounts.reduce((sum, amount) => sum + parseAmount(amount), 0);
}

export function formatAmount(value: number): string {
  return value.toFixed(2);
}
