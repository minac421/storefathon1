import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

export async function POST(req) {
  try {
    const { messageId, userId } = await req.json();
    
    // التحقق من البيانات المدخلة
    if (!messageId) {
      return NextResponse.json({ 
        success: false, 
        error: 'معرف الرسالة مطلوب' 
      }, { status: 400 });
    }
    
    // استخدام مخزن الدردشة لتبديل الإعجاب
    const updatedMessage = chatStore.toggleLike(messageId, userId);
    
    if (!updatedMessage) {
      return NextResponse.json({ 
        success: false, 
        error: 'الرسالة غير موجودة' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: updatedMessage
    });
  } catch (error) {
    console.error('Error liking message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في تحديث الإعجاب بالرسالة' 
    }, { status: 500 });
  }
} 