import React from 'react';
import PlaceholderImage from '../common/PlaceholderImage';

// تعريف نوع الخصائص للمكون
interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: any;
    description?: any;
    price: number;
    iconAlt?: string;
    popular?: boolean;
    image?: string;     // صورة واحدة رئيسية
    images?: string[];  // مجموعة صور
    additionalDetails?: any;
  };
  category: 'resources' | 'bots' | 'castle' | 'events' | 'charging';
  locale: string;
  onAddToCart: (product: any, category: string, quantity: number) => void;
}

// إضافة تأثير الظهور بالتلاشي
const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;

// مكون النافذة المنبثقة لتفاصيل المنتج
const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  isOpen,
  onClose,
  product,
  category,
  locale,
  onAddToCart
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [imageError, setImageError] = React.useState(false);
  
  // إعادة تعيين الحالات عند فتح النافذة
  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedImageIndex(0);
      setImageError(false);
      console.log('Modal opened with product:', product);
    }
  }, [isOpen, product]);

  // معالجة الصور
  const productImage = product && product.image ? [product.image] : [];
  const productImages = product && product.images && Array.isArray(product.images) ? product.images : [];
  
  // دمج مصادر الصور في مصفوفة واحدة والتأكد من أن المسارات صحيحة
  const allImages = [...productImage, ...productImages]
    .filter(img => img && typeof img === 'string' && img.trim() !== '')
    .map(img => {
      // التحقق من وجود بروتوكول (http أو https) في المسار
      if (img.startsWith('http') || img.startsWith('//')) {
        return img; // إذا كان مسار كامل (مثل روابط Cloudinary)، لا نغيره
      } else if (img.startsWith('/')) {
        return img; // إذا كان مسار يبدأ بـ "/"، لا نغيره
      } else {
        return `/${img}`; // إضافة "/" إذا كان مسار نسبي
      }
    });
  
  // التوقف عن المعالجة إذا كانت النافذة مغلقة
  if (!isOpen || !product) return null;
  
  // تسجيل معلومات المنتج للتشخيص
  console.log('MODAL RENDER - Product Details:', {
    id: product.id,
    name: product.name,
    image: product.image,
    images: product.images,
    allImages: allImages,
    category: category
  });
  
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
  
  // الحصول على الأيقونة بناء على نوع المنتج
  const getIcon = () => {
    if (category === 'resources') {
      if (product.iconAlt === 'مليار قمح') return '🌾';
      if (product.iconAlt === 'حديد') return '⚙️';
      if (product.iconAlt === 'خشب') return '🌲';
      if (product.iconAlt === 'ذهب') return '💰';
      return product.iconAlt || '📦';
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
  
  // زيادة الكمية
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // إنقاص الكمية (بحد أدنى 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // إضافة المنتج للسلة
  const handleAddToCart = () => {
    onAddToCart(product, category, quantity);
    onClose();
  };

  // مكون الأيقونة
  const ProductIcon = () => (
    <div className={`w-40 h-40 ${getIconBgColor()} rounded-full flex items-center justify-center text-6xl shadow-md border border-white`}>
      <span role="img" aria-label={product.iconAlt || 'منتج'}>
        {getIcon()}
      </span>
    </div>
  );

  // التأكد من وجود اسم المنتج باللغة الحالية
  const productName = product.name && typeof product.name === 'object' && product.name[locale] 
    ? product.name[locale] 
    : (typeof product.name === 'string' ? product.name : 'منتج');

  // التأكد من وجود وصف المنتج باللغة الحالية
  const productDescription = product.description && typeof product.description === 'object' && product.description[locale]
    ? product.description[locale]
    : (typeof product.description === 'string' ? product.description : '');
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black bg-opacity-60">
      <style>{fadeInStyle}</style>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* تصميم مزخرف علوي */}
        <div className={`h-2 w-full ${
          category === 'resources' ? 'bg-gradient-to-r from-green-400 to-green-500' :
          category === 'bots' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
          category === 'events' ? 'bg-gradient-to-r from-purple-400 to-purple-500' :
          category === 'castle' ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
          'bg-gradient-to-r from-pink-400 to-pink-500'
        }`}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
          {/* الجزء الأيسر - صور المنتج */}
          <div className="flex flex-col space-y-4 items-center justify-center">
            {/* عرض الصورة الرئيسية أو الأيقونة */}
            <div className="bg-gray-100 rounded-lg overflow-hidden relative aspect-square w-full flex items-center justify-center p-4">
              {allImages.length > 0 && !imageError ? (
                <>
                  <img 
                    key={`img-${selectedImageIndex}-${allImages[selectedImageIndex]}`}
                    src={allImages[selectedImageIndex]} 
                    alt={productName} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      console.error('فشل تحميل الصورة:', allImages[selectedImageIndex]);
                      setImageError(true);
                    }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="bg-white/80 px-3 py-1 text-sm rounded-full shadow-sm">
                      {productName}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <PlaceholderImage 
                    width={300} 
                    height={300} 
                    text={productName} 
                    className="rounded-lg"
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="bg-white/80 px-3 py-1 text-sm rounded-full shadow-sm">
                      {productName}
                    </span>
                  </div>
                </>
              )}
              
              {/* أزرار التنقل بين الصور */}
              {allImages.length > 1 && !imageError && (
                <>
                  <button 
                    onClick={() => setSelectedImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
                    aria-label="الصورة السابقة"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setSelectedImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
                    aria-label="الصورة التالية"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            
            {/* صور مصغرة */}
            {allImages.length > 1 && !imageError && (
              <div className="flex flex-wrap gap-2 justify-center">
                {allImages.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === index ? 'border-amber-500 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img 
                        src={image} 
                        alt={`صورة ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`فشل تحميل الصورة المصغرة ${index + 1}:`, image);
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // منع التكرار
                          target.src = '/placeholder-image.jpg'; // صورة بديلة
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* زر إضافة صورة جديدة (يظهر فقط عندما لا توجد صور أو عند وجود خطأ في عرض الصور) */}
            {(!allImages.length || imageError) && (
              <div className="mt-4 text-center">
                <p className="text-gray-500 mb-2">لا توجد صور متاحة لهذا المنتج</p>
              </div>
            )}
          </div>
          
          {/* الجزء الأيمن - تفاصيل المنتج */}
          <div className="flex flex-col">
            {/* شارة للمنتجات المميزة أو الشائعة */}
            {product.popular && (
              <div className="self-start mb-4">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>شائع</span>
                </div>
              </div>
            )}
            
            {/* اسم المنتج */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {productName}
            </h2>
            
            {/* وصف المنتج */}
            {productDescription && (
              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed">
                  {productDescription}
                </p>
              </div>
            )}
            
            {/* تفاصيل إضافية */}
            {product.additionalDetails && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2">تفاصيل إضافية:</h3>
                <ul className="space-y-2">
                  {Object.entries(product.additionalDetails).map(([key, value]) => (
                    <li key={key} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>{String(value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* السعر */}
            <div className="flex justify-between items-center p-4 mb-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="text-gray-600 font-medium">السعر:</div>
              <div className="text-amber-600 font-bold text-2xl">{product.price} $</div>
            </div>
            
            {/* محدد الكمية */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 font-medium ml-4">الكمية:</span>
              <div className="flex items-center">
                <button 
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300"
                  aria-label="تقليل الكمية"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  min="1"
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value) || 1;
                    setQuantity(newValue > 0 ? newValue : 1);
                  }}
                  className="mx-3 font-medium text-lg w-16 text-center border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  aria-label="الكمية"
                />
                <button 
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300"
                  aria-label="زيادة الكمية"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* زر الإضافة إلى السلة */}
            <button
              className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg shadow-amber-200 transition-all duration-300 mt-auto flex items-center justify-center"
              onClick={handleAddToCart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              إضافة للسلة ({quantity})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal; 