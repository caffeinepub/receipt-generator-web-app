import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useLogo } from './hooks/useLogo';

export function LogoUploader() {
  const { logoUrl, uploadLogo, resetLogo, isCustomLogo } = useLogo();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogo(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadLogo(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <img src={logoUrl} alt="Company Logo" className="h-16 w-auto object-contain" />
      </div>

      <div
        className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Label
          htmlFor="logo-upload"
          className="flex cursor-pointer flex-col items-center gap-2 text-sm"
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="font-medium">Click to upload or drag and drop</span>
          <span className="text-xs text-muted-foreground">PNG, JPG, SVG up to 5MB</span>
        </Label>
      </div>

      {isCustomLogo && (
        <Button variant="outline" size="sm" onClick={resetLogo} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Reset to Default Logo
        </Button>
      )}
    </div>
  );
}
