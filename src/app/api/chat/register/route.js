import { NextResponse } from 'next/server';
import { chatStore } from '@/utils/chatStore';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // التحقق من البيانات المطلوبة
    if (!body.nickname || !body.userId) {
      return NextResponse.json({
        success: false,
        error: 'بيانات غير مكتملة - يرجى التأكد من إدخال اسم المستخدم ومعرف المستخدم'
      }, { status: 400 });
    }
    
    // تسجيل المستخدم في نظام الشات
    const userId = chatStore.addUser({
      userId: body.userId,
      nickname: body.nickname,
      avatarId: body.avatarId || 1,
      status: 'online'
    });
    
    return NextResponse.json({
      success: true,
      userId,
      message: 'تم تسجيل المستخدم بنجاح'
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في تسجيل المستخدم'
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    
    if (!body.userId) {
      return NextResponse.json({
        success: false,
        error: 'معرف المستخدم مطلوب'
      }, { status: 400 });
    }
    
    // إزالة المستخدم من نظام الشات
    chatStore.removeUser(body.userId);
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل خروج المستخدم بنجاح'
    });
  } catch (error) {
    console.error('Error unregistering user:', error);
    return NextResponse.json({
      success: false,
      error: 'فشل في تسجيل خروج المستخدم'
    }, { status: 500 });
  }
} 