"use client";

import React from 'react';
import { CartItem } from './CartContext';
import { Translations } from '../../lib/i18n';
import translations from '../../lib/i18n';

// Get translations based on locale
const t = translations['ar']; // We'll use Arabic as default locale for now

// No need to redefine CartItem type since we're importing it from CartContext

type CartDropdownProps = {
  isOpen: boolean;
  cartItems: CartItem[];
  removeFromCart: (id: string, category: string) => void;
  toggleCart: () => void;
  goToCheckout: () => void;
};

const CartDropdown: React.FC<CartDropdownProps> = ({ 
  isOpen, 
  cartItems, 
  removeFromCart, 
  toggleCart, 
  goToCheckout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-32 right-4 z-50 bg-white rounded-lg shadow-xl p-4 w-72 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{t('cart.title')}</h3>
        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-4">{t('cart.empty')}</p>
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
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-500">
                        {item.price} {t('cart.currency')} × {item.quantity}
                      </p>
                      {item.discount && (
                        <div className="flex items-center">
                          <span className="text-green-600 mr-1">{t('cart.discount')}</span>
                          {item.discount.type === 'fixed' ? (
                            <span className="text-green-600">{item.discount.amount} {t('cart.currency')}</span>
                          ) : (
                            <span className="text-green-600">{item.discount.amount}%</span>
                          )}
                        </div>
                      )}
                    </div>
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
              <span>{t('cart.total')}:</span>
              <span>
                {cartItems.reduce((total, item) => {
                  const discountedPrice = item.discount ? 
                    (item.discount.type === 'fixed' 
                      ? Math.max(0, item.price - item.discount.amount)
                      : item.price * (1 - item.discount.amount / 100)
                    ) : 
                    item.price;
                  return total + (discountedPrice * item.quantity);
                }, 0)}
                {' '}{t('cart.currency')}
              </span>
            </div>
            
            <button 
              onClick={goToCheckout}
              className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-2 rounded-lg"
            >
              {t('cart.checkout')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
