"use client";

import React from 'react';
import { useTranslation } from '@/app/i18n/client';

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

const CartDropdown: React.FC<CartDropdownProps> = ({ 
  isOpen, 
  cartItems, 
  removeFromCart, 
  toggleCart, 
  goToCheckout,
  locale,
  translations
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-32 right-4 z-50 bg-white rounded-lg shadow-xl p-4 w-72 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{translations.cart[locale]}</h3>
        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{translations.emptyCart[locale]}</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={`${item.category}-${item.id}`} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    <span>{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.price} {translations.currency[locale]} × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.category)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between font-bold mb-4">
              <span>{translations.total[locale]}:</span>
              <span>
                {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                {' '}{translations.currency[locale]}
              </span>
            </div>
            
            <button 
              onClick={goToCheckout}
              className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded-lg"
            >
              {translations.checkout[locale]}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
