import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { TransactionPage } from './components/TransactionPage';
import { ProfilePage } from './components/ProfilePage';
import { SettingPage } from './components/SettingPage';
import { SavingPage } from './components/SavingPage';
import { BottomNav } from './components/BottomNav';
import { Notification } from './components/NotificationCenter';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'payment' | 'topup' | 'saving';
  name: string;
  amount: number;
  date: string;
  time: string;
  status: 'success' | 'pending' | 'failed';
  category: string;
  details?: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'time' | 'status'>) => {
    const now = new Date();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'success',
    };
    setTransactions(prev => [newTransaction, ...prev]);

    // Also add notification
    const notificationTitle = 
      transaction.type === 'send' ? 'Transfer Berhasil' :
      transaction.type === 'receive' ? 'Uang Diterima' :
      transaction.type === 'topup' ? 'Top Up Berhasil' :
      transaction.type === 'payment' ? 'Pembayaran Berhasil' :
      'Setor Tabungan Berhasil';

    addNotification({
      type: transaction.type,
      title: notificationTitle,
      message: transaction.name,
      amount: transaction.amount,
    });
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen relative">
      {currentPage === 'home' && (
        <HomePage 
          onNavigate={handleNavigate} 
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAllNotifications}
          onAddNotification={addNotification}
          transactions={transactions}
          onAddTransaction={addTransaction}
        />
      )}
      {currentPage === 'transactions' && <TransactionPage transactions={transactions} />}
      {currentPage === 'saving' && (
        <SavingPage 
          onAddNotification={addNotification}
          onAddTransaction={addTransaction}
        />
      )}
      {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} />}
      {currentPage === 'settings' && (
        <SettingPage 
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />
      )}
      
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
    </div>
  );
}