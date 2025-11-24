import { Download, Copy, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface ReceiveMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReceiveMoneyDialog({ open, onOpenChange }: ReceiveMoneyDialogProps) {
  const accountNumber = '1234567890';
  const accountName = 'Budi Santoso';

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin`);
  };

  const handleShare = () => {
    toast.success('Link pembayaran dibagikan');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Download className="w-5 h-5 text-green-600" />
            </div>
            Terima Uang
          </DialogTitle>
          <DialogDescription>
            Bagikan informasi akun untuk menerima uang
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* QR Code */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-40 h-40 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg flex items-center justify-center">
                  <p className="text-xs text-gray-600">QR Code</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Scan untuk bayar</p>
          </div>

          {/* Account Details */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Nomor Akun</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(accountNumber, 'Nomor akun')}
                  className="h-8 gap-1"
                >
                  <Copy className="w-4 h-4" />
                  Salin
                </Button>
              </div>
              <p className="text-gray-900">{accountNumber}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Nama Penerima</p>
              <p className="text-gray-900">{accountName}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
            <Button
              className="flex-1 bg-rose-400 hover:bg-rose-500"
              onClick={() => onOpenChange(false)}
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
