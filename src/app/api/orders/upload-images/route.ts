import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// البيئة الحالية (تطوير أو إنتاج)
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

// تهيئة مجلد التخزين المحلي
const LOCAL_STORAGE_DIR = path.join(process.cwd(), 'public', 'uploads');
const LOCAL_STORAGE_URL_PREFIX = '/uploads';

// إنشاء مجلد التخزين المحلي إذا لم يكن موجودًا
async function ensureLocalStorageDir() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      await fsPromises.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    }
  } catch (error) {
    console.error('خطأ في إنشاء مجلد التخزين المحلي:', error);
  }
}

// تهيئة خدمة التخزين - في بيئة الإنتاج نحتاج إلى تكوين مفاتيح للتخزين السحابي
// للاختبار المحلي، نقوم بتخزين الصور في مجلد public/uploads
// استخراج مميز الملف لتحديد نوع المحتوى
const getContentType = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg';
  }
};

const uploadImageToStorage = async (file: File, orderId: string, imageType: string): Promise<string> => {
  try {
    // التأكد من وجود مجلد التخزين
    await ensureLocalStorageDir();

    // الحصول على بيانات الملف كمصفوفة بايتات
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // إنشاء اسم ملف فريد
    const uniqueId = randomUUID();
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${imageType}_${uniqueId}.${fileExtension}`;
    const dirPath = path.join(LOCAL_STORAGE_DIR, orderId);
    const filePath = path.join(dirPath, fileName);

    console.log(`محاولة حفظ الصورة في المسار: ${filePath}`);

    // إنشاء مجلد الطلب إذا لم يكن موجودًا
    if (!fs.existsSync(dirPath)) {
      await fsPromises.mkdir(dirPath, { recursive: true });
      console.log(`تم إنشاء المجلد: ${dirPath}`);
    }

    // كتابة الملف
    await fsPromises.writeFile(filePath, buffer);
    console.log(`تم حفظ الملف بنجاح`);

    // استخدام مسار URL ثابت للتطوير والإنتاج
    const imageUrl = `${LOCAL_STORAGE_URL_PREFIX}/${orderId}/${fileName}`;
    console.log(`الرابط المحلي: ${imageUrl}`);
    
    return imageUrl;
  } catch (error) {
    console.error(`خطأ في رفع صورة ${imageType}:`, error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // استلام البيانات من النموذج
    const formData = await request.formData();
    const orderId = formData.get('orderId') as string;
    const coordImage = formData.get('coordImage') as File | null;
    const nameImage = formData.get('nameImage') as File | null;
    
    // التحقق من بيانات الطلب
    if (!orderId) {
      return NextResponse.json(
        { error: 'معرف الطلب مطلوب' },
        { status: 400 }
      );
    }
    
    console.log(`جاري معالجة رفع الصور للطلب ${orderId}`);
    if (coordImage) {
      console.log(`صورة الإحداثيات موجودة: ${coordImage.name} (${coordImage.size} bytes)`);
    }
    if (nameImage) {
      console.log(`صورة الاسم موجودة: ${nameImage.name} (${nameImage.size} bytes)`);
    }

    // روابط الصور
    let coordImageUrl: string | null = null;
    let nameImageUrl: string | null = null;

    // رفع الصور إذا وجدت
    if (coordImage && coordImage.size > 0) {
      try {
        coordImageUrl = await uploadImageToStorage(coordImage, orderId, 'coord');
        console.log(`تم رفع صورة الإحداثيات بنجاح: ${coordImageUrl}`);
      } catch (error) {
        console.error(`فشل رفع صورة الإحداثيات:`, error);
      }
    }

    if (nameImage && nameImage.size > 0) {
      try {
        nameImageUrl = await uploadImageToStorage(nameImage, orderId, 'name');
        console.log(`تم رفع صورة الاسم بنجاح: ${nameImageUrl}`);
      } catch (error) {
        console.error(`فشل رفع صورة الاسم:`, error);
      }
    }

    // التحقق من وجود الطلب قبل التحديث
    const order = await (OrderModel as Model<any>).findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: `لم يتم العثور على الطلب بالمعرف: ${orderId}` },
        { status: 404 }
      );
    }
    
    // تحديث وثيقة الطلب بالصور الجديدة
    const updateData: any = {
      'updatedAt': new Date()
    };
    
    // إضافة مسارات الصور فقط إذا تم رفعها بنجاح
    if (coordImageUrl) {
      updateData['images.coordImageUrl'] = coordImageUrl;
    }
    
    if (nameImageUrl) {
      updateData['images.nameImageUrl'] = nameImageUrl;
    }
    
    // تأكد من وجود كائن images إذا لم يكن موجودًا
    if (!order.images) {
      await (OrderModel as Model<any>).updateOne(
        { _id: orderId },
        { $set: { 'images': {} } }
      );
    }
    
    // تحديث الطلب بروابط الصور
    const updateResult = await (OrderModel as Model<any>).updateOne(
      { _id: orderId },
      { $set: updateData }
    );
    
    console.log(`نتيجة تحديث الطلب:`, updateResult);

    return NextResponse.json({ 
      success: true,
      message: 'تم رفع الصور بنجاح',
      orderId,
      images: {
        coordImageUrl,
        nameImageUrl
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('خطأ أثناء رفع الصور:', error);
    return NextResponse.json(
      { error: 'فشل رفع الصور', details: (error as Error).message },
      { status: 500 }
    );
  }
}
