import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileUp } from 'lucide-react';
import { PrintSheetA4 } from './PrintSheetA4';
import type { ReceiptData } from './types';

interface PrintPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData: ReceiptData;
  onGeneratePdf: () => void;
}

export function PrintPreviewModal({ open, onOpenChange, receiptData, onGeneratePdf }: PrintPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Print Preview - A4 Format</DialogTitle>
        </DialogHeader>

        <div className="my-4">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="scale-[0.5] origin-top">
              <PrintSheetA4 receiptData={receiptData} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onGeneratePdf}>
            <FileUp className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
