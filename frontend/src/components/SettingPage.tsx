import { 
  Bell, 
  Lock, 
  Globe, 
  Palette,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ChangePINDialog } from './ChangePINDialog';
import { LanguageDialog } from './LanguageDialog';
import { TwoFactorDialog } from './TwoFactorDialog';
import { HelpCenterSheet } from './HelpCenterSheet';
import { TermsSheet } from './TermsSheet';
import { PrivacySheet } from './PrivacySheet';
import { toast } from 'sonner@2.0.3';

interface SettingPageProps {
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
}

export function SettingPage({ darkMode, onDarkModeChange }: SettingPageProps) {
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [language, setLanguage] = useState('id');
  
  const [changePINOpen, setChangePINOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    toast.success(value ? 'Notifikasi diaktifkan' : 'Notifikasi dinonaktifkan');
  };

  const handleBiometricToggle = (value: boolean) => {
    setBiometric(value);
    toast.success(value ? 'Biometrik diaktifkan' : 'Biometrik dinonaktifkan');
  };

  const handleDarkModeToggle = (value: boolean) => {
    onDarkModeChange(value);
    toast.success(value ? 'Mode gelap diaktifkan' : 'Mode terang diaktifkan');
  };

  const handleLogout = () => {
    toast.success('Berhasil keluar dari akun');
    // In a real app, this would redirect to login
  };

  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      'id': 'Indonesia',
      'en': 'English',
      'ms': 'Melayu',
      'th': 'ไทย',
    };
    return languages[code] || 'Indonesia';
  };

  const settingSections = [
    {
      title: 'Preferensi',
      items: [
        { 
          icon: Bell, 
          label: 'Notifikasi', 
          description: 'Kelola notifikasi transaksi',
          hasSwitch: true,
          value: notifications,
          onChange: handleNotificationToggle
        },
        { 
          icon: darkMode ? Moon : Sun, 
          label: 'Mode Gelap', 
          description: 'Tema tampilan aplikasi',
          hasSwitch: true,
          value: darkMode,
          onChange: handleDarkModeToggle
        },
        { 
          icon: Globe, 
          label: 'Bahasa', 
          description: getLanguageName(language),
          hasArrow: true,
          onClick: () => setLanguageOpen(true)
        },
      ]
    },
    {
      title: 'Keamanan',
      items: [
        { 
          icon: Lock, 
          label: 'Ubah PIN', 
          description: 'Ganti PIN keamanan',
          hasArrow: true,
          onClick: () => setChangePINOpen(true)
        },
        { 
          icon: Shield, 
          label: 'Autentikasi Biometrik', 
          description: 'Fingerprint & Face ID',
          hasSwitch: true,
          value: biometric,
          onChange: handleBiometricToggle
        },
        { 
          icon: Shield, 
          label: 'Verifikasi 2 Langkah', 
          description: 'Keamanan tambahan',
          hasArrow: true,
          onClick: () => setTwoFactorOpen(true)
        },
      ]
    },
    {
      title: 'Dukungan',
      items: [
        { 
          icon: HelpCircle, 
          label: 'Pusat Bantuan', 
          description: 'FAQ dan panduan',
          hasArrow: true,
          onClick: () => setHelpCenterOpen(true)
        },
        { 
          icon: FileText, 
          label: 'Syarat & Ketentuan', 
          description: 'Kebijakan layanan',
          hasArrow: true,
          onClick: () => setTermsOpen(true)
        },
        { 
          icon: FileText, 
          label: 'Kebijakan Privasi', 
          description: 'Perlindungan data',
          hasArrow: true,
          onClick: () => setPrivacyOpen(true)
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-300 to-rose-400 px-6 pt-12 pb-8">
        <h2 className="text-white mb-2">Pengaturan</h2>
        <p className="text-rose-50">Atur preferensi aplikasi Anda</p>
      </div>

      {/* App Version */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-400 flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-900">CelenKu</p>
              <p className="text-sm text-gray-500">Versi 2.5.0</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className="text-gray-900 mb-3">{section.title}</h3>
            <div className="bg-white rounded-2xl divide-y">
              {section.items.map((item, itemIndex) => {
                const Element = item.hasSwitch ? 'div' : 'button';
                return (
                  <Element
                    key={itemIndex}
                    onClick={item.onClick}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    {item.hasSwitch && item.onChange && (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    )}
                    {item.hasArrow && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </Element>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-gray-900 mb-3">Tentang CelenKu</h3>
          <p className="text-sm text-gray-600 mb-4">
            CelenKu adalah aplikasi dompet digital yang memudahkan Anda untuk menabung 
            dan bertransaksi. Layaknya celengan, CelenKu membantu Anda mengatur keuangan 
            dengan lebih baik.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1">
              Rate Aplikasi
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Bagikan
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 mt-6 pb-6">
        <Separator className="mb-6" />
        <Button 
          variant="destructive" 
          className="w-full gap-2 bg-red-500 hover:bg-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Keluar dari Akun
        </Button>
      </div>

      {/* Dialogs and Sheets */}
      <ChangePINDialog open={changePINOpen} onOpenChange={setChangePINOpen} />
      <LanguageDialog 
        open={languageOpen} 
        onOpenChange={setLanguageOpen}
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
      <TwoFactorDialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen} />
      <HelpCenterSheet open={helpCenterOpen} onOpenChange={setHelpCenterOpen} />
      <TermsSheet open={termsOpen} onOpenChange={setTermsOpen} />
      <PrivacySheet open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </div>
  );
}
