import { useState } from 'react';
import { Zap, Phone, Smartphone, Droplets, FileText } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { Transaction } from '../App';

interface PayBillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => void;
}

export function PayBillsDialog({ open, onOpenChange, onAddTransaction }: PayBillsDialogProps) {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedTab, setSelectedTab] = useState('pulsa');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) {
      toast.error('Mohon masukkan nomor/ID pelanggan');
      return;
    }
    
    let serviceName = '';
    switch (selectedTab) {
      case 'pulsa':
        serviceName = 'Pulsa';
        break;
      case 'listrik':
        serviceName = 'Listrik PLN';
        break;
      case 'internet':
        serviceName = 'Paket Internet';
        break;
      case 'pdam':
        serviceName = 'PDAM';
        break;
    }
    
    const amountNum = amount ? parseFloat(amount) : 50000; // Default amount if not specified
    toast.success(`Pembayaran ${serviceName} berhasil diproses`);
    
    onAddTransaction({
      type: 'payment',
      name: `Bayar ${serviceName}`,
      amount: -amountNum,
      category: 'Pembayaran',
      details: `ID: ${customerId}`,
    });
    
    setCustomerId('');
    setAmount('');
    onOpenChange(false);
  };

  const pulsaAmounts = [10000, 25000, 50000, 100000];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            Bayar Tagihan
          </DialogTitle>
          <DialogDescription>
            Bayar berbagai tagihan dan pembelian
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pulsa" className="text-xs">
              <Phone className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="listrik" className="text-xs">
              <Zap className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="internet" className="text-xs">
              <Smartphone className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="pdam" className="text-xs">
              <Droplets className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          {/* Pulsa */}
          <TabsContent value="pulsa" className="space-y-4">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone-number">Nomor HP</Label>
                <Input
                  id="phone-number"
                  placeholder="08123456789"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Nominal Pulsa</Label>
                <div className="grid grid-cols-2 gap-2">
                  {pulsaAmounts.map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant={amount === amt.toString() ? "default" : "outline"}
                      onClick={() => setAmount(amt.toString())}
                      className={amount === amt.toString() ? "bg-rose-400 hover:bg-rose-500" : ""}
                    >
                      Rp {amt.toLocaleString('id-ID')}
                    </Button>
                  ))}
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
                  Bayar
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Listrik */}
          <TabsContent value="listrik" className="space-y-4">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meter-number">Nomor Meter / ID Pelanggan</Label>
                <Input
                  id="meter-number"
                  placeholder="Masukkan nomor meter"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Token Listrik</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[20000, 50000, 100000, 200000].map((amt) => (
                    <Button
                      key={amt}
                      type="button"
                      variant={amount === amt.toString() ? "default" : "outline"}
                      onClick={() => setAmount(amt.toString())}
                      className={amount === amt.toString() ? "bg-rose-400 hover:bg-rose-500" : ""}
                    >
                      Rp {amt.toLocaleString('id-ID')}
                    </Button>
                  ))}
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
                  Bayar
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Internet */}
          <TabsContent value="internet" className="space-y-4">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="internet-number">Nomor HP</Label>
                <Input
                  id="internet-number"
                  placeholder="08123456789"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Paket Internet</Label>
                <div className="space-y-2">
                  {[
                    { name: '1 GB / 7 Hari', price: 15000 },
                    { name: '3 GB / 30 Hari', price: 35000 },
                    { name: '8 GB / 30 Hari', price: 65000 },
                    { name: '15 GB / 30 Hari', price: 100000 },
                  ].map((paket) => (
                    <Button
                      key={paket.name}
                      type="button"
                      variant={amount === paket.price.toString() ? "default" : "outline"}
                      onClick={() => setAmount(paket.price.toString())}
                      className={`w-full justify-between ${amount === paket.price.toString() ? "bg-rose-400 hover:bg-rose-500" : ""}`}
                    >
                      <span>{paket.name}</span>
                      <span>Rp {paket.price.toLocaleString('id-ID')}</span>
                    </Button>
                  ))}
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
                  Bayar
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* PDAM */}
          <TabsContent value="pdam" className="space-y-4">
            <form onSubmit={handlePayment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdam-number">Nomor Pelanggan PDAM</Label>
                <Input
                  id="pdam-number"
                  placeholder="Masukkan nomor pelanggan"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  ℹ️ Tagihan akan muncul setelah nomor pelanggan diverifikasi
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
                  Cek Tagihan
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}