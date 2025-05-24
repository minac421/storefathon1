"use client";

import React, { useState, useEffect } from 'react';
import ServiceCartButton from '@/components/cart/ServiceCartButton';
import ServiceCartDropdown from '@/components/cart/ServiceCartDropdown';

// نوع لعناصر السلة
type CartItem = {
  id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number;
};

// بيانات الخدمات
const services = {
  resources: [
    { id: 'wood', name: { ar: 'الخشب', en: 'Wood', tr: 'Ahşap' }, price: 150, icon: '🌲' },
    { id: 'iron', name: { ar: 'الحديد', en: 'Iron', tr: 'Demir' }, price: 200, icon: '⛏️' },
    { id: 'wheat', name: { ar: 'القمح', en: 'Wheat', tr: 'Buğday' }, price: 100, icon: '🌾' },
    { id: 'gold', name: { ar: 'الذهب', en: 'Gold', tr: 'Altın' }, price: 300, icon: '🏅' },
    { id: 'stone', name: { ar: 'الحجر', en: 'Stone', tr: 'Taş' }, price: 180, icon: '🪨' },
    { id: 'silver', name: { ar: 'الفضة', en: 'Silver', tr: 'Gümüş' }, price: 250, icon: '🔷' },
  ],
  castle: [
    { id: 'castle1', name: { ar: 'قلعة صغيرة', en: 'Small Castle', tr: 'Küçük Kale' }, price: 500, icon: '🏰' },
    { id: 'castle2', name: { ar: 'قلعة متوسطة', en: 'Medium Castle', tr: 'Orta Kale' }, price: 1000, icon: '🏯' },
    { id: 'castle3', name: { ar: 'قلعة كبيرة', en: 'Large Castle', tr: 'Büyük Kale' }, price: 1500, icon: '🏛️' },
  ],
  bots: [
    { id: 'bot1', name: { ar: 'بوت المزارع', en: 'Farmer Bot', tr: 'Çiftçi Bot' }, price: 300, icon: '🤖' },
    { id: 'bot2', name: { ar: 'بوت المحارب', en: 'Warrior Bot', tr: 'Savaşçı Bot' }, price: 450, icon: '👾' },
    { id: 'bot3', name: { ar: 'بوت التاجر', en: 'Trader Bot', tr: 'Tüccar Bot' }, price: 400, icon: '🎮' },
  ],
  events: [
    {
      id: 'starter',
      name: { ar: 'حزمة المبتدئ', en: 'Starter Package', tr: 'Başlangıç Paketi' },
      description: {
        ar: 'مثالية للاعبين الجدد، تتضمن موارد أساسية للبدء',
        en: 'Perfect for new players, includes basic resources to get started',
        tr: 'Yeni oyuncular için mükemmel, başlamak için temel kaynaklar içerir'
      },
      price: 499,
      icon: '🎁'
    },
    {
      id: 'premium',
      name: { ar: 'حزمة بريميوم', en: 'Premium Package', tr: 'Premium Paket' },
      description: {
        ar: 'تضم مجموعة متنوعة من الموارد والمزايا للاعبين المتقدمين',
        en: 'Includes a diverse set of resources and perks for advanced players',
        tr: 'Gelişmiş oyuncular için çeşitli kaynaklar ve avantajlar içerir'
      },
      price: 999,
      icon: '💎'
    },
    {
      id: 'ultimate',
      name: { ar: 'الحزمة النهائية', en: 'Ultimate Package', tr: 'Ultimate Paket' },
      description: {
        ar: 'كل ما تحتاجه لتصبح قوة لا يستهان بها في اللعبة',
        en: 'Everything you need to become a formidable power in the game',
        tr: 'Oyunda korkunç bir güç olmak için ihtiyacınız olan her şey'
      },
      price: 1499,
      icon: '👑'
    }
  ]
};

