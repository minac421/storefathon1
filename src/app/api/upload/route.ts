import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * مسار API لرفع الصور
 * يقوم بحفظ الصور في مجلد public/uploads
 */
export async function POST(request: NextRequest) {
  console.log('بدء معالجة طلب رفع الصورة');
  
  try {
    const formData = await request.formData();
    console.log('تم استلام بيانات النموذج');
    
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const id = formData.get('id') as string;
    
    console.log('البيانات المستلمة:', {
      ملف: file ? `${file.name} (${file.size} بايت)` : 'غير موجود',
      فئة: category || 'غير موجودة',
      معرف: id || 'غير موجود'
    });

    if (!file) {
      console.error('خطأ: لم يتم توفير ملف صورة');
      return NextResponse.json(
        { error: 'لم يتم توفير ملف صورة' },
        { status: 400 }
      );
    }

    if (!category || !id) {
      console.error('خطأ: لم يتم توفير معرف أو فئة المنتج');
      return NextResponse.json(
        { error: 'لم يتم توفير معرف أو فئة المنتج' },
        { status: 400 }
      );
    }

    // قراءة البيانات من الملف
    console.log('جاري قراءة بيانات الملف...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('تم قراءة بيانات الملف بنجاح، الحجم:', buffer.length, 'بايت');

    // توليد اسم ملف فريد
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${category}-${id}-${Date.now()}.${fileExtension}`;
    console.log('اسم الملف الذي سيتم حفظه:', fileName);
    
    // إنشاء مسار الدليل
    const publicDir = join(process.cwd(), 'public');
    const uploadDir = join(publicDir, 'uploads');
    const categoryDir = join(uploadDir, category);
    console.log('مسار مجلد public:', publicDir);
    console.log('مسار مجلد الرفع:', uploadDir);
    console.log('مسار مجلد الفئة:', categoryDir);
    
    // التحقق من وجود مجلد public
    if (!existsSync(publicDir)) {
      console.error('خطأ: مجلد public غير موجود!');
      try {
        // محاولة إنشاء مجلد public
        await mkdir(publicDir, { recursive: true });
        console.log('تم إنشاء مجلد public بنجاح');
      } catch (mkdirError) {
        console.error('فشل إنشاء مجلد public:', mkdirError);
        throw new Error('مجلد public غير موجود ولا يمكن إنشاؤه');
      }
    }
    
    console.log('محتويات مجلد public:', await readdir(publicDir));
    
    // التأكد من وجود مجلد الرفع
    try {
      if (!existsSync(uploadDir)) {
        console.log('مجلد الرفع غير موجود، جاري إنشاءه...');
        await mkdir(uploadDir, { recursive: true });
        console.log('تم إنشاء مجلد الرفع بنجاح');
      } else {
        console.log('مجلد الرفع موجود بالفعل');
      }
      
      // إنشاء مجلد للفئة إذا لم يكن موجودًا
      if (!existsSync(categoryDir)) {
        console.log(`مجلد الفئة ${category} غير موجود، جاري إنشاءه...`);
        await mkdir(categoryDir, { recursive: true });
        console.log(`تم إنشاء مجلد الفئة ${category} بنجاح`);
      } else {
        console.log(`مجلد الفئة ${category} موجود بالفعل`);
      }
    } catch (dirError) {
      console.error('خطأ في إنشاء مجلدات الرفع:', dirError);
      throw new Error('فشل في إنشاء مجلدات الرفع: ' + (dirError as Error).message);
    }
    
    // حفظ الملف في مجلد الفئة
    const filePath = join(categoryDir, fileName);
    console.log('مسار الملف الكامل:', filePath);
    
    try {
      await writeFile(filePath, buffer);
      console.log('تم حفظ الملف بنجاح');
      
      // التحقق من أن الملف تم حفظه بالفعل
      if (existsSync(filePath)) {
        console.log('✅ تم التحقق من وجود الملف بعد الحفظ');
        
        // محاولة قراءة المحتويات للتأكد من صحة الملف
        try {
          const stats = await readdir(categoryDir);
          console.log(`محتويات مجلد الفئة ${category} بعد الحفظ:`, stats);
        } catch (readError) {
          console.error('تحذير: لا يمكن قراءة محتويات مجلد الفئة:', readError);
        }
      } else {
        console.error('❌ خطأ: الملف غير موجود بعد محاولة الحفظ!');
        throw new Error('فشل في التحقق من وجود الملف بعد الحفظ');
      }
    } catch (error) {
      console.error('خطأ أثناء حفظ الملف:', error);
      throw new Error('فشل في حفظ الملف: ' + (error as Error).message);
    }
    
    // إرجاع مسار الملف
    const fileUrl = `/uploads/${category}/${fileName}`;
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