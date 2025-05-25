import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// توفير واجهة برمجة تطبيقات للدردشة
// يتم استخدامه مع Socket.IO أو كنقطة نهاية مباشرة للدردشة

export async function GET(request) {
  try {
    const messages = chatStore.getMessages(20);
    const activeUsers = chatStore.getActiveUsers();
    
    return NextResponse.json({
      success: true,
      messages,
      users: activeUsers
    });
  } catch (error) {
    console.error('Error fetching chat data from socket endpoint:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في جلب بيانات الدردشة'
    }, { status: 500 });
  }
}

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
    let user = chatStore.activeUsers.get(body.userId);
    if (!user) {
      // محاولة إعادة تسجيل المستخدم تلقائياً
      try {
        chatStore.addUser({
          userId: body.userId,
          nickname: body.sender,
          avatarId: body.senderAvatarId || 1,
          status: 'online'
        });
        
        user = chatStore.activeUsers.get(body.userId);
      } catch (error) {
        console.error('Error re-registering user:', error);
      }
    }
    
    // إنشاء رسالة جديدة
    const newMessage = {
      id: Date.now().toString(),
      message: body.message,
      sender: body.sender,
      userId: body.userId,
      senderAvatarId: body.senderAvatarId || 1,
      timestamp: new Date().toISOString(),
      interaction: {
        likes: [],
        isLiked: false
      }
    };
    
    try {
      // إضافة الرسالة إلى المخزن المشترك
      const addedMessage = chatStore.addMessage(newMessage);
      
      return NextResponse.json({
        success: true,
        message: addedMessage
      });
    } catch (error) {
      console.error('Error adding message to chat store:', error);
      
      // إذا كان المستخدم غير نشط، نقوم بإضافة الرسالة مباشرة
      if (error.message === 'المستخدم غير نشط') {
        // إضافة الرسالة مباشرة بدون التحقق من المستخدم
        const savedMessage = {
          id: `server-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          userId: body.userId,
          ...newMessage,
          timestamp: newMessage.timestamp,
          interaction: newMessage.interaction
        };
        
        chatStore.messages.push(savedMessage);
        
        // التحقق من عدم تجاوز الحد الأقصى
        if (chatStore.messages.length > chatStore.maxMessages) {
          chatStore.messages.shift();
        }
        
        return NextResponse.json({
          success: true,
          message: savedMessage
        });
      }
      
      return NextResponse.json({
        success: false,
        error: 'فشل في إضافة الرسالة إلى المخزن'
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