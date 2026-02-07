import type { ReceiptData } from '../types';

export async function generateReceiptPdf(receiptData: ReceiptData): Promise<void> {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow pop-ups to generate PDF');
    return;
  }

  // Generate the HTML content for two receipt copies
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Receipt - ${receiptData.receiptNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @page {
          size: A4 portrait;
          margin: 0;
        }

        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: white;
          color: #1a1a1a;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }

        .print-container {
          width: 210mm;
          min-height: 297mm;
          padding: 20mm;
          margin: 0 auto;
          background: white;
        }

        .receipt-copy {
          width: 100%;
          max-width: 400px;
          margin: 0 auto 20mm;
          padding: 24px;
          border: 1px solid #e5e5e5;
          background: white;
          page-break-inside: avoid;
        }

        .receipt-header {
          text-align: center;
          margin-bottom: 16px;
        }

        .receipt-logo {
          height: 48px;
          width: auto;
          margin: 0 auto 12px;
          display: block;
          object-fit: contain;
        }

        .receipt-company-name {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin: 0;
          color: #1a1a1a;
        }

        .receipt-divider {
          height: 1px;
          background: #e5e5e5;
          margin: 16px 0;
        }

        .receipt-info {
          margin-bottom: 16px;
        }

        .receipt-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 13px;
        }

        .receipt-label {
          font-weight: 600;
          color: #525252;
        }

        .receipt-value {
          font-weight: 500;
          color: #1a1a1a;
          text-align: right;
        }

        .receipt-section-title {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #1a1a1a;
        }

        .receipt-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }

        .receipt-table thead th {
          text-align: left;
          font-weight: 600;
          padding: 8px 4px;
          border-bottom: 2px solid #e5e5e5;
          color: #525252;
        }

        .receipt-table tbody td {
          padding: 8px 4px;
          border-bottom: 1px solid #f5f5f5;
          color: #1a1a1a;
        }

        .receipt-amount {
          text-align: right;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .receipt-utr {
          font-size: 11px;
          color: #737373;
          font-family: 'Courier New', monospace;
        }

        .receipt-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .receipt-total-label {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .receipt-total-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          font-variant-numeric: tabular-nums;
        }

        .receipt-signature {
          margin-top: 32px;
          text-align: right;
        }

        .receipt-signature-line {
          width: 180px;
          height: 1px;
          background: #1a1a1a;
          margin-left: auto;
          margin-bottom: 4px;
        }

        .receipt-signature-label {
          font-size: 11px;
          font-weight: 600;
          color: #525252;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .print-separator {
          margin: 15mm 0;
          display: flex;
          align-items: center;
          gap: 12px;
          page-break-inside: avoid;
        }

        .print-separator-line {
          flex: 1;
          height: 1px;
          background: #d4d4d4;
          position: relative;
        }

        .print-separator-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: repeating-linear-gradient(
            to right,
            #a3a3a3 0,
            #a3a3a3 5px,
            transparent 5px,
            transparent 10px
          );
        }

        .print-separator-text {
          font-size: 11px;
          color: #a3a3a3;
          font-weight: 500;
          white-space: nowrap;
          letter-spacing: 1px;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .print-container {
            margin: 0;
            padding: 20mm;
          }

          .receipt-copy {
            border: 1px solid #e5e5e5;
          }
        }

        @media screen {
          body {
            background: #f5f5f5;
            padding: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        ${generateReceiptHTML(receiptData)}
        
        <div class="print-separator">
          <div class="print-separator-line"></div>
          <span class="print-separator-text">✂ Cut Here ✂</span>
          <div class="print-separator-line"></div>
        </div>
        
        ${generateReceiptHTML(receiptData)}
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 250);
        };
        
        window.onafterprint = function() {
          window.close();
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

function generateReceiptHTML(data: ReceiptData): string {
  const formattedDate = new Date(data.date).toLocaleDateString('en-IN');
  
  const paymentsHTML = data.payments
    .map((payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return `
        <tr>
          <td>${escapeHtml(payment.mode)}</td>
          <td class="receipt-amount">₹${amount.toFixed(2)}</td>
          <td class="receipt-utr">${escapeHtml(payment.utr || '-')}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <div class="receipt-copy">
      <div class="receipt-header">
        <img src="${escapeHtml(data.logoUrl)}" alt="Company Logo" class="receipt-logo" />
        <h2 class="receipt-company-name">${escapeHtml(data.companyName)}</h2>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-info">
        <div class="receipt-info-row">
          <span class="receipt-label">Receipt No:</span>
          <span class="receipt-value">${escapeHtml(data.receiptNumber)}</span>
        </div>
        <div class="receipt-info-row">
          <span class="receipt-label">Date:</span>
          <span class="receipt-value">${formattedDate}</span>
        </div>
        <div class="receipt-info-row">
          <span class="receipt-label">Customer:</span>
          <span class="receipt-value">${escapeHtml(data.customerName)}</span>
        </div>
        ${
          data.orderNumber
            ? `
        <div class="receipt-info-row">
          <span class="receipt-label">Order No:</span>
          <span class="receipt-value">${escapeHtml(data.orderNumber)}</span>
        </div>
        `
            : ''
        }
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-payments">
        <h3 class="receipt-section-title">Payment Details</h3>
        <table class="receipt-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Amount</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            ${paymentsHTML}
          </tbody>
        </table>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-total">
        <span class="receipt-total-label">Total Amount:</span>
        <span class="receipt-total-value">₹${data.totalAmount.toFixed(2)}</span>
      </div>

      <div class="receipt-divider"></div>

      <div class="receipt-signature">
        <div class="receipt-signature-line"></div>
        <span class="receipt-signature-label">Authorized Signature</span>
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
