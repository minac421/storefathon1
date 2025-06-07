import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// توفير واجهة برمجة تطبيقات احتياطية للدردشة عندما يفشل Socket.IO
// هذا يمكن أن يساعد في تقليل أخطاء xhr poll error

export async function GET(request) {
  try {
    // قراءة آخر الرسائل
    const messages = chatStore.getMessages(20);
    
    return NextResponse.json({
      success: true,
      messages,
      mode: 'fallback',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching fallback messages:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في جلب بيانات الدردشة الاحتياطية',
      mode: 'error'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
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
      mode: 'fallback'
    });
  } catch (error) {
    console.error('Error adding fallback message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في إضافة الرسالة',
      mode: 'error'
    }, { status: 500 });
  }
} 