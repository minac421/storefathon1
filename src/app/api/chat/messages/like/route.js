import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';
import { chatStore } from '@/utils/chatStore';

// التعامل مع الإعجاب بالرسائل
export async function POST(request) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المدخلة
    if (!body.messageId || !body.userId) {
      return NextResponse.json({
        success: false,
        error: 'بيانات غير مكتملة - يرجى توفير معرف الرسالة ومعرف المستخدم'
      }, { status: 400 });
    }
    
    try {
      // الاتصال بقاعدة البيانات
      await dbConnect();
      
      // البحث عن الرسالة في قاعدة البيانات
      const message = await ChatMessage.findById(body.messageId);
      
      if (!message) {
        return NextResponse.json({
          success: false,
          error: 'لم يتم العثور على الرسالة'
        }, { status: 404 });
      }
      
      // التحقق من وجود معرف المستخدم في قائمة الإعجابات
      const hasLiked = message.interaction.likes.includes(body.userId);
      
      if (hasLiked) {
        // إزالة المستخدم من قائمة الإعجابات
        message.interaction.likes = message.interaction.likes.filter(id => id !== body.userId);
      } else {
        // إضافة المستخدم إلى قائمة الإعجابات
        message.interaction.likes.push(body.userId);
      }
      
      // حفظ التغييرات
      await message.save();
      
      // تحديث المخزن المشترك أيضًا للمستخدمين النشطين
      try {
        chatStore.updateMessageInteraction(body.messageId, body.userId, !hasLiked);
      } catch (storeError) {
        console.warn('Warning: Could not update message interaction in memory store:', storeError);
      }
      
      return NextResponse.json({
        success: true,
        liked: !hasLiked,
        message: message.toJSON()
      });
    } catch (dbError) {
      console.error('Error updating message in database:', dbError);
      return NextResponse.json({
        success: false,
        error: 'فشل في تحديث الإعجاب في قاعدة البيانات'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing like request:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'فشل في معالجة طلب الإعجاب'
    }, { status: 500 });
  }
} 