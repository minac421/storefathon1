import mongoose from 'mongoose';

// الرابط الخاص بقاعدة البيانات MongoDB Atlas - استخدم المتغير البيئي أولاً
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone';

/**
 * تعريف حالات الاتصال لقاعدة البيانات
 */
// يجب استخدام نفس القيم العددية التي يستخدمها Mongoose
const MONGOOSE_STATES = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3,
} as const;

// ترجمة حالات الاتصال إلى العربية
const CONNECTION_STATE_NAMES = [
  'منفصل',        // 0
  'متصل',         // 1
  'جاري الاتصال', // 2
  'جاري الانفصال' // 3
];

/**
 * الاتصال العمومي بقاعدة البيانات
 * سيتم استخدامه في جميع أنحاء التطبيق
 * 
 * ملاحظة هامة: يجب التأكد من أن الإعدادات الأمنية في MongoDB Atlas تسمح باتصال من IP الخادم
 * تأكد من إضافة IP الخادم في Network Access في MongoDB Atlas
 * وإذا كنت تستخدم Vercel، فتأكد من إضافة 0.0.0.0/0 للسماح بالوصول من جميع عناوين IP
 */
if (!MONGODB_URI) {
  throw new Error('يرجى تحديد رابط MONGODB_URI في ملف .env.local');
}

/**
 * متغير عمومي للحالة في النطاق العمومي
 * لمنع إعادة الاتصال في كل مرة يتم فيها استخدام الدالة
 */
interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
  errorCount: number;
  lastErrorTime: number | null;
}

declare global {
  // eslint-disable-next-line
  var mongoose: { 
    conn: mongoose.Connection | null; 
    promise: Promise<mongoose.Connection> | null;
    errorCount: number;
    lastErrorTime: number | null;
  };
}

// تهيئة الكاش العمومي
let cached: Cached = global.mongoose as Cached;

if (!cached) {
  cached = global.mongoose = { 
    conn: null, 
    promise: null, 
    errorCount: 0,
    lastErrorTime: null 
  };
}

/**
 * دالة الاتصال بقاعدة البيانات
 * تعيد اتصال قاعدة البيانات أو ترمي خطأ إذا فشل الاتصال بعد عدة محاولات
 */
