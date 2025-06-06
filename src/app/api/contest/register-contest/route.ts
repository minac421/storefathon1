import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// رابط الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

export async function POST(req) {
  try {
    // استقبال بيانات المستخدم
    const { castleIP, username, avatar } = await req.json();

    // التحقق من البيانات
    if (!castleIP || !username) {
      return NextResponse.json({ 
        success: false, 
        message: 'يرجى إدخال الاسم وآي بي القلعة' 
      }, { status: 400 });
    }

    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const participantsCollection = database.collection('participants');

    // التحقق من وجود المستخدم مسبقاً
    const existingUser = await participantsCollection.findOne({ castleIP });
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: 'أنت مسجل بالفعل في المسابقة'
      }, { status: 400 });
    }

    // إضافة المستخدم للمسابقة
    const newParticipant = {
      castleIP,
      username,
      avatar: avatar || 1,
      joinedAt: new Date(),
      referrals: 0
    };

    // إضافة المستخدم لقاعدة البيانات
    const result = await participantsCollection.insertOne(newParticipant);

    // إنشاء رابط الإحالة باستخدام آي بي القلعة والدومين الصحيح
    const referralLink = `https://storefathon1-c3kg.vercel.app/register?ref=${castleIP}`;

    return NextResponse.json({ 
      success: true, 
      message: 'تم تسجيلك بنجاح في المسابقة',
      participant: {
        id: result.insertedId.toString(),
        ...newParticipant
      },
      referralLink: referralLink
    });
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء التسجيل: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await client.close();
  }
} 