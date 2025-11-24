import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ChevronRight,
  Edit,
  Shield,
  CreditCard,
  Award,
  Heart
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const profileMenuItems = [
    { icon: Shield, label: 'Keamanan Akun', description: 'PIN, Password, Biometric' },
    { icon: CreditCard, label: 'Kartu & Rekening', description: 'Kelola metode pembayaran' },
    { icon: Award, label: 'Rewards & Poin', description: '1,250 poin tersedia' },
    { icon: Heart, label: 'Favorit', description: 'Daftar kontak favorit' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-300 to-rose-400 px-6 pt-12 pb-24">
        <h2 className="text-white mb-2">Profil Saya</h2>
        <p className="text-rose-50">Kelola informasi pribadi Anda</p>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-16 mb-6">
        <Card className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630910561339-4e22c7150093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBhdmF0YXJ8ZW58MXx8fHwxNzYwNTEwNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-rose-400 rounded-full flex items-center justify-center shadow-md">
                <Edit className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Budi Santoso</h3>
              <Badge variant="secondary" className="bg-rose-100 text-rose-700 mb-2">
                Premium Member
              </Badge>
              <p className="text-sm text-gray-500">Member sejak Januari 2024</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>budi.santoso@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>Bergabung 15 Jan 2024</span>
            </div>
          </div>

          <Button className="w-full mt-6 bg-rose-400 hover:bg-rose-500 gap-2">
            <Edit className="w-4 h-4" />
            Edit Profil
          </Button>
        </Card>
      </div>

      {/* Account Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-gray-900 mb-1">125</p>
            <p className="text-xs text-gray-500">Transaksi</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-gray-900 mb-1">12</p>
            <p className="text-xs text-gray-500">Kontak</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-gray-900 mb-1">1,250</p>
            <p className="text-xs text-gray-500">Poin</p>
          </Card>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6">
        <h3 className="text-gray-900 mb-4">Pengaturan Akun</h3>
        <div className="space-y-3">
          {profileMenuItems.map((item, index) => (
            <button
              key={index}
              className="w-full bg-white p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-rose-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Settings Button */}
      <div className="px-6 mt-6">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onNavigate('settings')}
        >
          Pengaturan Aplikasi
        </Button>
      </div>
    </div>
  );
}
