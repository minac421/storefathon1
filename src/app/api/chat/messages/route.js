import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

// الحصول على الرسائل
export async function GET(request) {
  try {
    // الحصول على معلمات الاستعلام
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit')) || 50;
    
    // إرجاع الرسائل من المخزن المشترك
    return NextResponse.json({
      success: true,
      messages: chatStore.getMessages(limit)
    });
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في جلب رسائل الدردشة'
    }, { status: 500 });
  }
}

// إضافة رسالة جديدة
export async function POST(request) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المدخلة
    if (!body.message || !body.sender) {
      return NextResponse.json({
        success: false,
        error: 'بيانات غير مكتملة'
      }, { status: 400 });
    }
    
    // إنشاء رسالة جديدة
    const newMessage = {
      id: Date.now().toString(),
      message: body.message,
      sender: body.sender,
      senderAvatarId: body.senderAvatarId || 1,
      timestamp: new Date().toISOString(),
      interaction: {
        likes: [],
        isLiked: false
      }
    };
    
    // إضافة الرسالة إلى المخزن المشترك
    const addedMessage = chatStore.addMessage(newMessage);
    
    return NextResponse.json({
      success: true,
      message: addedMessage
    });
  } catch (error) {
    console.error('Error adding chat message:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في إضافة الرسالة'
    }, { status: 500 });
  }
} 