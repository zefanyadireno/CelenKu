import { Bell, Send, Download, CreditCard, Zap, PiggyBank, X, Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

export interface Notification {
  id: string;
  type: 'send' | 'receive' | 'topup' | 'payment' | 'saving';
  title: string;
  message: string;
  amount?: number;
  timestamp: Date;
  read: boolean;
}

interface NotificationCenterProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationCenter({ 
  open, 
  onOpenChange, 
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll
}: NotificationCenterProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send className="w-5 h-5 text-red-600" />;
      case 'receive':
        return <Download className="w-5 h-5 text-green-600" />;
      case 'topup':
        return <CreditCard className="w-5 h-5 text-purple-600" />;
      case 'payment':
        return <Zap className="w-5 h-5 text-orange-600" />;
      case 'saving':
        return <PiggyBank className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'send':
        return 'bg-red-100';
      case 'receive':
        return 'bg-green-100';
      case 'topup':
        return 'bg-purple-100';
      case 'payment':
        return 'bg-orange-100';
      case 'saving':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 7) return `${days} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifikasi
                {unreadCount > 0 && (
                  <Badge className="bg-rose-400">{unreadCount}</Badge>
                )}
              </SheetTitle>
              <SheetDescription>
                Riwayat aktivitas transaksi Anda
              </SheetDescription>
            </div>
          </div>
          {notifications.length > 0 && (
            <div className="flex gap-2 mt-4">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Tandai Dibaca
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={onClearAll}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-1" />
                Hapus Semua
              </Button>
            </div>
          )}
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-180px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-900 mb-1">Belum ada notifikasi</p>
              <p className="text-sm text-gray-500 text-center">
                Notifikasi transaksi Anda akan muncul di sini
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => onMarkAsRead(notification.id)}
                  className={`w-full p-4 hover:bg-gray-50 transition-colors text-left ${
                    !notification.read ? 'bg-rose-50/30' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-12 h-12 rounded-full ${getIconBg(notification.type)} flex items-center justify-center flex-shrink-0`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`text-gray-900 ${!notification.read ? 'font-medium' : ''}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-rose-400 rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </p>
                        {notification.amount !== undefined && (
                          <p className={`text-sm ${
                            notification.type === 'receive' || notification.type === 'topup'
                              ? 'text-green-600'
                              : 'text-gray-900'
                          }`}>
                            {notification.type === 'receive' || notification.type === 'topup' ? '+' : ''}
                            Rp {Math.abs(notification.amount).toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
