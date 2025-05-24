"use client";

import React, { useRef, useEffect } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  icon: string;
  category: string;
  quantity: number;
};

type CartDropdownProps = {
  isOpen: boolean;
  cartItems: CartItem[];
  removeFromCart: (id: string, category: string) => void;
  toggleCart: () => void;
  goToCheckout: () => void;
  locale: string;
  translations: any;
};

const ServiceCartDropdown: React.FC<CartDropdownProps> = ({ 
  isOpen, 
  cartItems, 
  removeFromCart, 
  toggleCart, 
  goToCheckout,
  locale,
  translations
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // إضافة تأثير الإغلاق عند النقر خارج القائمة
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleCart]);

  if (!isOpen) return null;

  // حساب المجموع الكلي
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* خلفية شفافة */}
      <div className="absolute inset-0 bg-black bg-opacity-15 backdrop-blur-[1px] transition-opacity duration-300" onClick={toggleCart}></div>
      
      {/* القائمة المنسدلة */}
      <div 
        ref={dropdownRef}
        className="absolute top-32 right-4 md:right-8 z-50 bg-white rounded-xl shadow-2xl w-80 max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100 rtl"
        style={{ maxHeight: '70vh' }}
      >
        {/* رأس القائمة */}
        <div className="sticky top-0 bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-amber-800">
            <span className="mx-2">🛒</span>
            {translations.cart[locale]}
          </h3>
          <button 
            onClick={toggleCart} 
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-amber-100 hover:text-gray-800 transition-colors"
            aria-label="إغلاق"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* محتوى القائمة */}
        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(70vh - 140px)' }}>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-gray-500 mb-4">{translations.emptyCart[locale]}</p>
              <button 
                onClick={toggleCart}
                className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
              >
                {translations.continueShopping ? translations.continueShopping[locale] : 'مواصلة التسوق'}
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li 
                  key={`${item.category}-${item.id}`} 
                  className="p-3 rounded-lg bg-white border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all flex justify-between items-center group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center ml-3">
                      <span className="text-xl">{item.icon || '🛍️'}</span>
                    </div>
                    <div>
                      <p className="font-bold text-amber-900">{item.name}</p>
                      <div className="flex items-center text-sm text-amber-700">
                        <span className="inline-block">{item.price} {translations.currency[locale]}</span>
                        <span className="mx-1 text-amber-400">×</span>
                        <span className="inline-flex items-center justify-center bg-amber-50 px-2 rounded-full font-medium">{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.category)}
                    className="w-7 h-7 rounded-full bg-white text-gray-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="إزالة من السلة"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
          
        {/* ملخص السلة والمجموع */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-0 bg-gradient-to-b from-amber-50 to-amber-100 p-4 border-t border-amber-200 shadow-inner">
            <div className="flex justify-between items-center font-bold mb-4 text-amber-900">
              <span className="text-lg">{translations.total[locale]}:</span>
              <span className="text-xl">
                {totalAmount}
                {' '}{translations.currency[locale]}
              </span>
            </div>
            
            <button 
              onClick={goToCheckout}
              className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-center py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              {translations.checkout[locale]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCartDropdown;
