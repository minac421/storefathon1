import Image from "next/image";
import Link from "next/link";
import getTranslation from '@/lib/i18n';
import ChatSection from '@/components/chat/ChatSection';
import ClientButtonsLayout from '@/components/ClientButtonsLayout';

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
  },
  {
    id: 4,
    title: {
      ar: "معرض الصور",
      en: "Photo Gallery",
      tr: "Fotoğraf Galerisi"
    },
    image: "/images/gallery/WhatsApp Image 2025-05-29 at 5.49.54 PM.jpeg",
    url: "/gallery"
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

export default function Home() {
  // استخدام اللغة العربية فقط
  const locale = 'ar';
  const t = getTranslation(locale);
  const isRTL = true;
  
  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Banner - with conqueror hero image as full background */}
      <section className="relative h-[80vh] md:h-[85vh] flex items-center text-white overflow-hidden">
        {/* صورة الخلفية مع تحسين التوافق مع مختلف الأجهزة */}
        <div 
          className="absolute inset-0 w-full h-full z-0" 
          style={{
            backgroundImage: "url('/images/conqueror-hero.jpg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%", /* ضبط موضع الصورة للتركيز على الجزء الأهم في الصورة */
          }}
        >
          {/* طبقة خفيفة لتحسين قراءة النصوص على الأجهزة المختلفة */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20"></div>
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">امتلك القوة في عالم الفاتحون</h1>
            <p className="text-xl md:text-2xl mb-10 text-white drop-shadow-md">خدمات متكاملة للارتقاء بتجربتك في اللعبة</p>
            
            {/* أزرار الصفحة الرئيسية */}
            <div className="flex justify-center items-center flex-wrap">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/services`} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                استكشف خدماتنا
              </Link>
              <Link 
                href={`/castles`} 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                استعرض القلاع
              </Link>
              <Link 
                href={`/blog`} 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
              >
                شارك بطولاتك
              </Link>
              </div>
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
          
          <ChatSection locale="ar" />
          
          {/* زر آراء العملاء - تم نقله أسفل قسم الشات */}
          <div className="flex justify-center mt-12">
            <Link 
              href={`/gallery`} 
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl block"
            >
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-xl">
                <div className="bg-white dark:bg-black/80 backdrop-blur-sm rounded-xl px-8 py-4 text-black dark:text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">آراء العملاء</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-lg transition-all duration-500 group-hover:opacity-60"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* End of main content */}
      
      {/* Client-side buttons - Float buttons for chat and contact */}
      <ClientButtonsLayout />
    </div>
  );
} 