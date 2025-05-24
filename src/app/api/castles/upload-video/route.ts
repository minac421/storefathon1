import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

// البيئة الحالية (تطوير أو إنتاج)
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

// تهيئة مجلد التخزين المحلي
const LOCAL_STORAGE_DIR = path.join(process.cwd(), 'public', 'uploads', 'videos');
const LOCAL_STORAGE_URL_PREFIX = '/uploads/videos';

// إنشاء مجلد التخزين المحلي إذا لم يكن موجودًا
async function ensureLocalStorageDir() {
  try {
    console.log(`جاري التحقق من مجلد التخزين: ${LOCAL_STORAGE_DIR}`);
    
    // التحقق من وجود مجلد uploads أولاً
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      console.log(`إنشاء مجلد uploads: ${uploadsDir}`);
      await fsPromises.mkdir(uploadsDir, { recursive: true });
    }
    
    // التحقق من وجود مجلد videos داخل uploads
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      console.log(`إنشاء مجلد videos: ${LOCAL_STORAGE_DIR}`);
      await fsPromises.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    }
    
    console.log(`تم التحقق من وجود مجلد التخزين بنجاح`);
  } catch (error) {
    console.error('خطأ في إنشاء مجلد التخزين المحلي:', error);
  }
}

// استخراج مميز الملف لتحديد نوع المحتوى
const getContentType = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'avi':
      return 'video/x-msvideo';
    case 'mov':
      return 'video/quicktime';
    default:
      return 'video/mp4';
  }
};

// تهيئة خدمة التخزين للفيديو
const uploadVideoToStorage = async (file: File, castleId: string): Promise<{ url: string, contentType: string }> => {
  try {
    // التأكد من وجود مجلد التخزين
    await ensureLocalStorageDir();

    // الحصول على بيانات الملف كمصفوفة بايتات
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // إنشاء اسم ملف فريد
    const uniqueId = randomUUID();
    const fileExtension = file.name.split('.').pop() || 'mp4';
    const fileName = `castle_${castleId}_${uniqueId}.${fileExtension}`;
    const filePath = path.join(LOCAL_STORAGE_DIR, fileName);

    // كتابة الملف
    await fsPromises.writeFile(filePath, buffer);
    
    const contentType = getContentType(file.name);

    // في بيئة التطوير، نعيد مسار الملف المحلي
    if (IS_DEVELOPMENT) {
      // للفيديو نستخدم المسار المحلي حتى في التطوير وليس base64 (لأن base64 سيكون كبيرًا جدًا للفيديو)
      const videoUrl = `${LOCAL_STORAGE_URL_PREFIX}/${fileName}`;
      console.log(`تم حفظ الفيديو في: ${filePath}`);
      console.log(`الرابط المحلي: ${videoUrl}`);
      return { url: videoUrl, contentType };
    } else {
      // في الإنتاج، استخدام المسار العادي
      const videoUrl = `${LOCAL_STORAGE_URL_PREFIX}/${fileName}`;
      console.log(`تم حفظ الفيديو في: ${filePath}`);
      console.log(`الرابط المحلي: ${videoUrl}`);
      return { url: videoUrl, contentType };
      
      // يمكن تنشيط هذا لخدمة التخزين السحابي في الإنتاج
      // return { url: `https://storage.example.com/videos/${fileName}`, contentType };
    }
  } catch (error) {
    console.error(`خطأ في رفع الفيديو:`, error);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // استلام البيانات من النموذج
    const formData = await request.formData();
    const castleId = formData.get('castleId') as string;
    const videoFile = formData.get('video') as File | null;
    const videoTitle = formData.get('videoTitle') as string || 'Castle Video';
    
    // التحقق من البيانات
    if (!castleId) {
      return NextResponse.json(
        { error: 'معرف القلعة مطلوب' },
        { status: 400 }
      );
    }

    if (!videoFile) {
      return NextResponse.json(
        { error: 'ملف الفيديو مطلوب' },
        { status: 400 }
      );
    }
    
    console.log(`جاري معالجة رفع الفيديو للقلعة ${castleId}`);
    console.log(`الفيديو المرفوع: ${videoFile.name} (${videoFile.size} bytes)`);

    // رفع الفيديو
    const { url: videoUrl, contentType } = await uploadVideoToStorage(videoFile, castleId);

    // إرجاع البيانات للواجهة
    return NextResponse.json({ 
      success: true,
      message: 'تم رفع الفيديو بنجاح',
      castleId,
      videoData: {
        url: videoUrl,
        title: videoTitle,
        contentType
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('خطأ أثناء رفع الفيديو:', error);
    return NextResponse.json(
      { error: 'فشل رفع الفيديو' },
      { status: 500 }
    );
  }
}
