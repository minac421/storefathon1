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
  return [];
}

// نموذج بيانات المستخدمين المتصلين
export interface OnlineUser {
  name: string;
  avatarId: number;
}

// إنشاء بيانات وهمية للمستخدمين المتصلين
export function createMockOnlineUsers(): OnlineUser[] {
  return [];
} 