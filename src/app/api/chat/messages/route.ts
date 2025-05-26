import { NextRequest, NextResponse } from 'next/server';

// تخزين مؤقت للرسائل (في نظام حقيقي، سيتم استخدام قاعدة بيانات)
let chatMessages: any[] = [];

// الحد الأقصى لعدد الرسائل المخزنة
const MAX_MESSAGES = 50;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get('limit') || '50');
    
    // استرجاع الرسائل، مرتبة من الأحدث إلى الأقدم ثم عكسها
    const messages = [...chatMessages]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
      .reverse();
    
    return NextResponse.json({ 
      success: true, 
      messages
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
    const { message, sender, senderAvatarId } = await req.json();
    
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
    
    // إنشاء رسالة جديدة
    const newMessage = {
      id: Date.now().toString(),
      sender,
      senderAvatarId,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      interaction: {
        likes: [],
        isLiked: false
      }
    };
    
    // إضافة الرسالة إلى المجموعة
    chatMessages.push(newMessage);
    
    // التأكد من عدم تجاوز الحد الأقصى للرسائل
    if (chatMessages.length > MAX_MESSAGES) {
      // إزالة الرسائل الأقدم
      chatMessages = chatMessages.slice(-MAX_MESSAGES);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: newMessage
    });
  } catch (error) {
    console.error('Error sending chat message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في إرسال رسالة الدردشة' 
    }, { status: 500 });
  }
} 