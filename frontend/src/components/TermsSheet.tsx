import { FileText } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';

interface TermsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsSheet({ open, onOpenChange }: TermsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Syarat & Ketentuan
          </SheetTitle>
          <SheetDescription>
            Terakhir diperbarui: 15 Oktober 2025
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] p-6">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-gray-900 mb-2">1. Penerimaan Ketentuan</h3>
              <p className="text-gray-600 leading-relaxed">
                Dengan mengakses dan menggunakan aplikasi CelenKu, Anda setuju untuk terikat dengan syarat dan ketentuan ini. 
                Jika Anda tidak setuju dengan bagian manapun dari ketentuan ini, Anda tidak boleh menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">2. Pendaftaran Akun</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Untuk menggunakan layanan CelenKu, Anda harus:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Berusia minimal 17 tahun</li>
                <li>Memberikan informasi yang akurat dan lengkap</li>
                <li>Menjaga kerahasiaan kredensial akun Anda</li>
                <li>Bertanggung jawab atas semua aktivitas di akun Anda</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">3. Penggunaan Layanan</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Anda setuju untuk menggunakan layanan CelenKu hanya untuk tujuan yang sah dan sesuai dengan:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Peraturan perundang-undangan yang berlaku</li>
                <li>Kebijakan dan ketentuan CelenKu</li>
                <li>Norma-norma umum yang berlaku</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">4. Transaksi & Biaya</h3>
              <p className="text-gray-600 leading-relaxed">
                Semua transaksi yang dilakukan melalui CelenKu bersifat final dan tidak dapat dibatalkan kecuali 
                dalam kondisi tertentu yang diatur dalam kebijakan pengembalian dana. Biaya layanan akan dikenakan 
                sesuai dengan jenis transaksi yang dilakukan.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">5. Keamanan</h3>
              <p className="text-gray-600 leading-relaxed">
                Anda bertanggung jawab untuk menjaga keamanan PIN, password, dan informasi akun Anda. 
                CelenKu tidak akan pernah meminta PIN atau password Anda melalui telepon, email, atau SMS. 
                Laporkan segera jika Anda mencurigai adanya aktivitas tidak sah pada akun Anda.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">6. Batasan Tanggung Jawab</h3>
              <p className="text-gray-600 leading-relaxed">
                CelenKu tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial 
                yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">7. Penangguhan & Penutupan Akun</h3>
              <p className="text-gray-600 leading-relaxed">
                CelenKu berhak untuk menangguhkan atau menutup akun Anda jika ditemukan pelanggaran terhadap 
                syarat dan ketentuan ini, atau jika terdapat indikasi aktivitas yang mencurigakan atau ilegal.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">8. Perubahan Ketentuan</h3>
              <p className="text-gray-600 leading-relaxed">
                CelenKu berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan 
                melalui aplikasi atau email. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan Anda 
                terhadap ketentuan yang baru.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">9. Hukum yang Berlaku</h3>
              <p className="text-gray-600 leading-relaxed">
                Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">10. Hubungi Kami</h3>
              <p className="text-gray-600 leading-relaxed">
                Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di 
                support@celenku.com atau 021-1234-5678.
              </p>
            </section>

            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <p className="text-xs text-gray-500">
                Dengan melanjutkan penggunaan aplikasi CelenKu, Anda menyatakan bahwa telah membaca, 
                memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
