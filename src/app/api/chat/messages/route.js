import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';

// الحصول على الرسائل
export async function GET(request) {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();
    
    // جلب آخر 50 رسالة مرتبة حسب الوقت (من الأقدم للأحدث)
    const dbMessages = await ChatMessage.find()
      .sort({ timestamp: 1 })
      .limit(50)
      .lean();
    
    // تحويل التواريخ إلى سلاسل نصية (ISO format)
    const messages = dbMessages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    
    const activeUsers = chatStore.getActiveUsers();
    
    return NextResponse.json({
      success: true,
      messages,
      users: activeUsers
    });
  } catch (error) {
    console.error('Error fetching chat data:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في جلب بيانات الدردشة'
    }, { status: 500 });
  }
}

// إضافة رسالة جديدة
export async function POST(request) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المدخلة
    if (!body.message || !body.sender || !body.userId) {
      return NextResponse.json({
        success: false,
        error: 'بيانات غير مكتملة - يرجى التأكد من إدخال الرسالة واسم المرسل ومعرف المستخدم'
      }, { status: 400 });
    }
    
    // التحقق من أن المستخدم نشط
    const user = chatStore.activeUsers.get(body.userId);
    if (!user) {
      // محاولة إعادة تسجيل المستخدم تلقائياً
      try {
        chatStore.addUser({
          userId: body.userId,
          nickname: body.sender,
          avatarId: body.senderAvatarId || 1,
          status: 'online'
        });
      } catch (error) {
        console.error('Error re-registering user:', error);
        return NextResponse.json({
          success: false,
          error: 'المستخدم غير نشط - يرجى تسجيل الدخول مرة أخرى'
        }, { status: 401 });
      }
    }
    
    try {
      // الاتصال بقاعدة البيانات
      await dbConnect();
      
      // إنشاء رسالة جديدة في قاعدة البيانات
      const newMessage = new ChatMessage({
        message: body.message,
        sender: body.sender,
        userId: body.userId,
        senderAvatarId: body.senderAvatarId || 1,
        timestamp: new Date(),
        interaction: {
          likes: [],
          isLiked: false
        }
      });
      
      // حفظ الرسالة في قاعدة البيانات
      await newMessage.save();
      
      // إضافة الرسالة أيضًا إلى المخزن المشترك للمستخدمين النشطين
      try {
        const messageForStore = {
          id: newMessage._id.toString(),
          message: newMessage.message,
          sender: newMessage.sender,
          userId: newMessage.userId,
          senderAvatarId: newMessage.senderAvatarId,
          timestamp: newMessage.timestamp.toISOString(),
          interaction: newMessage.interaction
        };
        
        chatStore.addMessage(messageForStore);
      } catch (storeError) {
        console.warn('Warning: Could not add message to in-memory store:', storeError);
      }
      
      // تحويل الوثيقة إلى كائن عادي وتحويل التاريخ إلى سلسلة نصية
      const savedMessage = newMessage.toJSON();
      savedMessage.timestamp = savedMessage.timestamp.toISOString();
      
      return NextResponse.json({
        success: true,
        message: savedMessage
      });
    } catch (error) {
      console.error('Error saving message to database:', error);
      return NextResponse.json({
        success: false,
        error: 'فشل في حفظ الرسالة في قاعدة البيانات'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'فشل في معالجة الرسالة'
    }, { status: 500 });
  }
} 