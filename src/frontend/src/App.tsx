import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FileUp, Printer, FileText, Plus } from 'lucide-react';
import { PaymentsEditor } from './components/receipt/PaymentsEditor';
import { ReceiptPreview } from './components/receipt/ReceiptPreview';
import { PrintPreviewModal } from './components/receipt/PrintPreviewModal';
import { LogoUploader } from './components/receipt/LogoUploader';
import { useReceiptSession } from './components/receipt/hooks/useReceiptSession';
import { useReceiptTotals } from './components/receipt/hooks/useReceiptTotals';
import { useLogo } from './components/receipt/hooks/useLogo';
import { generateReceiptPdf } from './components/receipt/pdf/generateReceiptPdf';
import type { PaymentEntry } from './components/receipt/types';

function App() {
  const { receiptNumber, resetReceipt } = useReceiptSession();
  const { logoUrl } = useLogo();
  
  const [customerName, setCustomerName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [payments, setPayments] = useState<PaymentEntry[]>([]);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const { totalAmount, isValid } = useReceiptTotals(payments);

  const handleAddPayment = () => {
    setPayments([
      ...payments,
      {
        id: Date.now().toString(),
        mode: 'Cash',
        amount: '',
        utr: '',
      },
    ]);
  };

  const handleUpdatePayment = (id: string, field: keyof PaymentEntry, value: string) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleRemovePayment = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  const handleGeneratePdf = async () => {
    if (!isValid || payments.length === 0) {
      return;
    }

    await generateReceiptPdf({
      companyName: 'AUTO ELITE PRIVATE LIMITED',
      customerName,
      orderNumber,
      receiptNumber,
      date,
      payments,
      totalAmount,
      logoUrl,
    });
  };

  const handleNewReceipt = () => {
    setCustomerName('');
    setOrderNumber('');
    setDate(new Date().toISOString().split('T')[0]);
    setPayments([]);
    resetReceipt();
  };

  const canGenerate = isValid && payments.length > 0 && customerName.trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-foreground" />
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Receipt Generator
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={handleNewReceipt}>
              New Receipt
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Receipt Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value="AUTO ELITE PRIVATE LIMITED"
                    readOnly
                    className="bg-muted"
                  />
                </div>

                {/* Receipt Number */}
                <div className="space-y-2">
                  <Label htmlFor="receiptNumber">Receipt Number</Label>
                  <Input
                    id="receiptNumber"
                    value={receiptNumber}
                    readOnly
                    className="bg-muted font-mono"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>

                {/* Order Number */}
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter order number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Logo Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Logo</CardTitle>
              </CardHeader>
              <CardContent>
                <LogoUploader />
              </CardContent>
            </Card>

            {/* Payments Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                  <Button size="sm" onClick={handleAddPayment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <PaymentsEditor
                  payments={payments}
                  onUpdatePayment={handleUpdatePayment}
                  onRemovePayment={handleRemovePayment}
                />
                
                {payments.length === 0 && (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No payments added yet. Click "Add Payment" to begin.
                  </div>
                )}

                {payments.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">Total Amount:</span>
                      <span className="text-2xl font-bold">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1"
                size="lg"
                onClick={() => setShowPrintPreview(true)}
                disabled={!canGenerate}
              >
                <Printer className="mr-2 h-5 w-5" />
                Print Preview
              </Button>
              <Button
                className="flex-1"
                size="lg"
                onClick={handleGeneratePdf}
                disabled={!canGenerate}
              >
                <FileUp className="mr-2 h-5 w-5" />
                Generate PDF
              </Button>
            </div>

            {!canGenerate && payments.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">
                Add at least one payment to generate receipt
              </p>
            )}
            {!canGenerate && payments.length > 0 && customerName.trim() === '' && (
              <p className="text-center text-sm text-muted-foreground">
                Enter customer name to generate receipt
              </p>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="scale-[0.6] origin-top">
                    <ReceiptPreview
                      companyName="AUTO ELITE PRIVATE LIMITED"
                      customerName={customerName || 'Customer Name'}
                      orderNumber={orderNumber || 'Order Number'}
                      receiptNumber={receiptNumber}
                      date={date}
                      payments={payments}
                      totalAmount={totalAmount}
                      logoUrl={logoUrl}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>

      {/* Print Preview Modal */}
      <PrintPreviewModal
        open={showPrintPreview}
        onOpenChange={setShowPrintPreview}
        receiptData={{
          companyName: 'AUTO ELITE PRIVATE LIMITED',
          customerName,
          orderNumber,
          receiptNumber,
          date,
          payments,
          totalAmount,
          logoUrl,
        }}
        onGeneratePdf={handleGeneratePdf}
      />
    </div>
  );
}

export default App;
