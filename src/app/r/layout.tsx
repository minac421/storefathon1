import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'معالجة الإحالة',
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 