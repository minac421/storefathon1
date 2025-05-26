import { NextRequest, NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { Model } from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();
    
    // التحقق من البيانات المدخلة
    if (!userData || !userData.nickname) {
      return NextResponse.json({
        success: false,
        error: 'بيانات المستخدم غير مكتملة - الاسم المستعار مطلوب'
      }, { status: 400 });
    }
    
    // التأكد من وجود معرف المستخدم
    if (!userData.userId) {
      userData.userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // التأكد من وجود معرف الأفاتار
    if (!userData.avatarId) {
      userData.avatarId = 1;
    }
    
    try {
      // إضافة المستخدم إلى قائمة المستخدمين النشطين
      const userId = chatStore.addUser({
        userId: userData.userId,
        nickname: userData.nickname,
        avatarId: userData.avatarId,
        status: 'online'
      });
      
      // محاولة تحديث/إنشاء المستخدم في قاعدة البيانات إذا كانت متوفرة
      try {
        await dbConnect();
        
        // البحث عن المستخدم بواسطة معرف المستخدم وتحديثه، أو إنشاء مستخدم جديد إذا لم يكن موجوداً
        const userModel = User as Model<any>;
        await userModel.findOneAndUpdate(
          { userId: userData.userId },
          {
            $set: {
              nickname: userData.nickname,
              avatarId: userData.avatarId,
              lastSeen: new Date(),
              status: 'online'
            }
          },
          { upsert: true, new: true }
        );
      } catch (dbError) {
        console.warn('تعذر تحديث المستخدم في قاعدة البيانات:', dbError);
        // نستمر حتى لو فشل الاتصال بقاعدة البيانات
      }
      
      // جلب قائمة المستخدمين النشطين
      const activeUsers = chatStore.getActiveUsers();
      
      return NextResponse.json({
        success: true,
        userId,
        activeUsers
      });
    } catch (error) {
      console.error('خطأ في تسجيل المستخدم:', error);
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'فشل في تسجيل المستخدم'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('خطأ في معالجة طلب التسجيل:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في معالجة طلب التسجيل'
    }, { status: 500 });
  }
} 