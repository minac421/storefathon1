import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CastleModel from '@/models/Castle';

export async function GET() {
  try {
    // محاولة الاتصال بقاعدة البيانات
    await dbConnect();
    
    // محاولة جلب عدد القلاع (لاختبار الاتصال)
    const count = await CastleModel.countDocuments({});
    
    // إرجاع استجابة ناجحة
    return NextResponse.json({ 
      success: true, 
      message: 'تم الاتصال بقاعدة البيانات بنجاح!',
      count: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('خطأ في اختبار الاتصال بقاعدة البيانات:', error);
    
    // إرجاع رسالة الخطأ
    return NextResponse.json({ 
      success: false, 
      message: 'فشل الاتصال بقاعدة البيانات', 
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
