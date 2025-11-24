import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Send, 
  CreditCard, 
  Zap,
  ChevronRight,
  Calendar,
  PiggyBank
} from 'lucide-react';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Transaction } from '../App';

interface TransactionPageProps {
  transactions: Transaction[];
}

export function TransactionPage({ transactions }: TransactionPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className="w-5 h-5" />;
      case 'receive':
        return <Download className="w-5 h-5" />;
      case 'payment':
        return <Zap className="w-5 h-5" />;
      case 'topup':
        return <CreditCard className="w-5 h-5" />;
      case 'saving':
        return <PiggyBank className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'send':
        return 'bg-red-100';
      case 'receive':
        return 'bg-green-100';
      case 'payment':
        return 'bg-orange-100';
      case 'topup':
        return 'bg-purple-100';
      case 'saving':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'send':
        return 'text-red-600';
      case 'receive':
        return 'text-green-600';
      case 'payment':
        return 'text-orange-600';
      case 'topup':
        return 'text-purple-600';
      case 'saving':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    if (selectedTab === 'income') {
      filtered = filtered.filter(t => t.amount > 0);
    } else if (selectedTab === 'expense') {
      filtered = filtered.filter(t => t.amount < 0);
    }

    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-300 to-rose-400 px-6 pt-12 pb-8">
        <h2 className="text-white mb-6">Riwayat Transaksi</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-rose-50 text-sm mb-1">Pemasukan</p>
            <p className="text-white">Rp {totalIncome.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-rose-50 text-sm mb-1">Pengeluaran</p>
            <p className="text-white">Rp {totalExpense.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari transaksi..."
            className="pl-10 pr-12 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="income">Masuk</TabsTrigger>
            <TabsTrigger value="expense">Keluar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Transaction List */}
      <div className="px-6">
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <button
              key={transaction.id}
              className="w-full bg-white p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getIconBgColor(transaction.type)}`}>
                  <div className={getIconColor(transaction.type)}>
                    {getIcon(transaction.type)}
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-900">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.date} • {transaction.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.category}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Tidak ada transaksi ditemukan</p>
          </div>
        )}

        {/* Download Button */}
        <div className="mt-6 pb-4">
          <Button variant="outline" className="w-full gap-2">
            <Calendar className="w-4 h-4" />
            Unduh Laporan Transaksi
          </Button>
        </div>
      </div>
    </div>
  );
}