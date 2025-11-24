import { useState } from 'react';
import { Send, User, DollarSign, MessageSquare } from 'lucide-react';
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
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Transaction } from '../App';

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => void;
}

export function SendMoneyDialog({ open, onOpenChange, onAddTransaction }: SendMoneyDialogProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) {
      toast.error('Mohon lengkapi data penerima dan jumlah');
      return;
    }
    const amountNum = parseFloat(amount);
    toast.success(`Berhasil mengirim Rp ${amountNum.toLocaleString('id-ID')} ke ${recipient}`);
    
    onAddTransaction({
      type: 'send',
      name: `Transfer ke ${recipient}`,
      amount: -amountNum,
      category: 'Transfer',
      details: note || undefined,
    });
    
    setRecipient('');
    setAmount('');
    setNote('');
    onOpenChange(false);
  };

  const quickAmounts = [50000, 100000, 200000, 500000];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <Send className="w-5 h-5 text-rose-500" />
            </div>
            Kirim Uang
          </DialogTitle>
          <DialogDescription>
            Transfer uang ke sesama pengguna CelenKu
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSend} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Nomor HP / Email Penerima</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="recipient"
                placeholder="08123456789 atau email"
                className="pl-10"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
              <Input
                id="amount"
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
                  {amt / 1000}K
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Catatan (Opsional)</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Textarea
                id="note"
                placeholder="Tulis catatan..."
                className="pl-10 resize-none"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
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
              Kirim Sekarang
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}