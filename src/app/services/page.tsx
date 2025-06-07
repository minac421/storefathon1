"use client";

import React, { useState, useEffect } from 'react';
import ServiceCartButton from '@/components/cart/ServiceCartButton';
import ServiceCartDropdown from '@/components/cart/ServiceCartDropdown';
import ProductDetailsModal from '@/components/modals/ProductDetailsModal';
import PlaceholderImage from '@/components/common/PlaceholderImage';

// نوع لعناصر السلة
type CartItem = {
  id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number;
};

// استيراد البيانات من API
type ServicesData = {
  resources: any[];
  castle: any[];
  bots: any[];
  events: any[];
  charging: any[];
};

// حالة البيانات الافتراضية لعرضها أثناء التحميل
const defaultServices: ServicesData = {
  resources: [],
  castle: [],
  bots: [],
  events: [],
  charging: [
    {
      id: 'charging-gems-100',
      name: {
        ar: '100 جوهرة',
        en: '100 Gems',
        tr: '100 Mücevher'
      },
      description: {
        ar: 'اشحن حسابك بـ 100 جوهرة للاستمتاع بمزايا إضافية في اللعبة',
        en: 'Charge your account with 100 gems to enjoy additional in-game benefits',
        tr: 'Oyun içi ek avantajların keyfini çıkarmak için hesabınıza 100 mücevher yükleyin'
      },
      price: 10,
      iconAlt: '100 جوهرة',
      popular: false
    },
    {
      id: 'charging-gems-500',
      name: {
        ar: '500 جوهرة',
        en: '500 Gems',
        tr: '500 Mücevher'
      },
      description: {
        ar: 'اشحن حسابك بـ 500 جوهرة مع خصم 10% على السعر الأصلي',
        en: 'Charge your account with 500 gems with a 10% discount on the original price',
        tr: 'Hesabınıza orijinal fiyat üzerinden %10 indirimle 500 mücevher yükleyin'
      },
      price: 45,
      iconAlt: '500 جوهرة',
      popular: true
    },
    {
      id: 'charging-gems-1000',
      name: {
        ar: '1000 جوهرة',
        en: '1000 Gems',
        tr: '1000 Mücevher'
      },
      description: {
        ar: 'اشحن حسابك بـ 1000 جوهرة مع خصم 15% على السعر الأصلي',
        en: 'Charge your account with 1000 gems with a 15% discount on the original price',
        tr: 'Hesabınıza orijinal fiyat üzerinden %15 indirimle 1000 mücevher yükleyin'
      },
      price: 85,
      iconAlt: '1000 جوهرة',
      popular: false
    },
    {
      id: 'charging-vip-week',
      name: {
        ar: 'عضوية VIP أسبوعية',
        en: 'VIP Membership - Weekly',
        tr: 'VIP Üyelik - Haftalık'
      },
      description: {
        ar: 'استمتع بمزايا VIP لمدة أسبوع كامل - تسريع إنتاج، مكافآت يومية، وعروض حصرية',
        en: 'Enjoy VIP benefits for a full week - production acceleration, daily rewards, and exclusive offers',
        tr: 'Tam bir hafta boyunca VIP avantajlarının keyfini çıkarın - üretim hızlandırma, günlük ödüller ve özel teklifler'
      },
      price: 15,
      iconAlt: 'VIP أسبوعي',
      popular: false
    },
    {
      id: 'charging-vip-month',
      name: {
        ar: 'عضوية VIP شهرية',
        en: 'VIP Membership - Monthly',
        tr: 'VIP Üyelik - Aylık'
      },
      description: {
        ar: 'استمتع بمزايا VIP لمدة شهر كامل - خصم 20% مقارنة بالاشتراك الأسبوعي',
        en: 'Enjoy VIP benefits for a full month - 20% discount compared to weekly subscription',
        tr: 'Tam bir ay boyunca VIP avantajlarının keyfini çıkarın - haftalık aboneliğe kıyasla %20 indirim'
      },
      price: 49,
      iconAlt: 'VIP شهري',
      popular: true
    },
    {
      id: 'charging-speed-up',
      name: {
        ar: 'تسريع بناء × 10',
        en: 'Building Speed-Up × 10',
        tr: 'Bina Hızlandırma × 10'
      },
      description: {
        ar: 'تسريع بناء وتطوير المباني بعامل 10 أضعاف لمدة يوم كامل',
        en: 'Speed up building and development by a factor of 10 for a full day',
        tr: 'Tam bir gün boyunca bina ve geliştirmeyi 10 kat hızlandırın'
      },
      price: 30,
      iconAlt: 'تسريع بناء',
      popular: false
    }
  ]
};

