import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// توفير واجهة برمجة تطبيقات للدردشة
// يتم استخدامه مع Socket.IO أو كنقطة نهاية مباشرة للدردشة

export async function GET(request) {
  try {
    // قراءة آخر الرسائل - افتراضياً 20 رسالة
    const messages = chatStore.getMessages(20);
    
    // إنشاء قائمة المستخدمين المتصلين من الرسائل الفعلية فقط
    const users = Array.from(new Set(messages.map(msg => msg.sender)))
      .filter(username => username) // تأكد من أن اسم المستخدم موجود
      .map(username => {
        const matchingMsg = messages.find(msg => msg.sender === username);
        return {
          name: username,
          avatarId: matchingMsg?.senderAvatarId || 1,
          status: 'online'
        };
      });
    
    return NextResponse.json({
      success: true,
      messages,
      users,
      mode: 'api',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في جلب بيانات الدردشة',
      mode: 'error'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // التحقق من وجود البيانات المطلوبة
    if (!body.message || !body.sender) {
      return NextResponse.json({ 
        success: false, 
        error: 'بيانات غير مكتملة',
        mode: 'error'
      }, { status: 400 });
    }
    
    // إضافة رسالة جديدة عبر المخزن المشترك
    const newMessage = {
      message: body.message,
      sender: body.sender,
      senderAvatarId: body.senderAvatarId || 1,
      timestamp: new Date().toISOString(),
      interaction: {
        likes: [],
        isLiked: false
      }
    };
    
    const savedMessage = chatStore.addMessage(newMessage);
    
    return NextResponse.json({
      success: true,
      message: savedMessage,
      mode: 'api'
    });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في إضافة الرسالة',
      mode: 'error'
    }, { status: 500 });
  }
} 