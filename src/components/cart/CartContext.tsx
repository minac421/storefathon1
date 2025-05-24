"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// تعريف نوع العنصر في السلة
export interface CartItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  quantity: number;
  category: 'resources' | 'bots' | 'castle' | 'events' | 'packages'; // إضافة فئة 'packages'
}

// واجهة سياق السلة
interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, category: string) => void;
  updateQuantity: (id: string, category: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// إنشاء السياق مع قيمة افتراضية
const CartContext = createContext<CartContextType | undefined>(undefined);

// مزود سياق السلة
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // حالة السلة
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // استرجاع بيانات السلة من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error('Failed to parse cart items from localStorage:', error);
      }
    }
  }, []);
  
  // حفظ بيانات السلة في التخزين المحلي عند التغيير
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  // إضافة عنصر للسلة
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // البحث عن العنصر إذا كان موجوداً بالفعل
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.category === item.category
      );
      
      if (existingItemIndex > -1) {
        // إذا كان العنصر موجوداً، قم بزيادة الكمية
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        // إذا لم يكن العنصر موجوداً، أضفه مع كمية 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    // فتح السلة عند إضافة عنصر
    setIsCartOpen(true);
  };
  
  // إزالة عنصر من السلة
  const removeItem = (id: string, category: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.category === category)));
  };
  
  // تحديث كمية عنصر
  const updateQuantity = (id: string, category: string, quantity: number) => {
    if (quantity <= 0) {
      // إذا كانت الكمية صفر أو أقل، قم بإزالة العنصر
      removeItem(id, category);
    } else {
      // تحديث الكمية
      setCartItems(prevItems => prevItems.map(item => {
        if (item.id === id && item.category === category) {
          return { ...item, quantity };
        }
        return item;
      }));
    }
  };
  
  // إفراغ السلة
  const clearCart = () => {
    setCartItems([]);
  };
  
  // تبديل حالة عرض السلة
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  // حساب إجمالي العناصر
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // حساب السعر الإجمالي
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // قيمة السياق التي سيتم توفيرها
  const value = {
    cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    toggleCart,
    totalItems,
    totalPrice
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// هوك لاستخدام سياق السلة
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 