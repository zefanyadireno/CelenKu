import { 
  Wallet, 
  Send, 
  Download, 
  CreditCard, 
  Zap, 
  Phone, 
  Smartphone,
  TrendingUp,
  Eye,
  EyeOff,
  Bell
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SendMoneyDialog } from './SendMoneyDialog';
import { ReceiveMoneyDialog } from './ReceiveMoneyDialog';
import { TopUpDialog } from './TopUpDialog';
import { PayBillsDialog } from './PayBillsDialog';
import { NotificationCenter, Notification } from './NotificationCenter';
import { Toaster } from './ui/sonner';
import { Transaction } from '../App';

interface HomePageProps {
  onNavigate: (page: string) => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onAddNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  transactions: Transaction[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => void;
}

export function HomePage({ 
  onNavigate, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onClearAll,
  onAddNotification,
  transactions,
  onAddTransaction
}: HomePageProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [sendMoneyOpen, setSendMoneyOpen] = useState(false);
  const [receiveMoneyOpen, setReceiveMoneyOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [payBillsOpen, setPayBillsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const quickActions = [
    { icon: Send, label: 'Kirim', color: 'bg-blue-500', onClick: () => setSendMoneyOpen(true) },
    { icon: Download, label: 'Terima', color: 'bg-green-500', onClick: () => setReceiveMoneyOpen(true) },
    { icon: CreditCard, label: 'Top Up', color: 'bg-purple-500', onClick: () => setTopUpOpen(true) },
    { icon: Zap, label: 'Bayar', color: 'bg-orange-500', onClick: () => setPayBillsOpen(true) },
  ];

  const services = [
    { icon: Phone, label: 'Pulsa' },
    { icon: Zap, label: 'Listrik' },
    { icon: Smartphone, label: 'Internet' },
    { icon: CreditCard, label: 'BPJS' },
  ];

  // Get recent transactions (last 4)
  const recentTransactions = transactions.slice(0, 4);

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-br from-rose-300 to-rose-400 px-6 pt-12 pb-32 rounded-b-3xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-rose-50">Selamat Datang</p>
              <h2 className="text-white">Budi Santoso</h2>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setNotificationOpen(true)}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center relative"
              >
                <Bell className="w-5 h-5 text-white" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </button>
              <button 
                onClick={() => onNavigate('profile')}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630910561339-4e22c7150093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzYwNTEwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>

      {/* Balance Card */}
      <div className="px-6 -mt-24 mb-6">
        <Card className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Saldo CelenKu</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <div className="mb-4">
            {showBalance ? (
              <h1 className="text-gray-900">Rp 1.750.000</h1>
            ) : (
              <h1 className="text-gray-900">Rp ••••••••</h1>
            )}
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">+12.5% dari bulan lalu</span>
          </div>
        </Card>
      </div>

        {/* Quick Actions */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center shadow-md`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Layanan</h3>
            <button className="text-sm text-rose-500">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setPayBillsOpen(true)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-rose-500" />
                </div>
                <span className="text-xs text-gray-700">{service.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Transaksi Terakhir</h3>
            <button 
              onClick={() => onNavigate('transactions')}
              className="text-sm text-rose-500"
            >
              Lihat Semua
            </button>
          </div>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.amount > 0 ? (
                        <Download className={`w-5 h-5 text-green-600`} />
                      ) : (
                        <Send className={`w-5 h-5 text-red-600`} />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-900">{transaction.name}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl text-center">
              <p className="text-gray-500">Belum ada transaksi</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialogs */}
      <SendMoneyDialog 
        open={sendMoneyOpen} 
        onOpenChange={setSendMoneyOpen}
        onAddTransaction={onAddTransaction}
      />
      <ReceiveMoneyDialog open={receiveMoneyOpen} onOpenChange={setReceiveMoneyOpen} />
      <TopUpDialog 
        open={topUpOpen} 
        onOpenChange={setTopUpOpen}
        onAddTransaction={onAddTransaction}
      />
      <PayBillsDialog 
        open={payBillsOpen} 
        onOpenChange={setPayBillsOpen}
        onAddTransaction={onAddTransaction}
      />
      <NotificationCenter
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
        onClearAll={onClearAll}
      />
    </>
  );
}