import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClientCartProvider } from '@/components/ClientCart';

// تحديد اللغات المدعومة لتوليد الصفحات
export function generateStaticParams() {
  return [
    { locale: 'ar' },
    { locale: 'en' },
    { locale: 'tr' }
  ];
}

// Haciendo esta función asincrónica
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Usando params directamente sin destructuring para evitar el error
  const locale = params.locale || 'ar';
  const isRTL = locale === 'ar';
  
  return (
    <div className={`flex flex-col min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header locale={locale} />
      
      <main className="flex-grow">
        <ClientCartProvider>
          {children}
        </ClientCartProvider>
      </main>
      
      <Footer locale={locale} />
    </div>
  );
} 