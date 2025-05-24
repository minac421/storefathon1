"use client"; // هذا السطر ضروري لتحديد أن هذا مكون عميل

import dynamic from 'next/dynamic';

// استخدام dynamic import للمكونات التي تحتاج إلى تفاعل العميل
const ChatWindow = dynamic(() => import('@/components/chat/ChatWindow'), { ssr: false });

export default function ChatSection({ locale }) {
  return (
    <div>
      <ChatWindow locale={locale} />
    </div>
  );
}
