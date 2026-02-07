export interface PaymentEntry {
  id: string;
  mode: 'Cash' | 'UPI' | 'Card' | 'Bank Transfer';
  amount: string;
  utr: string;
}

export interface ReceiptData {
  companyName: string;
  customerName: string;
  orderNumber: string;
  receiptNumber: string;
  date: string;
  payments: PaymentEntry[];
  totalAmount: number;
  logoUrl: string;
}
