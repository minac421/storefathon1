import Image from "next/image";
import Link from "next/link";
import getTranslation from '@/lib/i18n';
import ClientButtonsLayout from '@/components/ClientButtonsLayout';
import ClientChatWindow from '@/components/ClientChatWindow';

// Feature services
const featuredServices = [
  {
    id: 1,
    title: {
      ar: "موارد بكميات ضخمة",
      en: "Bulk Resources",
      tr: "Toplu Kaynaklar"
    },
    image: "/images/services/resources.jpg",
    url: "/services#resources"
  },
  {
    id: 2,
    title: {
      ar: "تطوير القلاع",
      en: "Castle Development",
      tr: "Kale Geliştirme"
    },
    image: "/images/services/castles.jpg",
    url: "/castles"
  },
  {
    id: 3,
    title: {
      ar: "بوتات اللعب التلقائي",
      en: "Gameplay Bots",
      tr: "Oyun Botları"
    },
    image: "/images/services/bots.jpg",
    url: "/bots"
  }
];

// Dummy data for testimonials
const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    avatar: "/images/testimonials/user1.jpg",
    content: "حصلت على موارد ضخمة وبسعر مناسب، وتحسنت قوة قلعتي بشكل كبير!",
    rating: 5,
  },
  {
    id: 2,
    name: "سارة خالد",
    avatar: "/images/testimonials/user2.jpg",
    content: "بوت جمع الموارد غير حياتي في اللعبة، أصبحت أملك وقت أكبر للتخطيط الاستراتيجي.",
    rating: 5,
  },
  {
    id: 3,
    name: "محمود عبدالله",
    avatar: "/images/testimonials/user3.jpg",
    content: "الموزعين محترفين جداً والخدمة سريعة، أنصح بهم بشدة لكل من يريد التقدم في اللعبة.",
    rating: 4,
  },
];

export default async function Home({ params }: { params: { locale: string } }) {
  // Get locale from URL params or use default
  // Using params.locale safely with async component
  const locale = params.locale || 'ar';
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  
  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Banner - Simple, bold hero section */}
      <section className="relative h-[80vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">امتلك القوة في عالم Store Fathon</h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300">خدمات متكاملة للارتقاء بتجربتك في اللعبة</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${locale}/services`} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                استكشف خدماتنا
              </Link>
              <Link 
                href={`/${locale}/castles`} 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all"
              >
                {locale === 'ar' ? 'استعرض القلاع' : locale === 'tr' ? 'Kaleleri Görüntüle' : 'View Castles'}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Chat Section - Interactive game chat */}
      <section id="chat-section" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">دردشة الفاتحون</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">تواصل مع لاعبين آخرين وشارك استراتيجياتك وأسرار اللعبة</p>
          </div>
          
          <ClientChatWindow locale={locale} />
        </div>
      </section>

      {/* End of main content */}

      {/* Client-side buttons - Float buttons for chat and contact */}
      <ClientButtonsLayout />
    </div>
  );
} 