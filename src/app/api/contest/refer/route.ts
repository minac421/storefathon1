import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// رابط الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

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

    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const participantsCollection = database.collection('participants');
    const referralsCollection = database.collection('referrals');

    // البحث عن المستخدم الذي قام بالإحالة
    const referrer = await participantsCollection.findOne({ castleIP: referrerCastleIP });
    if (!referrer) {
      return NextResponse.json({ 
        success: false, 
        message: 'لم يتم العثور على المستخدم المُحيل' 
      }, { status: 404 });
    }

    // الحصول على عنوان IP للمستخدم الزائر
    const visitorIP = req.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // التحقق من عدم وجود إحالة مسبقة من نفس العنوان
    const existingReferral = await referralsCollection.findOne({
      referrerId: referrer._id.toString(),
      visitorIP: visitorIP
    });

    if (existingReferral) {
      return NextResponse.json({ 
        success: false, 
        message: 'تم تسجيل هذه الإحالة مسبقًا' 
      }, { status: 400 });
    }

    // إنشاء إحالة جديدة
    const newReferral = {
      referrerId: referrer._id.toString(),
      visitorIP: visitorIP,
      createdAt: new Date()
    };

    // إضافة الإحالة الجديدة لقاعدة البيانات
    await referralsCollection.insertOne(newReferral);
    
    // زيادة عدد الإحالات للمستخدم المحيل
    await participantsCollection.updateOne(
      { _id: referrer._id },
      { $inc: { referrals: 1 } }
    );
    
    // الحصول على عدد الإحالات المحدث
    const updatedReferrer = await participantsCollection.findOne({ _id: referrer._id });

    return NextResponse.json({ 
      success: true, 
      message: 'تم تسجيل الإحالة بنجاح',
      referralCount: updatedReferrer.referrals
    });
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