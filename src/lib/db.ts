import mongoose from 'mongoose';

/**
 * اتصال عمومي بقاعدة البيانات
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/conquerors-website';

// معالجة الخطأ ليست خطيرة في البيئة التجريبية
if (!MONGODB_URI) {
  console.warn('تحذير: تأكد من تعيين متغير البيئة MONGODB_URI في ملف .env أو .env.local');
}

/**
 * حالة الاتصال العمومية
 */
const globalConnectionState = {
  isConnected: false,
};

/**
 * إنشاء اتصال بقاعدة البيانات
 */
export const connectToDatabase = async () => {
  if (globalConnectionState.isConnected) {
    console.log('🌐 استخدام اتصال موجود بقاعدة البيانات');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    
    globalConnectionState.isConnected = db.connections[0].readyState === 1;
    console.log('✅ تم الاتصال بقاعدة البيانات MongoDB بنجاح');
  } catch (error) {
    console.error('❌ خطأ في الاتصال بقاعدة البيانات:', error);
    throw new Error('فشل الاتصال بقاعدة البيانات');
  }
};

/**
 * قطع الاتصال بقاعدة البيانات
 */
export const disconnectFromDatabase = async () => {
  // لا داعي لقطع الاتصال في بيئة الإنتاج حيث يتم إعادة استخدام الاتصالات
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  
  if (globalConnectionState.isConnected) {
    await mongoose.disconnect();
    globalConnectionState.isConnected = false;
    console.log('🔌 تم قطع الاتصال بقاعدة البيانات');
  }
};

/**
 * هذه الوظيفة تضمن الاتصال بقاعدة البيانات قبل تنفيذ دالة معينة
 * وهي مفيدة في وظائف API
 */
export const withDatabase = async (callback: Function) => {
  try {
    await connectToDatabase();
    return await callback();
  } finally {
    if (process.env.NODE_ENV !== 'production') {
      await disconnectFromDatabase();
    }
  }
};

// للاستخدام المباشر في مكونات خادم Next.js
export default mongoose;
