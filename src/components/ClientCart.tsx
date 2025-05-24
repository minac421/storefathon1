"use client";

import React from 'react';
import { CartProvider } from './cart/CartContext';

export function ClientCartProvider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
} 