"use client";

import React, { useEffect, useState } from 'react';

type CartButtonProps = {
  totalItems: number;
  toggleCart: () => void;
};

const ServiceCartButton: React.FC<CartButtonProps> = ({ totalItems, toggleCart }) => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevTotalItems, setPrevTotalItems] = useState(totalItems);

  // تأثير التنبيه عند إضافة عناصر جديدة للسلة
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 700);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  // إخفاء الزر عند التمرير لأسفل وإظهاره عند التمرير لأعلى
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 100 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-20 md:top-24 right-4 md:right-8 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <button
        onClick={toggleCart}
        className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 md:p-5 rounded-full shadow-lg flex items-center justify-center relative transition-transform ${animate ? 'animate-bounce' : ''} hover:scale-110`}
        aria-label="عرض السلة"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {totalItems > 0 && (
          <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center shadow-md ${animate ? 'animate-pulse' : ''}`}>
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default ServiceCartButton;
