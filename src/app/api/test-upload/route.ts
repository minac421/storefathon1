import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * مسار API بسيط لاختبار رفع الصور
 */
export async function POST(request: NextRequest) {
  console.log('بدء اختبار رفع الصورة');
  
  try {
    const formData = await request.formData();
    console.log('تم استلام بيانات النموذج');
    
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error('خطأ: لم يتم توفير ملف صورة');
      return NextResponse.json(
        { error: 'لم يتم توفير ملف صورة' },
        { status: 400 }
      );
    }
    
    console.log('معلومات الملف:', {
      اسم: file.name,
      حجم: file.size,
      نوع: file.type
    });

    // قراءة البيانات من الملف
    console.log('جاري قراءة بيانات الملف...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('تم قراءة بيانات الملف بنجاح، الحجم:', buffer.length, 'بايت');

    // توليد اسم ملف فريد
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `test-${Date.now()}.${fileExtension}`;
    console.log('اسم الملف الذي سيتم حفظه:', fileName);
    
    // محاولة إنشاء مجلد الرفع بطريقة مختلفة
    const publicDir = join(process.cwd(), 'public');
    const uploadDir = join(publicDir, 'test-uploads');
    console.log('مسار مجلد الرفع:', uploadDir);
    
    try {
      // التأكد من وجود المجلد
      console.log('جاري التحقق من وجود مجلد public:', existsSync(publicDir) ? 'موجود' : 'غير موجود');
      
      if (!existsSync(uploadDir)) {
        console.log('مجلد الرفع غير موجود، جاري إنشاءه...');
        await mkdir(uploadDir, { recursive: true });
        console.log('تم إنشاء مجلد الرفع بنجاح');
      } else {
        console.log('مجلد الرفع موجود بالفعل');
      }
    } catch (dirError) {
      console.error('خطأ في إنشاء المجلد:', dirError);
      return NextResponse.json(
        { error: 'فشل في إنشاء مجلد الرفع: ' + (dirError as Error).message },
        { status: 500 }
      );
    }
    
    // حفظ الملف
    const filePath = join(uploadDir, fileName);
    console.log('مسار الملف الكامل:', filePath);
    
    try {
      await writeFile(filePath, buffer);
      console.log('تم حفظ الملف بنجاح');
    } catch (writeError) {
      console.error('خطأ أثناء حفظ الملف:', writeError);
      return NextResponse.json(
        { error: 'فشل في حفظ الملف: ' + (writeError as Error).message },
        { status: 500 }
      );
    }
    
    // إرجاع مسار الملف
    const fileUrl = `/test-uploads/${fileName}`;
    console.log('مسار الملف النهائي للعرض:', fileUrl);
    
    return NextResponse.json({ 
      success: true, 
      url: fileUrl 
    });
  } catch (error) {
    console.error('خطأ في رفع الصورة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء رفع الصورة: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 