export default function ServicesPage() {
  const locale = 'ar'; // افتراضي للعربية
  const isRTL = locale === 'ar'; // للعربية دائمًا RTL
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});
  
  // حالة سلة التسوق
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  
  // حالة الفئة النشطة
  const [activeCategory, setActiveCategory] = useState<'resources' | 'bots' | 'castle' | 'events'>('resources');
  
  // تحميل عناصر السلة من التخزين المحلي عند التحميل الأولي
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
          updateTotalItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart data:', error);
        }
      }
    }
  }, []);
  
  // تحديث عدد العناصر في السلة
  const updateTotalItems = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  };
  
  // حفظ السلة في التخزين المحلي
  const saveCartToLocalStorage = (items: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };
  
  // تبديل فتح/إغلاق السلة
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  // إضافة منتج للسلة
  const handleAddToCart = (item: any, category: 'resources' | 'bots' | 'castle' | 'events') => {
    // تعليم المنتج كمضاف للسلة
    setAddedItems(prev => ({
      ...prev,
      [`${category}-${item.id}`]: true
    }));
    
    // إضافة المنتج للسلة
    const itemName = item.name[locale as keyof typeof item.name];
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.id === item.id && cartItem.category === category
    );
    
    let updatedCart;
    
    if (existingItemIndex !== -1) {
      // المنتج موجود بالفعل
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // منتج جديد
      updatedCart = [
        ...cartItems,
        {
          id: item.id,
          name: itemName,
          price: item.price,
          icon: item.icon,
          category,
          quantity: 1
        }
      ];
    }
    
    setCartItems(updatedCart);
    updateTotalItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    
    // إزالة علامة المضاف بعد ثانيتين
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [`${category}-${item.id}`]: false
      }));
    }, 2000);
  };
  
  // إزالة منتج من السلة
  const removeFromCart = (itemId: string, category: string) => {
    const updatedCart = cartItems.filter(
      item => !(item.id === itemId && item.category === category)
    );
    setCartItems(updatedCart);
    updateTotalItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };
  
  // الانتقال إلى إتمام الشراء
  const goToCheckout = () => {
    // في المستقبل يمكن إضافة عملية إتمام الشراء
    setIsCartOpen(false);
    console.log('Going to checkout with items:', cartItems);
  };

  // ترجمات صفحة الخدمات
  const translations = {
    pageTitle: {
      ar: 'الخدمات',
      en: 'Services',
      tr: 'Hizmetler'
    },
    resourcesTitle: {
      ar: 'الموارد',
      en: 'Resources',
      tr: 'Kaynaklar'
    },
    resourcesSubtitle: {
      ar: 'اختر من مجموعتنا الواسعة من الموارد لتعزيز مملكتك',
      en: 'Choose from our wide range of resources to enhance your kingdom',
      tr: 'Krallığınızı geliştirmek için geniş kaynak yelpazemizden seçim yapın'
    },
    castleTitle: {
      ar: 'القلاع',
      en: 'Castles',
      tr: 'Kaleler'
    },
    castleSubtitle: {
      ar: 'قم بشراء قلاع جاهزة للاستخدام مباشرة',
      en: 'Purchase ready-to-use castles directly',
      tr: 'Doğrudan kullanıma hazır kaleler satın alın'
    },
    botsTitle: {
      ar: 'الروبوتات',
      en: 'Bots',
      tr: 'Botlar'
    },
    botsSubtitle: {
      ar: 'تمتع بالمساعدة الآلية مع روبوتات متخصصة',
      en: 'Enjoy automated assistance with specialized bots',
      tr: 'Özel botlarla otomatik yardımın keyfini çıkarın'
    },
    eventsTitle: {
      ar: 'الأحداث',
      en: 'Events',
      tr: 'Etkinlikler'
    },
    eventsSubtitle: {
      ar: 'احصل على قيمة أكبر مع حزمنا المخصصة للأحداث',
      en: 'Get more value with our event packages',
      tr: 'Etkinlik paketlerimizle daha fazla değer elde edin'
    },
    price: {
      ar: 'السعر',
      en: 'Price',
      tr: 'Fiyat'
    },
    currency: {
      ar: 'دولار',
      en: 'USD',
      tr: 'USD'
    },
    orderNow: {
      ar: 'اطلب الآن',
      en: 'Order Now',
      tr: 'Şimdi Sipariş Ver'
    },
    added: {
      ar: 'تمت الإضافة',
      en: 'Added',
      tr: 'Eklendi'
    },
    cart: {
      ar: 'سلة التسوق',
      en: 'Cart',
      tr: 'Sepet'
    },
    emptyCart: {
      ar: 'السلة فارغة',
      en: 'Your cart is empty',
      tr: 'Sepetiniz boş'
    },
    total: {
      ar: 'المجموع',
      en: 'Total',
      tr: 'Toplam'
    },
    checkout: {
      ar: 'إتمام الشراء',
      en: 'Checkout',
      tr: 'Ödeme'
    },
    popular: {
      ar: 'شائع',
      en: 'Popular',
      tr: 'Popüler'
    }
  };
  
  // عنصر عرض المنتج
  const ProductCard = ({ item, category }: { item: any, category: 'resources' | 'bots' | 'castle' | 'events' }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1 border border-gray-100 relative pb-16">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl">
              {item.icon}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-center mb-4">
            {item.name[locale as keyof typeof item.name]}
          </h3>
          
          {item.description && (
            <p className="text-gray-600 text-center mb-6 h-16">
              {item.description[locale as keyof typeof item.description]}
            </p>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              {translations.price[locale as keyof typeof translations.price]}:
            </div>
            <div className="text-amber-600 font-bold text-xl">
              {item.price} {translations.currency[locale as keyof typeof translations.currency]}
            </div>
          </div>
          
          <button
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors absolute bottom-4 left-6 right-6 ${
              addedItems[`${category}-${item.id}`] 
                ? 'bg-green-600 text-white' 
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
            onClick={() => handleAddToCart(item, category)}
          >
            {addedItems[`${category}-${item.id}`] 
              ? translations.added[locale as keyof typeof translations.added]
              : translations.orderNow[locale as keyof typeof translations.orderNow]
            }
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'} min-h-screen bg-gray-50`}>
      {/* عرض سلة التسوق */}
      <ServiceCartButton 
        totalItems={totalItems} 
        toggleCart={toggleCart} 
      />
      
      <ServiceCartDropdown 
        isOpen={isCartOpen}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        toggleCart={toggleCart}
        goToCheckout={goToCheckout}
        locale={locale}
        translations={translations}
      />
      
      {/* قسم الهيدر مع خلفية */}
      <div className="w-full bg-gradient-to-r from-amber-700 to-yellow-600 py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          كل ما تحتاجه للتفوق في عالم الفاتحون
        </h1>
        
        {/* أزرار التنقل بين الفئات */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
          <button
            onClick={() => setActiveCategory('resources')}
            className={`px-8 py-3 rounded-full flex items-center gap-2 text-lg transition-all transform hover:scale-105 ${activeCategory === 'resources' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-amber-600 text-white opacity-90 hover:opacity-100'}`}
          >
            <span className="text-xl">🏆</span>
            <span>الموارد</span>
          </button>
          
          <button
            onClick={() => setActiveCategory('events')}
            className={`px-8 py-3 rounded-full flex items-center gap-2 text-lg transition-all transform hover:scale-105 ${activeCategory === 'events' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-amber-600 text-white opacity-90 hover:opacity-100'}`}
          >
            <span className="text-xl">🎮</span>
            <span>الأحداث</span>
          </button>
          
          <button
            onClick={() => setActiveCategory('bots')}
            className={`px-8 py-3 rounded-full flex items-center gap-2 text-lg transition-all transform hover:scale-105 ${activeCategory === 'bots' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-amber-600 text-white opacity-90 hover:opacity-100'}`}
          >
            <span className="text-xl">🤖</span>
            <span>الروبوتات</span>
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* عرض المنتجات حسب الفئة النشطة */}
        {activeCategory === 'resources' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.resourcesTitle[locale as keyof typeof translations.resourcesTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.resourcesSubtitle[locale as keyof typeof translations.resourcesSubtitle]}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.resources.map(item => (
                <ProductCard key={item.id} item={item} category="resources" />
              ))}
            </div>
          </div>
        )}
        
        {activeCategory === 'castle' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.castleTitle[locale as keyof typeof translations.castleTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.castleSubtitle[locale as keyof typeof translations.castleSubtitle]}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.castle.map(item => (
                <ProductCard key={item.id} item={item} category="castle" />
              ))}
            </div>
          </div>
        )}
        
        {activeCategory === 'bots' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.botsTitle[locale as keyof typeof translations.botsTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.botsSubtitle[locale as keyof typeof translations.botsSubtitle]}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.bots.map(item => (
                <ProductCard key={item.id} item={item} category="bots" />
              ))}
            </div>
          </div>
        )}
        
        {activeCategory === 'events' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.eventsTitle[locale as keyof typeof translations.eventsTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.eventsSubtitle[locale as keyof typeof translations.eventsSubtitle]}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.events.map((item, index) => (
                <div key={item.id} 
                  className={`${index === 1 ? 'relative' : ''}`}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-0 right-0 bg-amber-500 text-white text-center py-1 rounded-t-lg z-10">
                      {translations.popular[locale as keyof typeof translations.popular]}
                    </div>
                  )}
                  <ProductCard item={item} category="events" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
