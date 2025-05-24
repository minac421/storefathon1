"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart';
import getTranslation from '@/lib/i18n';

// تعريف واجهة القلعة
interface Castle {
  id: number;
  name: string;
  description: string;
  level: number;
  strength: number;
  price: number;
  features: string[];
  icon: string;
  popular: boolean;
}

export default function CastlesPage({ params }: { params: { locale: string } }) {
  // الحصول على اللغة من المعلمات
  const locale = params?.locale || 'ar';
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  
  // الوصول إلى سلة التسوق
  const { addItem } = useCart();
  
  // حالة تصفية القلاع
  const [levelFilter, setLevelFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('level');
  const [castles, setCastles] = useState<Castle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // الترجمات
  const getLocalizedText = (key: string): string => {
    const translations: {[key: string]: {[key: string]: string}} = {
      'castles': {
        'ar': 'القلاع',
        'en': 'Castles',
        'tr': 'Kaleler'
      },
      'castlesSubtitle': {
        'ar': 'ابدأ رحلتك أو طور قلعتك مع أفضل القلاع المتاحة',
        'en': 'Start your journey or upgrade your castle with the best available castles',
        'tr': 'Mevcut en iyi kalelerle yolculuğunuza başlayın veya kalenizi yükseltin'
      },
      'level': {
        'ar': 'المستوى',
        'en': 'Level',
        'tr': 'Seviye'
      },
      'strength': {
        'ar': 'القوة',
        'en': 'Strength',
        'tr': 'Güç'
      },
      'features': {
        'ar': 'الميزات',
        'en': 'Features',
        'tr': 'Özellikler'
      },
      'price': {
        'ar': 'السعر',
        'en': 'Price',
        'tr': 'Fiyat'
      },
      'addToCart': {
        'ar': 'أضف إلى السلة',
        'en': 'Add to Cart',
        'tr': 'Sepete Ekle'
      },
      'popular': {
        'ar': 'شائع',
        'en': 'Popular',
        'tr': 'Popüler'
      },
      'allLevels': {
        'ar': 'جميع المستويات',
        'en': 'All Levels',
        'tr': 'Tüm Seviyeler'
      },
      'sortBy': {
        'ar': 'رتب حسب',
        'en': 'Sort by',
        'tr': 'Sırala'
      },
      'levelAsc': {
        'ar': 'المستوى: من الأدنى للأعلى',
        'en': 'Level: Low to High',
        'tr': 'Seviye: Düşükten Yükseğe'
      },
      'levelDesc': {
        'ar': 'المستوى: من الأعلى للأدنى',
        'en': 'Level: High to Low',
        'tr': 'Seviye: Yüksekten Düşüğe'
      },
      'priceAsc': {
        'ar': 'السعر: من الأدنى للأعلى',
        'en': 'Price: Low to High',
        'tr': 'Fiyat: Düşükten Yükseğe'
      },
      'priceDesc': {
        'ar': 'السعر: من الأعلى للأدنى',
        'en': 'Price: High to Low',
        'tr': 'Fiyat: Yüksekten Düşüğe'
      },
      'strengthAsc': {
        'ar': 'القوة: من الأدنى للأعلى',
        'en': 'Strength: Low to High',
        'tr': 'Güç: Düşükten Yükseğe'
      },
      'strengthDesc': {
        'ar': 'القوة: من الأعلى للأدنى',
        'en': 'Strength: High to Low',
        'tr': 'Güç: Yüksekten Düşüğe'
      },
      'currency': {
        'ar': 'USD',
        'en': 'USD',
        'tr': 'USD'
      },
      'filter': {
        'ar': 'تصفية',
        'en': 'Filter',
        'tr': 'Filtre'
      },
      'customizeCastle': {
        'ar': 'تخصيص القلعة',
        'en': 'Customize Castle',
        'tr': 'Kaleyi Özelleştir'
      }
    };
    
    return translations[key]?.[locale] || key;
  };
  
  // قائمة القلاع مع الترجمات
  const getCastleName = (id: number): string => {
    switch(id) {
      case 1: return locale === 'ar' ? 'قلعة المبتدئين' : locale === 'tr' ? 'Başlangıç Kalesi' : 'Beginner Castle';
      case 2: return locale === 'ar' ? 'قلعة المحارب' : locale === 'tr' ? 'Savaşçı Kalesi' : 'Warrior Castle';
      case 3: return locale === 'ar' ? 'قلعة الفارس' : locale === 'tr' ? 'Şövalye Kalesi' : 'Knight Castle';
      case 4: return locale === 'ar' ? 'قلعة الملك' : locale === 'tr' ? 'Kral Kalesi' : 'King Castle';
      case 5: return locale === 'ar' ? 'قلعة الإمبراطور' : locale === 'tr' ? 'İmparator Kalesi' : 'Emperor Castle';
      case 6: return locale === 'ar' ? 'قلعة الأساطير' : locale === 'tr' ? 'Efsaneler Kalesi' : 'Legendary Castle';
      default: return '';
    }
  };
  
  const getCastleDescription = (id: number): string => {
    switch(id) {
      case 1: return locale === 'ar' ? 'قلعة بسيطة للمبتدئين، توفر موارد وحماية أساسية.' : 
                    locale === 'tr' ? 'Yeni başlayanlar için basit bir kale, temel kaynaklar ve koruma sağlar.' : 
                    'A simple castle for beginners, providing basic resources and protection.';
      case 2: return locale === 'ar' ? 'قلعة متوسطة المستوى تدعم تدريب القوات المقاتلة.' : 
                    locale === 'tr' ? 'Savaşçı birliklerinin eğitimini destekleyen orta seviye bir kale.' : 
                    'A mid-level castle supporting the training of warrior troops.';
      case 3: return locale === 'ar' ? 'قلعة متقدمة للفرسان، تدعم إنتاج الأسلحة المتطورة.' : 
                    locale === 'tr' ? 'Gelişmiş silah üretimini destekleyen şövalyeler için gelişmiş bir kale.' : 
                    'An advanced castle for knights, supporting production of advanced weapons.';
      case 4: return locale === 'ar' ? 'قلعة ملكية قوية، تحتوي على نظام دفاعي متطور.' : 
                    locale === 'tr' ? 'Gelişmiş savunma sistemine sahip güçlü bir kraliyet kalesi.' : 
                    'A powerful royal castle with an advanced defense system.';
      case 5: return locale === 'ar' ? 'قلعة الإمبراطور، تدعم إدارة إمبراطورية كاملة.' : 
                    locale === 'tr' ? 'Tam bir imparatorluğun yönetimini destekleyen İmparator Kalesi.' : 
                    'The Emperor\'s Castle, supporting the management of an entire empire.';
      case 6: return locale === 'ar' ? 'قلعة أسطورية نادرة، تمنح قوى خاصة وميزات حصرية.' : 
                    locale === 'tr' ? 'Özel güçler ve özel özellikler sunan nadir ve efsanevi bir kale.' : 
                    'A rare legendary castle, granting special powers and exclusive features.';
      default: return '';
    }
  };
  
  const getCastleFeatures = (id: number): string[] => {
    switch(id) {
      case 1: return [
        locale === 'ar' ? 'موارد أساسية' : locale === 'tr' ? 'Temel kaynaklar' : 'Basic resources',
        locale === 'ar' ? 'نظام دفاع بدائي' : locale === 'tr' ? 'İlkel savunma sistemi' : 'Primitive defense system',
        locale === 'ar' ? 'قوات بسيطة' : locale === 'tr' ? 'Basit birlikler' : 'Simple troops'
      ];
      case 2: return [
        locale === 'ar' ? 'موارد محسنة' : locale === 'tr' ? 'Geliştirilmiş kaynaklar' : 'Enhanced resources',
        locale === 'ar' ? 'نظام دفاع متطور' : locale === 'tr' ? 'Gelişmiş savunma sistemi' : 'Advanced defense system',
        locale === 'ar' ? 'قوات مقاتلة' : locale === 'tr' ? 'Savaşçı birlikleri' : 'Warrior troops',
        locale === 'ar' ? 'منطقة تدريب' : locale === 'tr' ? 'Eğitim alanı' : 'Training grounds'
      ];
      case 3: return [
        locale === 'ar' ? 'موارد وفيرة' : locale === 'tr' ? 'Bol kaynaklar' : 'Abundant resources',
        locale === 'ar' ? 'نظام دفاع متقدم' : locale === 'tr' ? 'İleri savunma sistemi' : 'Advanced defense system',
        locale === 'ar' ? 'قوات الفرسان' : locale === 'tr' ? 'Şövalye birlikleri' : 'Knight troops',
        locale === 'ar' ? 'ورشة أسلحة' : locale === 'tr' ? 'Silah atölyesi' : 'Weapons workshop',
        locale === 'ar' ? 'برج مراقبة' : locale === 'tr' ? 'Gözetleme kulesi' : 'Watchtower'
      ];
      case 4: return [
        locale === 'ar' ? 'موارد غنية' : locale === 'tr' ? 'Zengin kaynaklar' : 'Rich resources',
        locale === 'ar' ? 'نظام دفاع ملكي' : locale === 'tr' ? 'Kraliyet savunma sistemi' : 'Royal defense system',
        locale === 'ar' ? 'قوات النخبة' : locale === 'tr' ? 'Seçkin birlikler' : 'Elite troops',
        locale === 'ar' ? 'غرفة العرش' : locale === 'tr' ? 'Taht odası' : 'Throne room',
        locale === 'ar' ? 'مستودع ضخم' : locale === 'tr' ? 'Büyük depo' : 'Massive storehouse',
        locale === 'ar' ? 'أسوار عالية' : locale === 'tr' ? 'Yüksek duvarlar' : 'Tall walls'
      ];
      case 5: return [
        locale === 'ar' ? 'موارد هائلة' : locale === 'tr' ? 'Muazzam kaynaklar' : 'Massive resources',
        locale === 'ar' ? 'تحصينات لا تخترق' : locale === 'tr' ? 'Aşılmaz tahkimatlar' : 'Impenetrable fortifications',
        locale === 'ar' ? 'قوات إمبراطورية' : locale === 'tr' ? 'İmparatorluk birlikleri' : 'Imperial forces',
        locale === 'ar' ? 'دفاعات متطورة للغاية' : locale === 'tr' ? 'Son derece gelişmiş savunmalar' : 'Highly advanced defenses',
        locale === 'ar' ? 'تقنيات حرب متفوقة' : locale === 'tr' ? 'Üstün savaş teknolojileri' : 'Superior warfare technologies',
        locale === 'ar' ? 'مباني فريدة' : locale === 'tr' ? 'Benzersiz binalar' : 'Unique buildings',
        locale === 'ar' ? 'نظام اقتصادي متكامل' : locale === 'tr' ? 'Entegre ekonomik sistem' : 'Integrated economic system'
      ];
      case 6: return [
        locale === 'ar' ? 'موارد لا حصر لها' : locale === 'tr' ? 'Sınırsız kaynaklar' : 'Unlimited resources',
        locale === 'ar' ? 'تحصينات أسطورية' : locale === 'tr' ? 'Efsanevi tahkimatlar' : 'Legendary fortifications',
        locale === 'ar' ? 'قوات خاصة نادرة' : locale === 'tr' ? 'Nadir özel birlikler' : 'Rare special forces',
        locale === 'ar' ? 'نظام دفاع لا يُقهر' : locale === 'tr' ? 'Yenilmez savunma sistemi' : 'Invincible defense system',
        locale === 'ar' ? 'تقنيات حرب غير مسبوقة' : locale === 'tr' ? 'Eşi görülmemiş savaş teknolojileri' : 'Unprecedented warfare technologies',
        locale === 'ar' ? 'مباني أسطورية نادرة' : locale === 'tr' ? 'Nadir efsanevi binalar' : 'Rare legendary buildings',
        locale === 'ar' ? 'نظام اقتصادي متطور للغاية' : locale === 'tr' ? 'Son derece gelişmiş ekonomik sistem' : 'Highly advanced economic system',
        locale === 'ar' ? 'قدرات خاصة حصرية' : locale === 'tr' ? 'Özel yetenekler' : 'Exclusive special abilities'
      ];
      default: return [];
    }
  };
  
  // تحميل القلاع من API
  const loadCastles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/castles');
      
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // تسجيل البيانات التي تأتي من API لمعرفة المشكلة
      console.log('API response data:', data);
      console.log('Castles from API:', data.castles);
      
      if (data && data.castles && Array.isArray(data.castles)) {
        // استخدام بيانات القلاع من API مباشرة دون أي ترجمات
        const formattedCastles = data.castles.map((castle: any) => ({
          id: parseInt(castle.id) || Math.random() * 1000,
          name: castle.name,
          description: castle.description,
          level: castle.level,
          strength: castle.strength,
          price: castle.price,
          features: Array.isArray(castle.features) ? castle.features : [],
          icon: castle.icon || '🏰',
          popular: castle.popular || false
        }));
        setCastles(formattedCastles);
      } else {
        // إذا لم تكن هناك قلاع، استخدم مصفوفة فارغة
        setCastles([]);
      }
    } catch (error) {
      console.error('Error loading castles:', error);
      setError('Failed to load castles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // تحميل القلاع عند تحميل الصفحة
  useEffect(() => {
    loadCastles();
  }, []);
  
  // إضافة القلعة إلى السلة
  const handleAddToCart = (castle: Castle) => {
    addItem({
      id: castle.id.toString(),
      name: castle.name,
      price: castle.price,
      category: 'castle',
      icon: castle.icon
    });
  };
  
  // تصفية وترتيب القلاع
  const filteredCastles = castles
    .filter(castle => levelFilter === null || castle.level === levelFilter)
    .sort((a, b) => {
      switch(sortBy) {
        case 'level': return a.level - b.level;
        case 'level-desc': return b.level - a.level;
        case 'price': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'strength': return a.strength - b.strength;
        case 'strength-desc': return b.strength - a.strength;
        default: return a.level - b.level;
      }
    });
  
  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-stone-900 to-stone-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getLocalizedText('castles')}
            </h1>
            <p className="text-xl">
              {getLocalizedText('castlesSubtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between gap-4">
            <div>
              <label className="text-gray-700 mr-2 font-medium">{getLocalizedText('filter')}:</label>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={levelFilter === null ? 'all' : levelFilter}
                onChange={(e) => setLevelFilter(e.target.value === 'all' ? null : Number(e.target.value))}
              >
                <option value="all">{getLocalizedText('allLevels')}</option>
                <option value="5">{getLocalizedText('level')} 5</option>
                <option value="10">{getLocalizedText('level')} 10</option>
                <option value="15">{getLocalizedText('level')} 15</option>
                <option value="20">{getLocalizedText('level')} 20</option>
                <option value="25">{getLocalizedText('level')} 25</option>
                <option value="30">{getLocalizedText('level')} 30</option>
                <option value="35">{getLocalizedText('level')} 35</option>
              </select>
            </div>
            
            <div>
              <label className="text-gray-700 mr-2 font-medium">{getLocalizedText('sortBy')}:</label>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="level">{getLocalizedText('levelAsc')}</option>
                <option value="level-desc">{getLocalizedText('levelDesc')}</option>
                <option value="price">{getLocalizedText('priceAsc')}</option>
                <option value="price-desc">{getLocalizedText('priceDesc')}</option>
                <option value="strength">{getLocalizedText('strengthAsc')}</option>
                <option value="strength-desc">{getLocalizedText('strengthDesc')}</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Castles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>{locale === 'ar' ? 'جارِ التحميل...' : locale === 'tr' ? 'Yükleniyor...' : 'Loading...'}</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
            </div>
          ) : filteredCastles.length === 0 ? (
            <div className="text-center py-8">
              <p>{locale === 'ar' ? 'لا توجد قلاع متاحة بهذه المواصفات' : locale === 'tr' ? 'Bu özelliklere sahip kale bulunamadı' : 'No castles available with these specifications'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCastles.map((castle) => (
                <div 
                  key={castle.id} 
                  className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                    castle.popular ? 'ring-2 ring-amber-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="text-4xl mb-2 mr-3">{castle.icon}</div>
                        <h3 className="text-xl font-bold">{castle.name}</h3>
                      </div>
                      
                      {castle.popular && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">
                          {getLocalizedText('popular')}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">{castle.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm text-gray-500">{getLocalizedText('level')}</div>
                        <div className="font-bold">{castle.level}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-sm text-gray-500">{getLocalizedText('strength')}</div>
                        <div className="font-bold">{castle.strength.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">{getLocalizedText('features')}</h4>
                      <ul className="space-y-1 text-sm">
                        {castle.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-amber-500 mr-1">✓</span> {feature}
                          </li>
                        ))}
                        {castle.features.length > 3 && (
                          <li className="text-amber-600">+{castle.features.length - 3} {locale === 'ar' ? 'ميزات أخرى' : locale === 'tr' ? 'daha fazla özellik' : 'more features'}</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-2xl font-bold">${castle.price}</span>
                      <button 
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                        onClick={() => handleAddToCart(castle)}
                      >
                        {getLocalizedText('addToCart')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'ar' ? 'ترغب في تخصيص قلعتك؟' : locale === 'tr' ? 'Kalenizi özelleştirmek ister misiniz?' : 'Want to customize your castle?'}
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'ar' ? 'يمكننا تصميم قلعة مخصصة تلبي احتياجاتك تماماً بمواصفات فريدة' : locale === 'tr' ? 'İhtiyaçlarınızı tam olarak karşılayacak benzersiz özelliklere sahip özel bir kale tasarlayabiliriz' : 'We can design a custom castle with unique specifications to perfectly meet your needs'}
            </p>
            <Link 
              href={`/${locale}/custom-order`}
              className="px-6 py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-lg inline-block"
            >
              {getLocalizedText('customizeCastle')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}