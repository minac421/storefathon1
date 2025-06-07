"use client";

import dynamic from 'next/dynamic';

// استيراد ChatWindow بشكل ديناميكي للعميل فقط
const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow.jsx'), { ssr: false });

interface ClientChatWindowProps {
  locale: string;
}

export default function ClientChatWindow({ locale }: ClientChatWindowProps) {
  return <ChatWindow locale={locale} />;
}
