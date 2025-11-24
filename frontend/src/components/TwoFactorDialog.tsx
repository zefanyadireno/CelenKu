import { useState } from 'react';
import { Shield, Smartphone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TwoFactorDialog({ open, onOpenChange }: TwoFactorDialogProps) {
  const [method, setMethod] = useState<'sms' | 'email'>('sms');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleEnable = () => {
    if (method === 'sms' && !phone) {
      toast.error('Mohon masukkan nomor HP');
      return;
    }
    if (method === 'email' && !email) {
      toast.error('Mohon masukkan email');
      return;
    }

    const contact = method === 'sms' ? phone : email;
    toast.success(`Verifikasi 2 langkah berhasil diaktifkan via ${method === 'sms' ? 'SMS' : 'Email'}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            Verifikasi 2 Langkah
          </DialogTitle>
          <DialogDescription>
            Tambahkan lapisan keamanan ekstra untuk akun Anda
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              🔒 Dengan verifikasi 2 langkah, Anda akan diminta kode verifikasi setiap kali login dari perangkat baru.
            </p>
          </div>

          <div className="space-y-3">
            <Label>Pilih Metode Verifikasi</Label>
            <RadioGroup value={method} onValueChange={(value) => setMethod(value as 'sms' | 'email')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label
                  htmlFor="sms"
                  className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">SMS</p>
                    <p className="text-sm text-gray-500">Kode dikirim via SMS</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label
                  htmlFor="email"
                  className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">Kode dikirim via email</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {method === 'sms' ? (
            <div className="space-y-2">
              <Label htmlFor="phone-2fa">Nomor HP</Label>
              <Input
                id="phone-2fa"
                type="tel"
                placeholder="08123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email-2fa">Email</Label>
              <Input
                id="email-2fa"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button 
              onClick={handleEnable}
              className="flex-1 bg-rose-400 hover:bg-rose-500"
            >
              Aktifkan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
