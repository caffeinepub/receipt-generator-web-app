import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import type { PaymentEntry } from './types';

interface PaymentsEditorProps {
  payments: PaymentEntry[];
  onUpdatePayment: (id: string, field: keyof PaymentEntry, value: string) => void;
  onRemovePayment: (id: string) => void;
}

export function PaymentsEditor({ payments, onUpdatePayment, onRemovePayment }: PaymentsEditorProps) {
  return (
    <div className="space-y-4">
      {payments.map((payment, index) => (
        <div key={payment.id} className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Payment {index + 1}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemovePayment(payment.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`mode-${payment.id}`}>Payment Mode</Label>
              <Select
                value={payment.mode}
                onValueChange={(value) => onUpdatePayment(payment.id, 'mode', value)}
              >
                <SelectTrigger id={`mode-${payment.id}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`amount-${payment.id}`}>Amount (₹)</Label>
              <Input
                id={`amount-${payment.id}`}
                type="number"
                min="0"
                step="0.01"
                value={payment.amount}
                onChange={(e) => onUpdatePayment(payment.id, 'amount', e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`utr-${payment.id}`}>UTR / Transaction Number</Label>
            <Input
              id={`utr-${payment.id}`}
              value={payment.utr}
              onChange={(e) => onUpdatePayment(payment.id, 'utr', e.target.value)}
              placeholder="Enter transaction reference"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
