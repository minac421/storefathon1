import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { headers as getHeaders, cookies as getCookies } from 'next/headers';

// رابط الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

// دالة مساعدة للتحقق من صحة الإحالة
async function validateReferral(referrerCastleIP, visitorData, db) {
  // 1. التحقق من أن المُحيل موجود وصالح
  const participantsCollection = db.collection('participants');
  const referrer = await participantsCollection.findOne({ castleIP: referrerCastleIP });
  
  if (!referrer) {
    return { isValid: false, message: 'لم يتم العثور على المستخدم المُحيل' };
  }
  
  // 2. التحقق من أن المُحيل لا يحاول إحالة نفسه
  if (visitorData.ip === referrer.lastKnownIP) {
    return { isValid: false, message: 'لا يمكنك إحالة نفسك' };
  }
  
  // 3. التحقق من عدم وجود إحالة مسبقة من نفس الزائر
  const referralsCollection = db.collection('referrals');
  const existingReferralByIP = await referralsCollection.findOne({
    referrerId: referrer._id.toString(),
    'visitorData.ip': visitorData.ip
  });
  
  if (existingReferralByIP) {
    return { isValid: false, message: 'تم تسجيل إحالة من نفس عنوان IP مسبقًا' };
  }
  
  // 4. التحقق من عدم وجود إحالة مسبقة من نفس المتصفح (استنادًا إلى ملف تعريف الارتباط)
  if (visitorData.fingerprint) {
    const existingReferralByFingerprint = await referralsCollection.findOne({
      referrerId: referrer._id.toString(),
      'visitorData.fingerprint': visitorData.fingerprint
    });
    
    if (existingReferralByFingerprint) {
      return { isValid: false, message: 'تم تسجيل إحالة من نفس المتصفح مسبقًا' };
    }
  }
  
  // اجتياز جميع الاختبارات - الإحالة صالحة
  return { 
    isValid: true, 
    referrer,
    message: 'الإحالة صالحة'
  };
}

export async function POST(req) {
  try {
    // استقبال بيانات الإحالة
    const { referrerCastleIP } = await req.json();

    if (!referrerCastleIP) {
      return NextResponse.json({ 
        success: false, 
        message: 'بيانات الإحالة غير مكتملة' 
      }, { status: 400 });
    }

    // جمع معلومات عن الزائر
    const headersList = getHeaders();
    const userAgent = headersList.get('user-agent') || 'unknown';
    const visitorIP = headersList.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    const referer = headersList.get('referer') || 'direct';
    
    // إنشاء بصمة أساسية للمتصفح (للمساعدة في منع الاحتيال)
    const cookieStore = getCookies();
    let fingerprint = cookieStore.get('visitor_id')?.value;
    
    // إذا لم يكن هناك ملف تعريف ارتباط، فسنستخدم مزيجًا من عنوان IP ووكيل المستخدم
    if (!fingerprint) {
      fingerprint = `${visitorIP}-${userAgent.substring(0, 50)}`;
    }
    
    // بيانات الزائر للتحقق والتخزين
    const visitorData = {
      ip: visitorIP,
      userAgent,
      referer,
      fingerprint,
      timestamp: new Date()
    };

    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    
    // التحقق من صحة الإحالة
    const validationResult = await validateReferral(referrerCastleIP, visitorData, database);
    
    if (!validationResult.isValid) {
      return NextResponse.json({ 
        success: false, 
        message: validationResult.message 
      }, { status: 400 });
    }
    
    const referrer = validationResult.referrer;
    const participantsCollection = database.collection('participants');
    const referralsCollection = database.collection('referrals');

    // إنشاء إحالة جديدة مع معلومات أكثر تفصيلاً
    const newReferral = {
      referrerId: referrer._id.toString(),
      visitorData,
      createdAt: new Date(),
      status: 'valid' // يمكن استخدامها لاحقًا للتحقق اليدوي أو المراجعة
    };

    // إضافة الإحالة الجديدة لقاعدة البيانات
    await referralsCollection.insertOne(newReferral);
    
    // زيادة عدد الإحالات للمستخدم المحيل
    await participantsCollection.updateOne(
      { _id: referrer._id },
      { 
        $inc: { referrals: 1 },
        $set: { lastReferralAt: new Date() }
      }
    );
    
    // تحديث آخر عنوان IP معروف للمستخدم المحيل لمنع الاحتيال
    await participantsCollection.updateOne(
      { _id: referrer._id },
      { $set: { lastKnownIP: visitorIP } }
    );
    
    // الحصول على عدد الإحالات المحدث
    const updatedReferrer = await participantsCollection.findOne({ _id: referrer._id });

    // إنشاء استجابة مع ملف تعريف ارتباط للمساعدة في تتبع الزوار
    const response = NextResponse.json({ 
      success: true, 
      message: 'تم تسجيل الإحالة بنجاح',
      referralCount: updatedReferrer.referrals
    });
    
    // إضافة ملف تعريف ارتباط للزائر إذا لم يكن موجودًا بالفعل
    if (!cookieStore.get('visitor_id')) {
      response.cookies.set('visitor_id', fingerprint, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 يوم
      });
    }
    
    return response;
  } catch (error) {
    console.error('خطأ في تسجيل الإحالة:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء تسجيل الإحالة: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await client.close();
  }
} 