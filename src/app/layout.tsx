import "./globals.css";
import '../styles/animations.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import Header from "@/components/Header";
import ProfileButton from "./components/ProfileButton";
import { ClientCartProvider } from '@/components/ClientCart';
// import { ClientCartProvider } from '@/components/ClientCart';

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Store Fathon | ستور فاذون",
  description: "موقع خدمات متخصص لبيع المنتجات والخدمات للألعاب الاستراتيجية - Specialized services website for strategic games",
  keywords: "ستور فاذون, خدمات, موارد, قلاع, بوتات, Store Fathon, services, resources, castles, bots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // استخدام العربية كلغة افتراضية
  const locale = 'ar';
  
  // Set direction based on locale
  const isRTL = true;
  const dir = 'rtl';
  
  return (
    <html lang='ar' dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansArabic.variable} antialiased`}
      >
        <div className={`flex flex-col min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
          <Header locale={locale} />
          
          <main className="flex-grow">
            <ClientCartProvider>
              {children}
            </ClientCartProvider>
          </main>
          
          {/* زر الملف الشخصي العائم */}
          <ProfileButton />
        </div>
      </body>
    </html>
  );
}
