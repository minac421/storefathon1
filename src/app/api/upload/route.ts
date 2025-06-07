import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * مسار API لرفع الصور
 * يقوم بحفظ الصور في مجلد public/uploads
 */
export async function POST(request: NextRequest) {
  try {
    // استلام بيانات FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const id = formData.get('id') as string;

    if (!file || !category || !id) {
      return NextResponse.json(
        { error: 'يجب توفير الملف والفئة والمعرف' },
        { status: 400 }
      );
    }

    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'نوع الملف غير مدعوم. يجب أن يكون الملف صورة.' },
        { status: 400 }
      );
    }

    try {
      // إنشاء اسم ملف آمن
      const uniqueId = Date.now().toString();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${category}-${id}-${uniqueId}.${fileExtension}`;
      
      // التأكد من وجود المجلدات
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      const categoryDir = path.join(uploadsDir, category);
      
      try {
        await mkdir(uploadsDir, { recursive: true });
        await mkdir(categoryDir, { recursive: true });
      } catch (mkdirError) {
        console.error('خطأ في إنشاء المجلدات:', mkdirError);
      }
      
      // المسار الكامل للملف
      const filePath = path.join(categoryDir, fileName);
      
      // حفظ الملف
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      
      // إرجاع مسار الصورة النسبي للاستخدام في الموقع
      const imageUrl = `/uploads/${category}/${fileName}`;
      
      // إرجاع رابط الصورة
      return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (uploadError) {
      console.error('خطأ في رفع الصورة:', uploadError);
      return NextResponse.json(
        { error: 'فشل رفع الصورة: ' + (uploadError as Error).message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
} 