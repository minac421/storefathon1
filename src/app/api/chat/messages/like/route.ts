import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ChatMessage from '@/models/ChatMessage';
import { chatStore } from '@/utils/chatStore';
import { Types, Model } from 'mongoose';

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
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'معرف المستخدم مطلوب' 
      }, { status: 400 });
    }
    
    try {
      // الاتصال بقاعدة البيانات
      await dbConnect();
      
      // البحث عن الرسالة في قاعدة البيانات
      const chatMessageModel = ChatMessage as Model<any>;
      const message = await chatMessageModel.findOne({ _id: new Types.ObjectId(messageId) });
      
      if (!message) {
        return NextResponse.json({ 
          success: false, 
          error: 'الرسالة غير موجودة' 
        }, { status: 404 });
      }
      
      // التحقق مما إذا كان المستخدم قد أعجب بالفعل بالرسالة
      const userLiked = message.interaction.likes.includes(userId);
      
      if (userLiked) {
        // إزالة الإعجاب
        message.interaction.likes = message.interaction.likes.filter((id: string) => id !== userId);
      } else {
        // إضافة الإعجاب
        message.interaction.likes.push(userId);
      }
      
      // حفظ التغييرات في قاعدة البيانات
      await message.save();
      
      // تحديث التفاعل في chatStore أيضًا
      try {
        chatStore.updateMessageInteraction(messageId, userId, !userLiked);
      } catch (storeError) {
        console.warn('Warning: Could not update message interaction in memory store:', storeError);
      }
      
      // تحويل الوثيقة إلى كائن عادي
      const messageObj = message.toObject();
      
      return NextResponse.json({ 
        success: true, 
        message: {
          ...messageObj,
          id: messageObj._id.toString(),
          timestamp: messageObj.timestamp.toISOString(),
          interaction: {
            ...messageObj.interaction,
            isLiked: !userLiked
          }
        }
      });
    } catch (dbError) {
      console.error('Error updating message in database:', dbError);
      return NextResponse.json({ 
        success: false, 
        error: 'فشل في تحديث الإعجاب في قاعدة البيانات' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error liking message:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في تحديث الإعجاب بالرسالة' 
    }, { status: 500 });
  }
} 