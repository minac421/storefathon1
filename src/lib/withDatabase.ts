import dbConnect from './dbConnect';

// عدد المحاولات الإجمالية قبل الاستسلام
const MAX_RETRIES = 3;
// الفاصل الزمني بين المحاولات (بالمللي ثانية)
const RETRY_DELAY = 1000;

/**
 * وظيفة مُغلِّفة تتعامل مع اتصال قاعدة البيانات وإعادة المحاولات
 * 
 * @param fn الدالة المراد تنفيذها مع ضمان اتصال قاعدة البيانات
 * @param retries عدد مرات إعادة المحاولة في حالة فشل الاتصال (افتراضي 3)
 * @param delay الوقت بين المحاولات بالمللي ثانية (افتراضي 1000)
 * @returns نتيجة تنفيذ الدالة fn
 */
export async function withDatabase<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY
): Promise<T> {
  let lastError: Error | null = null;
  
  // طباعة معلومات إعادة المحاولة للتشخيص
  console.log(`🔄 دالة withDatabase تعمل مع ${retries} محاولات كحد أقصى وتأخير ${delay}ms`);
  
  // تنفيذ عدة محاولات
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔌 محاولة الاتصال بقاعدة البيانات (${attempt}/${retries})...`);
      
      // محاولة الاتصال بقاعدة البيانات
      const connection = await dbConnect();
      
      // التحقق من صحة الاتصال
      if (!connection || !connection.db) {
        throw new Error('فشل الاتصال بقاعدة البيانات: الاتصال فارغ أو غير مكتمل');
      }
      
      console.log(`✅ تم الاتصال بنجاح في المحاولة ${attempt}`);
      
      // بعد نجاح الاتصال، تنفيذ الدالة المطلوبة
      const result = await fn();
      return result;
    } catch (error) {
      lastError = error as Error;
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error && error.stack ? error.stack.split('\n').slice(0, 3).join('\n') : '';
      
      console.error(`❌ فشل في المحاولة ${attempt}/${retries}:`, errorMessage);
      console.error(`🔍 جزء من سياق الخطأ:`, errorStack);
      
      // تعيين وقت انتظار إضافي بناءً على رقم المحاولة - كل محاولة لاحقة تنتظر أطول
      const currentDelay = delay * Math.pow(1.5, attempt - 1);
      console.log(`⏱️ انتظار ${currentDelay}ms قبل المحاولة التالية...`);
      
      // إذا لم تكن هذه المحاولة الأخيرة، انتظر قبل المحاولة التالية
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, currentDelay));
      }
    }
  }
  
  // إذا وصلنا إلى هنا، فقد فشلت جميع المحاولات
  const errorMessage = lastError ? lastError.message : 'فشلت جميع محاولات الاتصال بقاعدة البيانات';
  console.error(`⛔ فشلت جميع المحاولات (${retries}). آخر خطأ:`, errorMessage);
  
  // إعادة رمي الخطأ الأخير
  throw lastError || new Error('فشلت جميع محاولات الاتصال بقاعدة البيانات لسبب غير معروف');
} 