import { Shield } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';

interface PrivacySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacySheet({ open, onOpenChange }: PrivacySheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Kebijakan Privasi
          </SheetTitle>
          <SheetDescription>
            Terakhir diperbarui: 15 Oktober 2025
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] p-6">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="text-gray-900 mb-2">1. Informasi yang Kami Kumpulkan</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                CelenKu mengumpulkan berbagai jenis informasi untuk menyediakan dan meningkatkan layanan kami:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Informasi pribadi (nama, email, nomor telepon, alamat)</li>
                <li>Informasi identifikasi (KTP, foto selfie untuk verifikasi)</li>
                <li>Informasi transaksi dan riwayat pembayaran</li>
                <li>Informasi perangkat dan log aktivitas</li>
                <li>Informasi lokasi (dengan izin Anda)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">2. Penggunaan Informasi</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Menyediakan, mengoperasikan, dan memelihara layanan</li>
                <li>Memproses transaksi dan mengirimkan notifikasi</li>
                <li>Mencegah penipuan dan aktivitas ilegal</li>
                <li>Meningkatkan pengalaman pengguna</li>
                <li>Mengirimkan informasi penting dan promosi</li>
                <li>Mematuhi kewajiban hukum</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">3. Keamanan Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi informasi pribadi Anda, termasuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2 mt-2">
                <li>Enkripsi data end-to-end untuk semua transaksi</li>
                <li>Autentikasi multi-faktor</li>
                <li>Monitoring keamanan 24/7</li>
                <li>Akses terbatas pada informasi sensitif</li>
                <li>Regular security audits</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">4. Berbagi Informasi</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Kami tidak menjual informasi pribadi Anda. Kami hanya membagikan informasi dalam kondisi berikut:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Dengan persetujuan eksplisit Anda</li>
                <li>Dengan penyedia layanan pihak ketiga yang terpercaya</li>
                <li>Untuk mematuhi kewajiban hukum</li>
                <li>Untuk melindungi hak dan keamanan kami</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">5. Hak Anda</h3>
              <p className="text-gray-600 leading-relaxed mb-2">
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Mengakses data pribadi Anda</li>
                <li>Meminta koreksi data yang tidak akurat</li>
                <li>Meminta penghapusan data (dengan ketentuan tertentu)</li>
                <li>Menolak atau membatasi pemrosesan data</li>
                <li>Menarik persetujuan kapan saja</li>
              </ul>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">6. Cookies dan Teknologi Pelacakan</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda, menganalisis 
                penggunaan layanan, dan menyesuaikan konten. Anda dapat mengatur preferensi cookies melalui 
                pengaturan perangkat Anda.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">7. Retensi Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami menyimpan informasi pribadi Anda selama akun Anda aktif dan untuk jangka waktu yang 
                diperlukan untuk mematuhi kewajiban hukum, menyelesaikan sengketa, dan menegakkan perjanjian kami.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">8. Transfer Data Internasional</h3>
              <p className="text-gray-600 leading-relaxed">
                Data Anda dapat diproses di server yang berlokasi di Indonesia dan negara lain. 
                Kami memastikan perlindungan yang memadai sesuai dengan hukum perlindungan data yang berlaku.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">9. Privasi Anak-anak</h3>
              <p className="text-gray-600 leading-relaxed">
                Layanan kami tidak ditujukan untuk anak-anak di bawah 17 tahun. Kami tidak dengan sengaja 
                mengumpulkan informasi pribadi dari anak-anak.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">10. Perubahan Kebijakan</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan material akan 
                diberitahukan melalui aplikasi atau email. Tanggal "Terakhir diperbarui" di bagian atas 
                menunjukkan kapan kebijakan ini terakhir direvisi.
              </p>
            </section>

            <section>
              <h3 className="text-gray-900 mb-2">11. Hubungi Kami</h3>
              <p className="text-gray-600 leading-relaxed">
                Untuk pertanyaan tentang kebijakan privasi ini atau praktik privasi kami, silakan hubungi:
              </p>
              <div className="mt-2 space-y-1 text-gray-600">
                <p>Email: privacy@celenku.com</p>
                <p>Telepon: 021-1234-5678</p>
                <p>Alamat: Jl. Sudirman No. 123, Jakarta 12190</p>
              </div>
            </section>

            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <p className="text-xs text-gray-600">
                🔒 <strong>Komitmen Kami:</strong> CelenKu berkomitmen untuk melindungi privasi Anda dan 
                menangani data pribadi Anda dengan aman sesuai dengan peraturan perlindungan data yang berlaku 
                di Indonesia.
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
