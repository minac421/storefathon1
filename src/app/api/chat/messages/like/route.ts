import { NextRequest, NextResponse } from 'next/server';
import { createMockMessages } from '@/utils/mockData';

// استخدام نفس مصدر البيانات للرسائل المستخدم في API الرسائل
// في بيئة حقيقية، سيتم استخدام قاعدة بيانات
// نحن نستخدم المتغير المستورد من ملف آخر، لذا فإن التغييرات ستكون محلية وستُفقد عند إعادة تشغيل الخادم
// ولكن هذه نسخة تجريبية
let chatMessages: any[] = [];

// استدعاء الدالة المعدة مسبقًا إذا كانت المصفوفة فارغة
if (chatMessages.length === 0) {
  chatMessages = createMockMessages();
}

export async function POST(req: NextRequest) {
  try {
    const { messageId, userId } = await req.json();
    
    // التحقق من البيانات المدخلة
    if (!messageId) {
      return NextResponse.json({ 
        success: false, 
        error: 'معرف الرسالة مطلوب' 
      }, { status: 400 });
    }
    
    // البحث عن الرسالة
    const messageIndex = chatMessages.findIndex(m => m.id === messageId);
    
    if (messageIndex === -1) {
      return NextResponse.json({ 
        success: false, 
        error: 'الرسالة غير موجودة' 
      }, { status: 404 });
    }
    
    // تحديث الإعجاب
    const message = chatMessages[messageIndex];
    
    // التحقق مما إذا كان المستخدم قد أعجب بالفعل بالرسالة
    const userLiked = message.interaction.likes.includes(userId);
    
    if (userLiked) {
      // إزالة الإعجاب
      message.interaction.likes = message.interaction.likes.filter((id: string) => id !== userId);
    } else {
      // إضافة الإعجاب
      message.interaction.likes.push(userId);
    }
    
    // تحديث الرسالة
    chatMessages[messageIndex] = message;
    
    return NextResponse.json({ 
      success: true, 
      message: {
        ...message,
        interaction: {
          ...message.interaction,
          isLiked: !userLiked
        }
      }
    });
  } catch (error) {
    console.error('Error liking message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في تحديث الإعجاب بالرسالة' 
    }, { status: 500 });
  }
} 