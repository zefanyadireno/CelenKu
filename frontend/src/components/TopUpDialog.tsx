import { useState } from 'react';
import { CreditCard, Building2, Wallet } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { Transaction } from '../App';

interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => void;
}

export function TopUpDialog({ open, onOpenChange, onAddTransaction }: TopUpDialogProps) {
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('bca');

  const banks = [
    { id: 'bca', name: 'Bank BCA', icon: '🏦' },
    { id: 'mandiri', name: 'Bank Mandiri', icon: '🏦' },
    { id: 'bni', name: 'Bank BNI', icon: '🏦' },
    { id: 'bri', name: 'Bank BRI', icon: '🏦' },
  ];

  const quickAmounts = [100000, 250000, 500000, 1000000];

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast.error('Mohon masukkan jumlah top up');
      return;
    }
    const amountNum = parseFloat(amount);
    const selectedBankName = banks.find(b => b.id === selectedBank)?.name;
    toast.success(`Top up Rp ${amountNum.toLocaleString('id-ID')} dari ${selectedBankName} berhasil diproses`);
    
    onAddTransaction({
      type: 'topup',
      name: `Top Up dari ${selectedBankName}`,
      amount: amountNum,
      category: 'Top Up',
    });
    
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            Top Up Saldo
          </DialogTitle>
          <DialogDescription>
            Tambahkan saldo dari rekening bank Anda
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleTopUp} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Pilih Bank</Label>
            <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
              <div className="space-y-2">
                {banks.map((bank) => (
                  <div key={bank.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={bank.id} id={bank.id} />
                    <Label
                      htmlFor={bank.id}
                      className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                    >
                      <span className="text-2xl">{bank.icon}</span>
                      <span>{bank.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topup-amount">Jumlah Top Up</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
              <Input
                id="topup-amount"
                type="number"
                placeholder="0"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="text-xs"
                >
                  {amt >= 1000000 ? `${amt / 1000000}Jt` : `${amt / 1000}K`}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Info:</strong> Anda akan diarahkan ke halaman bank untuk menyelesaikan transaksi
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
              Lanjutkan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}