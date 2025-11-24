import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface ChangePINDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePINDialog({ open, onOpenChange }: ChangePINDialogProps) {
  const [currentPIN, setCurrentPIN] = useState('');
  const [newPIN, setNewPIN] = useState('');
  const [confirmPIN, setConfirmPIN] = useState('');
  const [showPINs, setShowPINs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPIN || !newPIN || !confirmPIN) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    if (currentPIN !== '123456') {
      toast.error('PIN lama tidak sesuai');
      return;
    }

    if (newPIN.length !== 6) {
      toast.error('PIN harus 6 digit');
      return;
    }

    if (newPIN !== confirmPIN) {
      toast.error('PIN baru tidak sama');
      return;
    }

    toast.success('PIN berhasil diubah');
    setCurrentPIN('');
    setNewPIN('');
    setConfirmPIN('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-rose-500" />
            </div>
            Ubah PIN
          </DialogTitle>
          <DialogDescription>
            Ubah PIN keamanan untuk transaksi Anda
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="current-pin">PIN Lama</Label>
            <div className="relative">
              <Input
                id="current-pin"
                type={showPINs ? 'text' : 'password'}
                placeholder="Masukkan PIN lama"
                maxLength={6}
                value={currentPIN}
                onChange={(e) => setCurrentPIN(e.target.value.replace(/\D/g, ''))}
                required
              />
              <button
                type="button"
                onClick={() => setShowPINs(!showPINs)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPINs ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">Untuk demo: gunakan 123456</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-pin">PIN Baru</Label>
            <Input
              id="new-pin"
              type={showPINs ? 'text' : 'password'}
              placeholder="Masukkan PIN baru (6 digit)"
              maxLength={6}
              value={newPIN}
              onChange={(e) => setNewPIN(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-pin">Konfirmasi PIN Baru</Label>
            <Input
              id="confirm-pin"
              type={showPINs ? 'text' : 'password'}
              placeholder="Ulangi PIN baru"
              maxLength={6}
              value={confirmPIN}
              onChange={(e) => setConfirmPIN(e.target.value.replace(/\D/g, ''))}
              required
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ <strong>Penting:</strong> Jangan bagikan PIN Anda kepada siapapun, termasuk petugas CelenKu.
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" className="flex-1 bg-rose-400 hover:bg-rose-500">
              Ubah PIN
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
