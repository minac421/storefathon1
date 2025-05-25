import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// الحصول على الرسائل
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