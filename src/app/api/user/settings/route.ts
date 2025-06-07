import { NextRequest, NextResponse } from 'next/server';

// بيانات مؤقتة للمستخدمين (في نظام حقيقي، يتم استخدام قاعدة بيانات)
let userSettings: Record<string, {nickname: string; avatarId: number}> = {};

export async function GET(req: NextRequest) {
  try {
    // استخدام معرف المستخدم من الـ cookies (في تطبيق حقيقي، ستستخدم نظام المصادقة)
    const userId = req.cookies.get('userId')?.value || 'anonymous';
    
    // استرجاع إعدادات المستخدم
    const settings = userSettings[userId] || null;
    
    return NextResponse.json({ 
      success: true, 
      settings 
    });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في جلب إعدادات المستخدم' 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.cookies.get('userId')?.value || 'anonymous';
    const { nickname, avatarId } = await req.json();
    
    // التحقق من بيانات المستخدم
    if (!nickname || typeof nickname !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'يجب تحديد اسم مستعار صالح' 
      }, { status: 400 });
    }
    
    if (!avatarId || typeof avatarId !== 'number') {
      return NextResponse.json({ 
        success: false, 
        error: 'يجب اختيار صورة شخصية صالحة' 
      }, { status: 400 });
    }
    
    // حفظ بيانات المستخدم
    userSettings[userId] = { nickname, avatarId };
    
    // يمكن إضافة مزيد من المنطق هنا مثل حفظ البيانات في قاعدة بيانات
    
    return NextResponse.json({ 
      success: true, 
      settings: { nickname, avatarId } 
    });
  } catch (error) {
    console.error('Error saving user settings:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'فشل في حفظ إعدادات المستخدم' 
    }, { status: 500 });
  }
}
