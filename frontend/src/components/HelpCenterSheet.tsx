import { HelpCircle, Search, ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ScrollArea } from './ui/scroll-area';

interface HelpCenterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpCenterSheet({ open, onOpenChange }: HelpCenterSheetProps) {
  const faqs = [
    {
      question: 'Bagaimana cara top up saldo?',
      answer: 'Anda dapat top up saldo melalui: 1) Transfer bank, 2) Virtual account, 3) Minimarket (Indomaret/Alfamart), atau 4) E-wallet lainnya. Pilih menu "Top Up" di beranda dan ikuti petunjuknya.',
    },
    {
      question: 'Apakah ada biaya transfer?',
      answer: 'Transfer sesama pengguna CelenKu GRATIS! Untuk transfer ke bank, biaya admin Rp 2.500 per transaksi.',
    },
    {
      question: 'Bagaimana cara mengubah PIN?',
      answer: 'Buka menu Pengaturan > Keamanan > Ubah PIN. Masukkan PIN lama Anda, lalu masukkan PIN baru sebanyak 2 kali untuk konfirmasi.',
    },
    {
      question: 'Berapa lama proses top up?',
      answer: 'Top up melalui transfer bank diproses otomatis dalam 5-10 menit. Top up melalui virtual account instant. Minimarket maksimal 1 jam.',
    },
    {
      question: 'Bagaimana jika transaksi gagal tapi saldo terpotong?',
      answer: 'Jangan khawatir! Dana akan otomatis dikembalikan dalam 1x24 jam. Jika lebih dari 24 jam, silakan hubungi customer service kami.',
    },
    {
      question: 'Apakah ada limit transaksi?',
      answer: 'Limit transaksi harian: Rp 20.000.000 untuk pengguna terverifikasi. Limit bulanan: Rp 100.000.000. Untuk menaikkan limit, lengkapi verifikasi identitas.',
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Pusat Bantuan
          </SheetTitle>
          <SheetDescription>
            Temukan jawaban untuk pertanyaan Anda
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Cari bantuan..."
                className="pl-10"
              />
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-gray-900 mb-3">Hubungi Kami</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-700">Chat</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-700">Telepon</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-700">Email</span>
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-gray-900 mb-3">Pertanyaan Umum (FAQ)</h3>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-gray-50 rounded-xl border-0 px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Info */}
            <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
              <h3 className="text-gray-900 mb-3">Informasi Kontak</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>021-1234-5678 (24/7)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>support@celenku.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 0812-3456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
