// نموذج بيانات رسائل الدردشة
export interface ChatMessage {
  id: string;
  sender: string;
  senderAvatarId: number;
  message: string;
  timestamp: string;
  interaction?: {
    likes: string[];
    isLiked?: boolean;
  };
}

// إنشاء بيانات وهمية للرسائل الأولية
export function createMockMessages(): ChatMessage[] {
  return [
    { 
      id: '1', 
      sender: 'فاطمة', 
      senderAvatarId: 3, 
      message: 'مرحباً بالجميع في دردشة الفاتحون! هل يمكنني الحصول على نصائح لتطوير قلعتي؟', 
      timestamp: '2025-05-16T01:00:00.000Z',
      interaction: {
        likes: [],
        isLiked: false
      }
    },
    { 
      id: '2', 
      sender: 'عمر', 
      senderAvatarId: 1, 
      message: 'أهلاً فاطمة! أنصحك بالتركيز على تطوير الدفاعات أولاً وزيادة إنتاج الموارد', 
      timestamp: '2025-05-16T01:01:30.000Z',
      interaction: {
        likes: [],
        isLiked: false
      }
    },
    { 
      id: '3', 
      sender: 'خالد', 
      senderAvatarId: 5, 
      message: 'البوتات الذكية للمزارع ستساعدك كثيراً في توفير الموارد والوقت', 
      timestamp: '2025-05-16T01:03:00.000Z',
      interaction: {
        likes: [],
        isLiked: false
      }
    },
  ];
}

// نموذج بيانات المستخدمين المتصلين
export interface OnlineUser {
  name: string;
  avatarId: number;
}

// إنشاء بيانات وهمية للمستخدمين المتصلين
export function createMockOnlineUsers(): OnlineUser[] {
  return [
    { name: 'عمر', avatarId: 1 },
    { name: 'خالد', avatarId: 5 },
    { name: 'فاطمة', avatarId: 3 },
    { name: 'محمد', avatarId: 2 },
    { name: 'سارة', avatarId: 6 },
    { name: 'أحمد', avatarId: 8 },
    { name: 'نورا', avatarId: 4 }
  ];
} 