export default function ServicesPage() {
  // استخدام اللغة العربية فقط
  const locale = 'ar';
  const isRTL = true;
  
  // حالة سلة التسوق
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  // استخدام state لتتبع الكمية لكل منتج
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [totalItems, setTotalItems] = useState(0);
  
  // حالة المنتج المختار للعرض في النافذة المنبثقة
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<'resources' | 'bots' | 'castle' | 'events' | 'charging'>('resources');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // حالة الخدمات المستحضرة من API
  const [services, setServices] = useState<ServicesData>(defaultServices);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // استدعاء API لجلب الخدمات
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`خطأ في الاتصال: ${response.status}`);
        }
        const data = await response.json();
        console.log('بيانات الخدمات:', data);
        
        // معالجة الصور بشكل صحيح
        if (data.services) {
          // نمر على كل فئة من الخدمات
          Object.keys(data.services).forEach(category => {
            if (data.services[category] && Array.isArray(data.services[category])) {
              // نمر على كل منتج في الفئة
              data.services[category] = data.services[category].map(product => {
                // تنسيق مسار الصورة إذا كان موجودًا
                if (product.image && typeof product.image === 'string' && !product.image.startsWith('http') && !product.image.startsWith('/')) {
                  product.image = `/${product.image}`;
                }
                
                // معالجة مصفوفة الصور إذا كانت موجودة
                if (product.images && Array.isArray(product.images)) {
                  product.images = product.images.map(img => {
                    if (typeof img === 'string' && !img.startsWith('http') && !img.startsWith('/')) {
                      return `/${img}`;
                    }
                    return img;
                  });
                }
                
                return product;
              });
            }
          });
        }
        
        setServices(data.services);
        setError(null);
      } catch (error) {
        console.error('خطأ في تحميل الخدمات:', error);
        setError('حدث خطأ أثناء تحميل الخدمات، سيتم عرض بيانات افتراضية.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  
  // حالة الفئة النشطة
  const [activeCategory, setActiveCategory] = useState<'resources' | 'bots' | 'castle' | 'events' | 'charging'>('resources');
  
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
  
  // زيادة الكمية
  const increaseQuantity = (key: string) => {
    setQuantities({
      ...quantities,
      [key]: (quantities[key] || 1) + 1
    });
  };
  
  // إنقاص الكمية (بحد أدنى 1)
  const decreaseQuantity = (key: string) => {
    if (quantities[key] > 1) {
      setQuantities({
        ...quantities,
        [key]: quantities[key] - 1
      });
    }
  };

  // إضافة منتج للسلة
  const handleAddToCart = (item: any, category: 'resources' | 'bots' | 'castle' | 'events' | 'charging') => {
    const key = `${category}-${item.id}`;
    const quantity = quantities[key] || 1; // استخدام الكمية المحددة
    
    // تعليم المنتج كمضاف للسلة
    setAddedItems(prev => ({
      ...prev,
      [key]: true
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
      updatedCart[existingItemIndex].quantity += quantity;
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
          quantity: quantity
        }
      ];
    }
    
    setCartItems(updatedCart);
    updateTotalItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    
    // إعادة تعيين الكمية إلى 1 بعد الإضافة
    setQuantities({
      ...quantities,
      [key]: 1
    });
    
    // إزالة علامة المضاف بعد ثانيتين
    setTimeout(() => {
      setAddedItems(prev => ({
        ...prev,
        [key]: false
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
    // تخزين عناصر السلة في التخزين المحلي لاستخدامها في صفحة الدفع
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // توجيه المستخدم إلى صفحة الدفع
    window.location.href = '/checkout';
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
      ar: 'البوتات',
      en: 'Bots',
      tr: 'Botlar'
    },
    botsSubtitle: {
      ar: 'تمتع بالمساعدة الآلية مع بوتات متخصصة',
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
    chargingTitle: {
      ar: 'الشحن',
      en: 'Charging',
      tr: 'Şarj'
    },
    chargingSubtitle: {
      ar: 'اشحن حسابك بسرعة وأمان مع خدمات الشحن المميزة',
      en: 'Charge your account quickly and securely with our premium charging services',
      tr: 'Premium şarj hizmetlerimizle hesabınızı hızlı ve güvenli bir şekilde şarj edin'
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
  const ProductCard = ({ item, category }: { item: any, category: 'resources' | 'bots' | 'castle' | 'events' | 'charging' }) => {
    const productKey = `${category}-${item.id}`;
    const currentQuantity = quantities[productKey] || 1;
    
    // تحديد لون خلفية الأيقونة حسب نوع المنتج
    const getIconBgColor = () => {
      switch(category) {
        case 'resources': return 'bg-gradient-to-br from-green-300 to-green-100';
        case 'bots': return 'bg-gradient-to-br from-blue-300 to-blue-100';
        case 'events': return 'bg-gradient-to-br from-purple-300 to-purple-100';
        case 'castle': return 'bg-gradient-to-br from-amber-300 to-amber-100';
        case 'charging': return 'bg-gradient-to-br from-pink-300 to-pink-100';
        default: return 'bg-gradient-to-br from-gray-300 to-gray-100';
      }
    };

    // تحديد لون إطار البطاقة حسب نوع المنتج
    const getCardBorderColor = () => {
      switch(category) {
        case 'resources': return 'border-green-200';
        case 'bots': return 'border-blue-200';
        case 'events': return 'border-purple-200';
        case 'castle': return 'border-amber-200';
        case 'charging': return 'border-pink-200';
        default: return 'border-gray-200';
      }
    };
    
    // الحصول على الأيقونة المناسبة
    const getIcon = () => {
      if (category === 'resources') {
        if (item.iconAlt === 'مليار قمح') return '🌾';
        if (item.iconAlt === 'حديد') return '⚙️';
        if (item.iconAlt === 'خشب') return '🌲';
        if (item.iconAlt === 'ذهب') return '💰';
        return '📦';
      } else if (category === 'bots') {
        return '🤖';
      } else if (category === 'events') {
        return '🎮';
      } else if (category === 'castle') {
        return '🏰';
      } else if (category === 'charging') {
        return '💳';
      }
      return '📦';
    };
    
    // إضافة حالة لتتبع فشل تحميل الصورة
    const [imageError, setImageError] = useState(false);
    
    // فتح تفاصيل المنتج
    const handleShowDetails = () => {
      // تأكد من أن المنتج يحتوي على كل البيانات المطلوبة
      console.log('فتح تفاصيل المنتج:', { ...item, category });
      
      // نسخة كاملة من المنتج
      const fullProduct = {
        ...item,
        // تحويل الاسم والوصف إلى الصيغة المطلوبة للمودال
        name: typeof item.name === 'string' ? { ar: item.name, en: item.name, tr: item.name } : item.name,
        description: item.description && typeof item.description === 'string' ? 
          { ar: item.description, en: item.description, tr: item.description } : 
          item.description,
      };
      
      console.log('تمرير منتج كامل للمودال مع الصور:', fullProduct);
      
      setSelectedProduct(fullProduct);
      setSelectedCategory(category);
      setIsModalOpen(true);
    };
    
    return (
      <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-2 ${getCardBorderColor()} relative pb-24 group cursor-pointer`}
           onClick={handleShowDetails}>
        {/* شارة للمنتجات المميزة أو الشائعة */}
        {item.popular && (
          <div className="absolute top-2 right-2 z-20">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{translations.popular[locale as keyof typeof translations.popular]}</span>
            </div>
          </div>
        )}
        
        {/* شريط علوي مزخرف */}
        <div className={`h-2 w-full ${category === 'resources' 
          ? 'bg-gradient-to-r from-green-400 to-green-500' 
          : category === 'bots' 
            ? 'bg-gradient-to-r from-blue-400 to-blue-500' 
            : category === 'events' 
              ? 'bg-gradient-to-r from-purple-400 to-purple-500' 
              : category === 'castle' 
                ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                : 'bg-gradient-to-r from-pink-400 to-pink-500'}`}></div>
        
        <div className="p-6">
          {/* أيقونة المنتج بتصميم محسن */}
          <div className="flex items-center justify-center mb-5">
            <div className={`w-24 h-24 ${getIconBgColor()} rounded-full flex items-center justify-center text-4xl shadow-md border border-white relative overflow-hidden group`}>
              {item.image && !imageError ? (
                <img 
                  src={item.image} 
                  alt={item.name[locale]} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('خطأ في تحميل صورة المنتج:', item.image);
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="relative z-10 transform transition-transform duration-300 group-hover:scale-110">
                  <span role="img" aria-label={item.iconAlt || 'منتج'} className="text-5xl">
                    {getIcon()}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* اسم المنتج */}
          <h3 className="text-2xl font-bold text-center mb-3 text-gray-800">
            {item.name[locale as keyof typeof item.name]}
          </h3>
          
          {/* وصف المنتج (إذا وجد) */}
          {item.description && (
            <p className="text-gray-600 text-center mb-5 h-16 overflow-hidden line-clamp-3">
              {item.description[locale as keyof typeof item.description]}
            </p>
          )}
          
          {/* السعر بتصميم محسن */}
          <div className="flex justify-between items-center p-4 mb-5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
            <div className="text-gray-600 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm3 4h.01a1 1 0 110 2H10a1 1 0 110-2zm-4 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
              {translations.price[locale as keyof typeof translations.price]}:
            </div>
            <div className="text-amber-600 font-bold text-xl">
              {item.price} {translations.currency[locale as keyof typeof translations.currency]}
            </div>
          </div>
          
          {/* محدد الكمية بتصميم محسن */}
          <div className="flex items-center justify-center mb-5">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                decreaseQuantity(productKey);
              }}
              className="w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300"
              aria-label="تقليل الكمية"
            >
              -
            </button>
            <input 
              type="number" 
              value={currentQuantity}
              min="1"
              onChange={(e) => {
                const newValue = parseInt(e.target.value) || 1;
                setQuantities({
                  ...quantities,
                  [productKey]: newValue > 0 ? newValue : 1
                });
              }}
              className="mx-3 font-medium text-lg w-16 text-center border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              aria-label="الكمية"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                increaseQuantity(productKey);
              }}
              className="w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300"
              aria-label="زيادة الكمية"
            >
              +
            </button>
          </div>
          
          {/* زر الإضافة إلى السلة بتصميم محسن */}
          <button
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 absolute bottom-5 left-6 right-6 flex items-center justify-center ${
              addedItems[productKey] 
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-200 hover:shadow-lg' 
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg shadow-amber-200'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(item, category);
            }}
          >
            {addedItems[productKey] 
              ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {translations.added[locale as keyof typeof translations.added]} ({currentQuantity})
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {translations.orderNow[locale as keyof typeof translations.orderNow]} ({currentQuantity})
                </>
              )
            }
          </button>
        </div>
      </div>
    );
  };

  // إضافة منتج من النافذة المنبثقة
  const handleAddFromModal = (product: any, category: string, quantity: number) => {
    // تعليم المنتج كمضاف للسلة
    const key = `${category}-${product.id}`;
    setAddedItems(prev => ({
      ...prev,
      [key]: true
    }));
    
    // إضافة المنتج للسلة بالكمية المحددة
    const itemName = typeof product.name === 'object' ? product.name[locale as keyof typeof product.name] : product.name;
    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem.id === product.id && cartItem.category === category
    );
    
    let updatedCart;
    
    if (existingItemIndex !== -1) {
      // المنتج موجود بالفعل
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      // منتج جديد
      const icon = getIconForCategory(category, product.iconAlt);
      updatedCart = [
        ...cartItems,
        {
          id: product.id,
          name: itemName,
          price: product.price,
          icon: icon,
          category,
          quantity: quantity
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
        [key]: false
      }));
    }, 2000);
  };

  // الحصول على أيقونة بناء على الفئة
  const getIconForCategory = (category: string, iconAlt?: string) => {
    if (category === 'resources') {
      if (iconAlt === 'مليار قمح') return '🌾';
      if (iconAlt === 'حديد') return '⚙️';
      if (iconAlt === 'خشب') return '🌲';
      if (iconAlt === 'ذهب') return '💰';
      return '📦';
    } else if (category === 'bots') {
      return '🤖';
    } else if (category === 'events') {
      return '🎮';
    } else if (category === 'castle') {
      return '🏰';
    } else if (category === 'charging') {
      return '💳';
    }
    return '📦';
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
      
      {/* قسم الهيدر مع صورة خلفية */}
      <div 
        className="w-full py-12 md:py-16 px-4 text-center relative overflow-hidden" 
      >
        {/* صورة الخلفية مع تحسين التوافق مع مختلف الأجهزة */}
        <div 
          className="absolute inset-0 w-full h-full z-0" 
          style={{
            backgroundImage: "url('/images/bg233.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top", /* ضبط موضع الصورة للعرض الأفضل */
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        
        {/* طبقة تعتيم خفيفة لتحسين قراءة النص مع توافق للأجهزة */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 z-0"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-10">
            كل ما تحتاجه للتفوق في عالم الفاتحون
          </h1>
          
          {/* أزرار الفئات الدائرية */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6 mb-8">
            <button
              onClick={() => setActiveCategory('resources')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'resources' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <span className="text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700">🏆</span>
              <span>الموارد</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('events')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'events' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <span className="text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700">🎮</span>
              <span>الأحداث</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('bots')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'bots' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <span className="text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700">🤖</span>
              <span>البوتات</span>
            </button>
            
            <button
              onClick={() => setActiveCategory('charging')}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'charging' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <span className="text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700">💳</span>
              <span>الشحن</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* حالة التحميل */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-lg text-gray-600">جاري تحميل الخدمات...</p>
          </div>
        )}

        {/* حالة الخطأ */}
        {error && !loading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">حدث خطأ!</p>
            <p>{error}</p>
          </div>
        )}

        {/* عرض المنتجات حسب الفئة النشطة */}
        {!loading && activeCategory === 'resources' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.resourcesTitle[locale as keyof typeof translations.resourcesTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.resourcesSubtitle[locale as keyof typeof translations.resourcesSubtitle]}
            </p>
            
            {services.resources && services.resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.resources.map(item => (
                  <ProductCard key={item.id} item={item} category="resources" />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>لا توجد موارد متاحة حاليًا</p>
              </div>
            )}
          </div>
        )}
        
        {!loading && activeCategory === 'castle' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.castleTitle[locale as keyof typeof translations.castleTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.castleSubtitle[locale as keyof typeof translations.castleSubtitle]}
            </p>
            
            {services.castle && services.castle.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.castle.map(item => (
                  <ProductCard key={item.id} item={item} category="castle" />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>لا توجد قلاع متاحة حاليًا</p>
              </div>
            )}
          </div>
        )}
        
        {!loading && activeCategory === 'bots' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.botsTitle[locale as keyof typeof translations.botsTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.botsSubtitle[locale as keyof typeof translations.botsSubtitle]}
            </p>
            
            {services.bots && services.bots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.bots.map(item => (
                  <ProductCard key={item.id} item={item} category="bots" />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>لا توجد بوتات متاحة حاليًا</p>
              </div>
            )}
          </div>
        )}
        
        {!loading && activeCategory === 'events' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.eventsTitle[locale as keyof typeof translations.eventsTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.eventsSubtitle[locale as keyof typeof translations.eventsSubtitle]}
            </p>
            
            {services.events && services.events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.events.map((item, index) => (
                  <div key={item.id} 
                    className={`${item.popular ? 'relative' : ''}`}>
                    {item.popular && (
                      <div className="absolute -top-4 left-0 right-0 bg-amber-500 text-white text-center py-1 rounded-t-lg z-10">
                        {translations.popular[locale as keyof typeof translations.popular]}
                      </div>
                    )}
                    <ProductCard item={item} category="events" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>لا توجد فعاليات متاحة حاليًا</p>
              </div>
            )}
          </div>
        )}
        
        {!loading && activeCategory === 'charging' && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-4 text-center text-amber-700">
              {translations.chargingTitle[locale as keyof typeof translations.chargingTitle]}
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              {translations.chargingSubtitle[locale as keyof typeof translations.chargingSubtitle]}
            </p>
            
            {services.charging && services.charging.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.charging.map((item, index) => (
                  <div key={item.id} 
                    className={`${item.popular ? 'relative' : ''}`}>
                    {item.popular && (
                      <div className="absolute -top-4 left-0 right-0 bg-amber-500 text-white text-center py-1 rounded-t-lg z-10">
                        {translations.popular[locale as keyof typeof translations.popular]}
                      </div>
                    )}
                    <ProductCard item={item} category="charging" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>لا توجد خدمات شحن متاحة حاليًا</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* نافذة تفاصيل المنتج */}
      {selectedProduct && (
        <ProductDetailsModal
          isOpen={isModalOpen}
          onClose={() => {
            console.log('Closing modal');
            setIsModalOpen(false);
          }}
          product={selectedProduct}
          category={selectedCategory}
          locale={locale}
          onAddToCart={handleAddFromModal}
        />
      )}
    </div>
  );
}