async function dbConnect(): Promise<mongoose.Connection> {
  // التحقق إذا كان الاتصال موجودًا بالفعل
  if (cached.conn) {
    // اختبار الاتصال القائم
    try {
      const currentState = cached.conn.readyState;
      
      if (currentState === MONGOOSE_STATES.connected) {
        return cached.conn;
      } else {
        console.log(`⚠️ حالة الاتصال بقاعدة البيانات غير صالحة (readyState=${currentState})، إعادة الاتصال...`);
        cached.conn = null;
        cached.promise = null;
      }
    } catch (connError) {
      console.error('❌ خطأ عند فحص حالة الاتصال الحالي:', connError);
      cached.conn = null;
      cached.promise = null;
    }
  }

  // التحقق من وقت حدوث آخر خطأ - إعادة ضبط عداد الأخطاء إذا مر وقت كافٍ
  if (cached.lastErrorTime && Date.now() - cached.lastErrorTime > 60000) {
    console.log('🔄 إعادة ضبط عداد الأخطاء بعد مرور دقيقة');
    cached.errorCount = 0;
    cached.lastErrorTime = null;
  }

  // التحقق من عدد المحاولات المتكررة
  if (cached.errorCount > 5) {
    const timeSinceLastError = cached.lastErrorTime ? Math.floor((Date.now() - cached.lastErrorTime) / 1000) : 0;
    console.error(`⛔ تجاوز الحد الأقصى لمحاولات الاتصال (${cached.errorCount}). آخر محاولة منذ ${timeSinceLastError} ثانية.`);
    
    // إعادة تعيين العداد بعد 1 دقيقة
    if (timeSinceLastError > 60) {
      console.log('🔄 إعادة ضبط عداد محاولات الاتصال بعد فترة انتظار');
      cached.errorCount = 0;
    } else {
      throw new Error(`تجاوز الحد الأقصى لمحاولات الاتصال بقاعدة البيانات. حاول مرة أخرى لاحقًا (${Math.max(0, 60 - timeSinceLastError)} ثانية متبقية)`);
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 20000, // زيادة مهلة اتصال السيرفر إلى 20 ثانية
      connectTimeoutMS: 20000, // زيادة مهلة الاتصال إلى 20 ثانية
      socketTimeoutMS: 60000, // زيادة مهلة انتهاء مدة البحث عن السيرفر إلى 60 ثانية
      family: 4, // استخدام IPv4 بدلاً من IPv6
      maxPoolSize: 10, // تحديد الحد الأقصى لعدد الاتصالات في المجمع
      retryWrites: true, // إعادة محاولة الكتابة تلقائيًا
      retryReads: true, // إعادة محاولة القراءة تلقائيًا
    };

    // طباعة الرابط للتحقق منه (مع إخفاء كلمة المرور للأمان)
    const sanitizedUri = MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+):[^@]+@/, '$1:****@');
    console.log('🔍 محاولة الاتصال بـ:', sanitizedUri);
    
    // معالجة الاتصال بشكل أفضل
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        const connection = mongoose.connection;
        console.log(`🌿 تم الاتصال بقاعدة البيانات MongoDB بنجاح! (${connection.name})`);
        
        // إضافة مستمع لأحداث الخطأ
        connection.on('error', (err) => {
          console.error('❌ خطأ في اتصال قاعدة البيانات خلال التشغيل:', err);
        });
        
        connection.on('disconnected', () => {
          console.warn('⚠️ انقطع الاتصال بقاعدة البيانات');
          cached.conn = null;
        });
        
        // إعادة تعيين عداد الأخطاء عند نجاح الاتصال
        cached.errorCount = 0;
        cached.lastErrorTime = null;
        return connection;
      })
      .catch((error) => {
        // زيادة عداد الأخطاء وتسجيل وقت آخر خطأ
        cached.errorCount++;
        cached.lastErrorTime = Date.now();
        
        console.error('❌ خطأ في الاتصال بقاعدة البيانات MongoDB:', error.message);
        
        // تحقق من نوع الخطأ وتقديم رسائل مفيدة
        if (error.name === 'MongoServerSelectionError') {
          console.error('⚠️ خطأ اختيار السيرفر: تأكد من أن عنوان IP الخاص بك مسموح به في إعدادات الأمان لـ MongoDB Atlas');
          console.error('💡 اقتراح: اضبط Network Access في MongoDB Atlas للسماح لـ 0.0.0.0/0 للاختبار');
        }
        if (error.message.includes('Authentication failed')) {
          console.error('🔑 فشل المصادقة: تأكد من صحة اسم المستخدم وكلمة المرور');
        }
        if (error.message.includes('getaddrinfo')) {
          console.error('🌐 خطأ DNS: تأكد من اسم النطاق الصحيح وتوفر اتصال الإنترنت');
        }
        
        // إعادة تعيين الوعد للسماح بالمحاولة التالية
        cached.promise = null;
        throw error;
      });
  } else {
    console.log('♻️ استخدام وعد اتصال موجود');
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // إعادة ضبط الوعد في حالة حدوث خطأ
    cached.promise = null;
    throw e;
  }

  // التحقق من حالة الاتصال
  const connectionState = cached.conn.readyState;
  
  if (connectionState !== MONGOOSE_STATES.connected) {
    console.warn(`⚠️ حالة الاتصال غير متوقعة: ${connectionState}`);
    
    // عرض اسم حالة الاتصال
    const stateName = CONNECTION_STATE_NAMES[connectionState] || 'غير معروفة';
    console.warn(`📊 حالة الاتصال: ${stateName}`);
    
    // إذا كانت الحالة "جاري الاتصال"، انتظر قليلاً
    if (connectionState === MONGOOSE_STATES.connecting) {
      console.log('⏳ جاري الاتصال، الانتظار...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // التحقق مرة أخرى بعد الانتظار
      const newState = cached.conn.readyState;
      if (newState === MONGOOSE_STATES.connected) {
        console.log('✅ تم الاتصال بنجاح بعد الانتظار');
      } else {
        const newStateName = CONNECTION_STATE_NAMES[newState] || 'غير معروفة';
        console.warn(`⚠️ لا يزال الاتصال في حالة غير متوقعة: ${newState} (${newStateName})`);
      }
    }
  }

  return cached.conn;
}

export default dbConnect;
