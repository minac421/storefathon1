"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import { usePathname } from 'next/navigation';

interface CartWidgetProps {
  locale?: string;
}

export const CartWidget: React.FC<CartWidgetProps> = ({ locale = 'ar' }) => {
  const { 
    cartItems, 
    removeItem, 
    updateQuantity, 
    isCartOpen, 
    toggleCart, 
    totalItems, 
    totalPrice 
  } = useCart();
  
  const pathname = usePathname();
  
  // الحصول على المسار الحالي بدون رمز اللغة
  const getPathWithoutLocale = () => {
    // إذا كان المسار فارغًا أو فقط "/"
    if (!pathname || pathname === '/') return '/';
    
    // إزالة رمز اللغة من المسار
    const segments = pathname.split('/');
    if (segments.length >= 2 && segments[1] && ['ar', 'en', 'tr'].includes(segments[1])) {
      return '/' + segments.slice(2).join('/');
    }
    
    // إعادة المسار كما هو إذا لم يحتوِ على رمز لغة
    return pathname;
  };
  
  // بناء رابط مع اللغة الحالية
  const buildLocalizedPath = (path: string) => {
    return `/${locale}${path}`;
  };

  // الحصول على الترجمة المناسبة للنص
  const getLocalizedText = (key: string): string => {
    const translations: {[key: string]: {[key: string]: string}} = {
      'cart': {
        'ar': 'السلة',
        'en': 'Cart',
        'tr': 'Sepet'
      },
      'cartItems': {
        'ar': 'عناصر السلة',
        'en': 'Cart Items',
        'tr': 'Sepet Öğeleri'
      },
      'emptyCart': {
        'ar': 'السلة فارغة',
        'en': 'Cart is empty',
        'tr': 'Sepet boş'
      },
      'checkout': {
        'ar': 'إتمام الطلب',
        'en': 'Checkout',
        'tr': 'Ödeme'
      },
      'total': {
        'ar': 'المجموع',
        'en': 'Total',
        'tr': 'Toplam'
      },
      'remove': {
        'ar': 'إزالة',
        'en': 'Remove',
        'tr': 'Kaldır'
      },
      'currency': {
        'ar': 'USD',
        'en': 'USD',
        'tr': 'USD'
      },
      'quantity': {
        'ar': 'الكمية',
        'en': 'Quantity',
        'tr': 'Miktar'
      },
      'noItems': {
        'ar': 'لا توجد عناصر في السلة',
        'en': 'No items in cart',
        'tr': 'Sepette ürün yok'
      },
      'continueShopping': {
        'ar': 'مواصلة التسوق',
        'en': 'Continue Shopping',
        'tr': 'Alışverişe Devam Et'
      }
    };
    
    return translations[key]?.[locale] || key;
  };

  const isRTL = locale === 'ar';

  return (
    <div className="relative">
      {/* زر السلة */}
      <button 
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center"
        onClick={toggleCart}
        aria-label={getLocalizedText('cart')}
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-blue-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>
        
        <span className={`text-sm font-medium ${isRTL ? 'mr-1' : 'ml-1'} hidden sm:inline`}>
          {getLocalizedText('cart')}
        </span>
        
        {/* رقم العناصر في السلة */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {/* محتوى السلة */}
      {isCartOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 lg:pt-24 lg:block lg:inset-auto lg:absolute ${isRTL ? 'lg:right-0' : 'lg:left-0'} lg:top-full lg:mt-2 lg:w-96`}>
          <div className={`bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-auto ${isRTL ? 'text-right rtl' : 'text-left ltr'}`}>
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className={`text-lg font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                {getLocalizedText('cartItems')} 
                {totalItems > 0 && <span className="text-blue-600 text-sm font-normal"> ({totalItems})</span>}
              </h3>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {cartItems.length > 0 ? (
              <div>
                <div className="max-h-60 overflow-y-auto divide-y">
                  {cartItems.map(item => (
                    <div key={`${item.category}-${item.id}`} className="py-3 px-4 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className={`text-2xl ${isRTL ? 'ml-2' : 'mr-2'}`}>{item.icon}</span>
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-gray-700">
                            {item.price} {getLocalizedText('currency')}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <label className="sr-only">{getLocalizedText('quantity')}</label>
                            <div className="flex items-center">
                              <button 
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none"
                                onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}
                              >
                                -
                              </button>
                              
                              <span className="mx-2 w-6 text-center">{item.quantity}</span>
                              
                              <button 
                                className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none"
                                onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        className="text-gray-500 hover:text-red-600 transition-colors"
                        onClick={() => removeItem(item.id, item.category)}
                        aria-label={getLocalizedText('remove')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold text-gray-800">{getLocalizedText('total')}:</div>
                    <div className="font-bold text-lg text-blue-600">{totalPrice} {getLocalizedText('currency')}</div>
                  </div>
                  
                  <div className="flex justify-between gap-3">
                    <button 
                      className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      onClick={toggleCart}
                    >
                      {getLocalizedText('continueShopping')}
                    </button>
                    
                    <Link 
                      href={buildLocalizedPath('/checkout')}
                      className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                      onClick={toggleCart}
                    >
                      {getLocalizedText('checkout')}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500 p-4">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="mb-4">{getLocalizedText('noItems')}</p>
                <button 
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={toggleCart}
                >
                  {getLocalizedText('continueShopping')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartWidget; 