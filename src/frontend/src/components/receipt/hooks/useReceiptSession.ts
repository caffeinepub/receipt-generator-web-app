import { useState, useCallback } from 'react';
import { generateReceiptNumber } from '../utils/receiptNumber';

export function useReceiptSession() {
  const [receiptNumber, setReceiptNumber] = useState(() => generateReceiptNumber());

  const resetReceipt = useCallback(() => {
    setReceiptNumber(generateReceiptNumber());
  }, []);

  return {
    receiptNumber,
    resetReceipt,
  };
}
