import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';
import { chatStore } from '@/utils/chatStore';
import { Model } from 'mongoose';

// الحد الأقصى لعدد الرسائل المخزنة
const MAX_MESSAGES = 50;

export async function GET(req: NextRequest) {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();
    
    // جلب آخر 50 رسالة مرتبة حسب الوقت (من الأحدث للأقدم)
    const chatMessageModel = ChatMessage as Model<any>;
    const dbMessages = await chatMessageModel.find()
      .sort({ timestamp: -1 })
      .limit(MAX_MESSAGES)
      .lean();
    
    // ترتيب الرسائل من الأقدم للأحدث للعرض
    const messages = dbMessages
      .reverse()
      .map(msg => ({
        ...msg,
        id: msg._id.toString(),
        timestamp: msg.timestamp.toISOString()
      }));
    
    // جلب المستخدمين النشطين
    const activeUsers = chatStore.getActiveUsers();
    
    return NextResponse.json({ 
      success: true, 
      messages,
      users: activeUsers
    });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في جلب رسائل الدردشة' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, sender, senderAvatarId, userId } = await req.json();
    
    // التحقق من بيانات الرسالة
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ 
        success: false, 
        error: 'محتوى الرسالة مطلوب' 
      }, { status: 400 });
    }
    
    if (!sender || typeof sender !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'اسم المرسل مطلوب' 
      }, { status: 400 });
    }
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'معرف المستخدم مطلوب' 
      }, { status: 400 });
    }
    
    // التحقق من أن المستخدم نشط في chatStore
    let user = chatStore.activeUsers.get(userId);
    if (!user) {
      // محاولة إعادة تسجيل المستخدم تلقائياً
      try {
        chatStore.addUser({
          userId,
          nickname: sender,
          avatarId: senderAvatarId || 1,
          status: 'online'
        });
      } catch (error) {
        console.error('Error adding user to active users:', error);
      }
    }
    
    try {
      // الاتصال بقاعدة البيانات
      await dbConnect();
      
      // إنشاء رسالة جديدة في قاعدة البيانات
      const newMessage = new ChatMessage({
        message: message.trim(),
        sender,
        userId,
        senderAvatarId: senderAvatarId || 1,
        timestamp: new Date(),
        interaction: {
          likes: [],
          isLiked: false
        }
      });
      
      // حفظ الرسالة في قاعدة البيانات
      await newMessage.save();
      
      // حساب عدد الرسائل الكلي
      const chatMessageModel = ChatMessage as Model<any>;
      const totalMessages = await chatMessageModel.countDocuments();
      
      // إذا تجاوز عدد الرسائل الحد الأقصى، نحذف الرسائل الأقدم
      if (totalMessages > MAX_MESSAGES) {
        const messagesToDelete = totalMessages - MAX_MESSAGES;
        
        // الحصول على أقدم الرسائل للحذف
        const oldestMessages = await chatMessageModel.find()
          .sort({ timestamp: 1 })
          .limit(messagesToDelete)
          .lean();
        
        // حذف الرسائل القديمة
        if (oldestMessages.length > 0) {
          const oldestIds = oldestMessages.map(msg => msg._id);
          await chatMessageModel.deleteMany({ _id: { $in: oldestIds } });
        }
      }
      
      // تحويل الوثيقة إلى كائن عادي وتحويل التاريخ إلى سلسلة نصية
      const savedMessage = {
        ...newMessage.toObject(),
        id: newMessage._id.toString(),
        timestamp: newMessage.timestamp.toISOString()
      };
      
      return NextResponse.json({ 
        success: true, 
        message: savedMessage
      });
    } catch (dbError) {
      console.error('Error saving message to database:', dbError);
      return NextResponse.json({ 
        success: false, 
        error: 'فشل في حفظ الرسالة في قاعدة البيانات' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending chat message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في إرسال رسالة الدردشة' 
    }, { status: 500 });
  }
} 