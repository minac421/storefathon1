import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// رابط الاتصال بقاعدة بيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

// إضافة وظيفة لمعالجة الإحالة
const handleReferral = async (referrerCastleIP) => {
  try {
    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const participantsCollection = database.collection('participants');
    const referralsCollection = database.collection('referrals');

    // البحث عن المستخدم المُحيل
    const referrer = await participantsCollection.findOne({ castleIP: referrerCastleIP });
    if (!referrer) {
      console.log('المستخدم المُحيل غير موجود:', referrerCastleIP);
      return false;
    }

    // تسجيل الإحالة
    const visitorIP = "registered-user"; // استخدام قيمة ثابتة للمستخدمين المسجلين
    
    // التحقق من عدم وجود إحالة مسبقة
    const existingReferral = await referralsCollection.findOne({
      referrerId: referrer._id.toString(),
      visitorIP: visitorIP
    });

    if (existingReferral) {
      console.log('الإحالة موجودة مسبقًا');
      return false;
    }

    // إنشاء إحالة جديدة
    const newReferral = {
      referrerId: referrer._id.toString(),
      visitorIP: visitorIP,
      createdAt: new Date()
    };

    // إضافة الإحالة الجديدة
    await referralsCollection.insertOne(newReferral);
    
    // زيادة عدد الإحالات للمستخدم المُحيل
    await participantsCollection.updateOne(
      { _id: referrer._id },
      { $inc: { referrals: 1 } }
    );
    
    console.log('تم تسجيل الإحالة بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ في معالجة الإحالة:', error);
    return false;
  }
};

export async function POST(req) {
  try {
    const { fullname, email, password, castle_ip, referrerCode } = await req.json();
    
    // التحقق من البيانات
    if (!fullname || !email || !password || !castle_ip) {
      return NextResponse.json({
        success: false,
        message: 'يرجى إدخال جميع البيانات المطلوبة'
      }, { status: 400 });
    }
    
    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const usersCollection = database.collection('users');
    
    // التحقق من وجود المستخدم مسبقاً
    const existingUser = await usersCollection.findOne({ 
      $or: [
        { email: email },
        { castle_ip: castle_ip }
      ]
    });
    
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'البريد الإلكتروني أو آي بي القلعة مسجل مسبقًا'
      }, { status: 400 });
    }
    
    // إنشاء مستخدم جديد
    const newUser = {
      fullname,
      email,
      password, // في التطبيق الحقيقي يجب تشفير كلمة المرور
      castle_ip,
      created_at: new Date(),
      referrerCode: referrerCode || null
    };
    
    // إضافة المستخدم لقاعدة البيانات
    const result = await usersCollection.insertOne(newUser);
    
    // معالجة الإحالة إذا كانت موجودة
    let referralSuccess = false;
    if (referrerCode) {
      referralSuccess = await handleReferral(referrerCode);
    }
    
    // إرجاع استجابة نجاح
    return NextResponse.json({
      success: true,
      message: 'تم التسجيل بنجاح',
      referralProcessed: referralSuccess
    });
  } catch (error) {
    console.error('خطأ في التسجيل:', error);
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ أثناء التسجيل'
    }, { status: 500 });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await client.close();
  }
} 