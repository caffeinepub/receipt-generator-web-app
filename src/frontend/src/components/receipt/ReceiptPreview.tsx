import type { PaymentEntry } from './types';
import './ReceiptPreview.css';

interface ReceiptPreviewProps {
  companyName: string;
  customerName: string;
  orderNumber: string;
  receiptNumber: string;
  date: string;
  payments: PaymentEntry[];
  totalAmount: number;
  logoUrl: string;
}

export function ReceiptPreview({
  companyName,
  customerName,
  orderNumber,
  receiptNumber,
  date,
  payments,
  totalAmount,
  logoUrl,
}: ReceiptPreviewProps) {
  return (
    <div className="receipt-preview">
      {/* Header with Logo */}
      <div className="receipt-header">
        <img src={logoUrl} alt="Company Logo" className="receipt-logo" />
        <h2 className="receipt-company-name">{companyName}</h2>
      </div>

      <div className="receipt-divider" />

      {/* Receipt Info */}
      <div className="receipt-info">
        <div className="receipt-info-row">
          <span className="receipt-label">Receipt No:</span>
          <span className="receipt-value">{receiptNumber}</span>
        </div>
        <div className="receipt-info-row">
          <span className="receipt-label">Date:</span>
          <span className="receipt-value">{new Date(date).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="receipt-info-row">
          <span className="receipt-label">Customer:</span>
          <span className="receipt-value">{customerName}</span>
        </div>
        {orderNumber && (
          <div className="receipt-info-row">
            <span className="receipt-label">Order No:</span>
            <span className="receipt-value">{orderNumber}</span>
          </div>
        )}
      </div>

      <div className="receipt-divider" />

      {/* Payment Details */}
      <div className="receipt-payments">
        <h3 className="receipt-section-title">Payment Details</h3>
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Amount</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              const amount = parseFloat(payment.amount) || 0;
              return (
                <tr key={payment.id}>
                  <td>{payment.mode}</td>
                  <td className="receipt-amount">₹{amount.toFixed(2)}</td>
                  <td className="receipt-utr">{payment.utr || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="receipt-divider" />

      {/* Total */}
      <div className="receipt-total">
        <span className="receipt-total-label">Total Amount:</span>
        <span className="receipt-total-value">₹{totalAmount.toFixed(2)}</span>
      </div>

      <div className="receipt-divider" />

      {/* Signature */}
      <div className="receipt-signature">
        <div className="receipt-signature-line" />
        <span className="receipt-signature-label">Authorized Signature</span>
      </div>
    </div>
  );
}
