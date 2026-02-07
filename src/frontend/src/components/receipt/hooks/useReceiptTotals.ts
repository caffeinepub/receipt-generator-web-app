import { useMemo } from 'react';
import type { PaymentEntry } from '../types';
import { calculateTotal, isValidAmount } from '../utils/money';

export function useReceiptTotals(payments: PaymentEntry[]) {
  const { totalAmount, isValid } = useMemo(() => {
    const amounts = payments.map((p) => p.amount);
    const allValid = amounts.every((amount) => isValidAmount(amount));
    const total = calculateTotal(amounts);

    return {
      totalAmount: total,
      isValid: allValid,
    };
  }, [payments]);

  return { totalAmount, isValid };
}
