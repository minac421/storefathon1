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

    // إنشاء مجلد الطلب إذا لم يكن موجودًا
    if (!fs.existsSync(dirPath)) {
      await fsPromises.mkdir(dirPath, { recursive: true });
    }

    // كتابة الملف
    await fsPromises.writeFile(filePath, buffer);

    // في التطوير، نرجع الصورة كشفرة base64 لتجنب مشاكل المسارات
    if (IS_DEVELOPMENT) {
      const contentType = getContentType(file.name);
      const base64Data = buffer.toString('base64');
      const dataUrl = `data:${contentType};base64,${base64Data}`;
      console.log(`تم تحويل الصورة إلى شفرة base64`);
      return dataUrl;
    } else {
      // في الإنتاج، نستخدم مسار الملف العادي
      const imageUrl = `${LOCAL_STORAGE_URL_PREFIX}/${orderId}/${fileName}`;
      console.log(`تم حفظ الصورة في: ${filePath}`);
      console.log(`الرابط المحلي: ${imageUrl}`);
      return imageUrl;
    }
    
    // لاستخدام خدمة سحابية في الإنتاج (يمكن تنشيط هذا الجزء لاحقًا)
    // return `https://storage.example.com/orders/${orderId}/${imageType}_${uniqueId}.${fileExtension}`;
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
    if (coordImage) {
      coordImageUrl = await uploadImageToStorage(coordImage, orderId, 'coord');
    }

    if (nameImage) {
      nameImageUrl = await uploadImageToStorage(nameImage, orderId, 'name');
    }

    // التحقق من وجود الطلب قبل التحديث
    const order = await (OrderModel as Model<any>).findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: `لم يتم العثور على الطلب بالمعرف: ${orderId}` },
        { status: 404 }
      );
    }
    
    // تحديث الطلب بروابط الصور
    const updateResult = await (OrderModel as Model<any>).updateOne(
      { _id: orderId },
      {
        $set: {
          'images.coordImageUrl': coordImageUrl,
          'images.nameImageUrl': nameImageUrl,
          'updatedAt': new Date()
        }
      }
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
      { error: 'فشل رفع الصور' },
      { status: 500 }
    );
  }
}
