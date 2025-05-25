import { createMockOnlineUsers } from '@/utils/mockData';

// مخزن مشترك للدردشة - يستخدم على جانب الخادم والعميل
export const chatStore = {
  // مصفوفة الرسائل
  messages: [],
  
  // معرف آخر رسالة
  lastMessageId: 1,
  
  // الحد الأقصى لعدد الرسائل المخزنة
  maxMessages: 100,

  // قائمة المستخدمين النشطين
  activeUsers: new Map(),
  
  // إضافة مستخدم جديد
  addUser(userData) {
    try {
      if (!userData || !userData.nickname) {
        throw new Error('بيانات المستخدم غير صالحة');
      }

      const userId = userData.userId || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // التحقق من عدم وجود مستخدم بنفس المعرف
      if (this.activeUsers.has(userId)) {
        // تحديث بيانات المستخدم الموجود
        const existingUser = this.activeUsers.get(userId);
        this.activeUsers.set(userId, {
          ...existingUser,
          ...userData,
          lastSeen: new Date().toISOString()
        });
      } else {
        // إضافة مستخدم جديد
        this.activeUsers.set(userId, {
          ...userData,
          userId,
          lastSeen: new Date().toISOString()
        });
      }
      
      return userId;
    } catch (error) {
      console.error('Error adding user:', error);
      throw new Error('فشل في إضافة المستخدم');
    }
  },

  // تحديث حالة المستخدم
  updateUserStatus(userId, status) {
    try {
      const user = this.activeUsers.get(userId);
      if (user) {
        user.status = status;
        user.lastSeen = new Date().toISOString();
        this.activeUsers.set(userId, user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user status:', error);
      throw new Error('فشل في تحديث حالة المستخدم');
    }
  },

  // إزالة مستخدم
  removeUser(userId) {
    try {
      return this.activeUsers.delete(userId);
    } catch (error) {
      console.error('Error removing user:', error);
      throw new Error('فشل في إزالة المستخدم');
    }
  },
  
  // إضافة رسالة جديدة
  addMessage(message) {
    try {
      // التحقق من وجود معرف المستخدم
      if (!message.userId) {
        throw new Error('معرف المستخدم مطلوب لإرسال الرسالة');
      }

      // التحقق من أن المستخدم نشط
      const user = this.activeUsers.get(message.userId);
      if (!user) {
        throw new Error('المستخدم غير نشط');
      }
      
      // إنشاء معرف فريد للرسالة
      const messageId = `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // إنشاء نسخة من الرسالة مع المعرف الجديد
      const savedMessage = {
        id: messageId,
        userId: message.userId,
        ...message,
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
        this.messages.shift();
      }
      
      return savedMessage;
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  // الحصول على قائمة المستخدمين النشطين
  getActiveUsers() {
    try {
      return Array.from(this.activeUsers.values());
    } catch (error) {
      console.error('Error getting active users:', error);
      return [];
    }
  },

  // الحصول على الرسائل
  getMessages(limit = 20) {
    try {
      return this.messages.slice(-limit);
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  },
  
  // تحديث تفاعل الرسالة
  updateMessageInteraction(messageId, userId, isLiked) {
    try {
      const message = this.messages.find(msg => msg.id === messageId);
      
      if (!message) {
        return null;
      }
      
      if (isLiked) {
        if (!message.interaction.likes.includes(userId)) {
          message.interaction.likes.push(userId);
        }
      } else {
        message.interaction.likes = message.interaction.likes.filter(id => id !== userId);
      }
      
      return message;
    } catch (error) {
      console.error('Error updating message interaction:', error);
      throw new Error('فشل في تحديث تفاعل الرسالة');
    }
  },
  
  // إنشاء رسائل أولية إذا لم تكن هناك رسائل
  createInitialMessages() {
    try {
      return [];
    } catch (error) {
      console.error('Error creating initial messages:', error);
      return [];
    }
  }
};

// إنشاء رسائل أولية عند بدء التشغيل
if (chatStore.messages.length === 0) {
  chatStore.createInitialMessages();
}

export default chatStore; 