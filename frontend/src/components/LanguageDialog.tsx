import { Globe, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageDialog({ 
  open, 
  onOpenChange,
  currentLanguage,
  onLanguageChange
}: LanguageDialogProps) {
  const languages = [
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'th', name: 'ภาษาไทย', flag: '🇹🇭' },
  ];

  const handleSelectLanguage = (code: string) => {
    onLanguageChange(code);
    const language = languages.find(l => l.code === code);
    toast.success(`Bahasa diubah ke ${language?.name}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            Pilih Bahasa
          </DialogTitle>
          <DialogDescription>
            Pilih bahasa yang ingin Anda gunakan
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2 mt-4">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleSelectLanguage(language.code)}
              className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all hover:bg-gray-50 ${
                currentLanguage === language.code
                  ? 'border-rose-400 bg-rose-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{language.flag}</span>
                <span className="text-gray-900">{language.name}</span>
              </div>
              {currentLanguage === language.code && (
                <Check className="w-5 h-5 text-rose-500" />
              )}
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-blue-800">
            💡 Perubahan bahasa akan diterapkan ke seluruh aplikasi
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
