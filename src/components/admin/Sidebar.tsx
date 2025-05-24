"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  activePath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath }) => {
  // عناصر القائمة الجانبية
  const menuItems = [
    { name: 'لوحة المعلومات', icon: '📊', path: '/admin' },
    { name: 'الطلبات', icon: '📦', path: '/admin/orders' },
    { name: 'المستخدمين', icon: '👥', path: '/admin/users' },
    { name: 'الخدمات', icon: '🛍️', path: '/admin/services' },
    { name: 'إدارة القلاع', icon: '🏰', path: '/admin/castles' },
    { name: 'المدونة', icon: '📝', path: '/admin/blog' },
    { name: 'إدارة التعليقات', icon: '💬', path: '/admin/comments' },
    { name: 'الإحصائيات', icon: '📈', path: '/admin/statistics' },
    { name: 'الإعدادات', icon: '⚙️', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white h-screen sticky top-0">
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Image 
            src="/images/store-fathon-logo.svg" 
            alt="Store Fathon Logo" 
            width={50} 
            height={50} 
          />
          <h2 className="text-xl font-bold">Store Fathon</h2>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  item.path === activePath 
                    ? 'bg-blue-800 text-white' 
                    : 'hover:bg-blue-800/50 transition-colors'
                }`}
              >
                <span className="ml-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 