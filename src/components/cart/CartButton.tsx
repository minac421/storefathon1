"use client";

import React from 'react';
import { useTranslation } from '@/app/i18n/client';

type CartButtonProps = {
  totalItems: number;
  toggleCart: () => void;
  locale: string;
};

const CartButton: React.FC<CartButtonProps> = ({ totalItems, toggleCart, locale }) => {
  return (
    <div className="fixed top-20 right-4 z-50">
      <button
        onClick={toggleCart}
        className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center relative"
      >
        <span className="text-xl">🛒</span>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartButton;
