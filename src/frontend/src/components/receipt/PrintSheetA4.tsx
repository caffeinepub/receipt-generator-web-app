import { ReceiptPreview } from './ReceiptPreview';
import type { ReceiptData } from './types';

interface PrintSheetA4Props {
  receiptData: ReceiptData;
}

export function PrintSheetA4({ receiptData }: PrintSheetA4Props) {
  return (
    <div className="print-sheet-a4">
      <div className="print-receipt-copy">
        <ReceiptPreview {...receiptData} />
      </div>
      
      <div className="print-separator">
        <div className="print-separator-line" />
        <span className="print-separator-text">✂ Cut Here ✂</span>
        <div className="print-separator-line" />
      </div>
      
      <div className="print-receipt-copy">
        <ReceiptPreview {...receiptData} />
      </div>
    </div>
  );
}
