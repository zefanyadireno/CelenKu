import { useState } from 'react';
import { PiggyBank, Target, Calendar as CalendarIcon, DollarSign } from 'lucide-react';
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
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner@2.0.3';

interface AddNewSavingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSaving: (saving: {
    name: string;
    target: number;
    deadline: string;
    color: string;
  }) => void;
}

export function AddNewSavingDialog({ 
  open, 
  onOpenChange,
  onAddSaving
}: AddNewSavingDialogProps) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [date, setDate] = useState<Date>();
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');

  const colors = [
    { value: 'bg-blue-500', label: 'Biru' },
    { value: 'bg-purple-500', label: 'Ungu' },
    { value: 'bg-green-500', label: 'Hijau' },
    { value: 'bg-orange-500', label: 'Oranye' },
    { value: 'bg-red-500', label: 'Merah' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-yellow-500', label: 'Kuning' },
    { value: 'bg-indigo-500', label: 'Indigo' },
  ];

  const quickTargets = [
    { label: '5 Jt', value: 5000000 },
    { label: '10 Jt', value: 10000000 },
    { label: '20 Jt', value: 20000000 },
    { label: '50 Jt', value: 50000000 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !target || !date) {
      toast.error('Mohon lengkapi semua data');
      return;
    }

    const targetAmount = parseFloat(target);
    if (targetAmount <= 0) {
      toast.error('Target harus lebih dari 0');
      return;
    }

    const deadline = date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });

    onAddSaving({
      name,
      target: targetAmount,
      deadline,
      color: selectedColor,
    });

    toast.success(`Tabungan "${name}" berhasil dibuat!`);
    
    // Reset form
    setName('');
    setTarget('');
    setDate(undefined);
    setSelectedColor('bg-blue-500');
    onOpenChange(false);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Pilih tanggal';
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-rose-500" />
            </div>
            Tabungan Baru
          </DialogTitle>
          <DialogDescription>
            Buat tujuan tabungan baru untuk wujudkan impian Anda
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="saving-name">Nama Tabungan</Label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="saving-name"
                placeholder="Contoh: Liburan ke Bali"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="saving-target">Target Tabungan</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
              <Input
                id="saving-target"
                type="number"
                placeholder="0"
                className="pl-10"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {quickTargets.map((amt) => (
                <Button
                  key={amt.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTarget(amt.value.toString())}
                  className="text-xs"
                >
                  {amt.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tenggat Waktu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 w-4 h-4" />
                  {formatDate(date)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Warna Tabungan</Label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-12 rounded-lg ${color.value} relative transition-transform hover:scale-105 ${
                    selectedColor === color.value ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                  }`}
                >
                  {selectedColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              💡 <strong>Tips:</strong> Buat target yang realistis dan pecah menjadi tujuan kecil untuk motivasi lebih baik!
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
              Buat Tabungan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
