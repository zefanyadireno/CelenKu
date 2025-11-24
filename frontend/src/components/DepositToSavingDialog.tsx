import { useState } from 'react';
import { PiggyBank, DollarSign, Wallet } from 'lucide-react';
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
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface DepositToSavingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savingGoal: {
    id: number;
    name: string;
    target: number;
    current: number;
    deadline: string;
    color: string;
  } | null;
  onDeposit: (goalId: number, amount: number) => void;
}

export function DepositToSavingDialog({ 
  open, 
  onOpenChange, 
  savingGoal,
  onDeposit 
}: DepositToSavingDialogProps) {
  const [amount, setAmount] = useState('');

  if (!savingGoal) return null;

  const progress = (savingGoal.current / savingGoal.target) * 100;
  const remaining = savingGoal.target - savingGoal.current;

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Mohon masukkan nominal yang valid');
      return;
    }
    
    const depositAmount = parseFloat(amount);
    onDeposit(savingGoal.id, depositAmount);
    toast.success(`Berhasil menyetor Rp ${depositAmount.toLocaleString('id-ID')} ke ${savingGoal.name}`);
    setAmount('');
    onOpenChange(false);
  };

  const quickAmounts = [
    { label: '50K', value: 50000 },
    { label: '100K', value: 100000 },
    { label: '250K', value: 250000 },
    { label: 'Sisa', value: remaining },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full ${savingGoal.color} flex items-center justify-center`}>
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            Setor ke Tabungan
          </DialogTitle>
          <DialogDescription>
            {savingGoal.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Current Progress */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress Saat Ini</span>
              <span className="text-rose-500">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-3" />
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500 text-xs">Terkumpul</p>
                <p className="text-gray-900">Rp {savingGoal.current.toLocaleString('id-ID')}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">Target</p>
                <p className="text-gray-900">Rp {savingGoal.target.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>

          {/* Remaining */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💰 Sisa yang dibutuhkan: <strong>Rp {remaining.toLocaleString('id-ID')}</strong>
            </p>
          </div>

          <form onSubmit={handleDeposit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Nominal Setoran</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="0"
                  className="pl-10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.value.toString())}
                    className="text-xs"
                    disabled={amt.value <= 0}
                  >
                    {amt.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label>Sumber Dana</Label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                <Wallet className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Saldo CelenKu</p>
                  <p className="text-xs text-gray-500">Rp 1.750.000</p>
                </div>
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
                Setor Sekarang
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
