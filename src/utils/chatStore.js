import { createMockOnlineUsers } from '@/utils/mockData';

// مخزن مشترك للدردشة - يستخدم على جانب الخادم والعميل
export const chatStore = {
  // مصفوفة الرسائل
  messages: [],
  
  // معرف آخر رسالة
  lastMessageId: 1,
  
  // الحد الأقصى لعدد الرسائل المخزنة
  maxMessages: 100,
  
  // إضافة رسالة جديدة
  addMessage(message) {
    // إنشاء معرف فريد للرسالة باستخدام timestamp
    const messageId = `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // إنشاء نسخة من الرسالة مع المعرف الجديد
    const savedMessage = {
      id: messageId,
      ...message,
      // ضمان وجود وقت وتفاعل
      timestamp: message.timestamp || new Date().toISOString(),
      interaction: message.interaction || {
        likes: [],
        isLiked: false
      }
    };
    
    // إضافة الرسالة إلى المصفوفة
    this.messages.push(savedMessage);
    
    // التحقق من عدم تجاوز الحد الأقصى
    if (this.messages.length > this.maxMessages) {
      // إزالة أقدم رسالة
      this.messages.shift();
    }
    
    return savedMessage;
  },
  
  // الحصول على الرسائل مع اختيار الحد الأقصى
  getMessages(limit = 20) {
    // ضمان أن الحد الأقصى عدد صحيح
    const count = Math.min(parseInt(limit) || 20, this.messages.length);
    
    // إذا لم تكن هناك رسائل، عودة مصفوفة فارغة
    if (this.messages.length === 0) {
      return this.createInitialMessages();
    }
    
    // إعادة آخر count رسائل
    return this.messages.slice(-count);
  },
  
  // تحديث تفاعل الرسالة
  updateMessageInteraction(messageId, userId, isLiked) {
    // البحث عن الرسالة
    const message = this.messages.find(msg => msg.id === messageId);
    
    if (!message) {
      return null;
    }
    
    // تحديث التفاعل
    if (isLiked) {
      // إضافة المستخدم إلى قائمة الإعجابات إذا لم يكن موجوداً
      if (!message.interaction.likes.includes(userId)) {
        message.interaction.likes.push(userId);
      }
    } else {
      // إزالة المستخدم من قائمة الإعجابات
      message.interaction.likes = message.interaction.likes.filter(id => id !== userId);
    }
    
    return message;
  },
  
  // إنشاء رسائل أولية إذا لم تكن هناك رسائل
  createInitialMessages() {
    // إرجاع مصفوفة فارغة بدلاً من الرسائل الوهمية
    return [];
  }
};

// إنشاء رسائل أولية عند بدء التشغيل
if (chatStore.messages.length === 0) {
  chatStore.createInitialMessages();
}

export default chatStore; 