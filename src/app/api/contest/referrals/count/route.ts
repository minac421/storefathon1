import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// رابط الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // استخراج آي بي القلعة من عنوان URL
    const url = new URL(request.url);
    const castleIP = url.searchParams.get('ip');
    
    if (!castleIP) {
      return NextResponse.json({ 
        success: false, 
        message: 'يرجى تحديد آي بي القلعة'
      }, { status: 400 });
    }
    
    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const participantsCollection = database.collection('participants');
    
    // البحث عن المستخدم
    const participant = await participantsCollection.findOne({ castleIP });
    
    if (!participant) {
      return NextResponse.json({ 
        success: false, 
        message: 'لم يتم العثور على المستخدم'
      }, { status: 404 });
    }
    
    // إرجاع عدد الإحالات
    return NextResponse.json({ 
      success: true, 
      count: participant.referrals || 0
    });
  } catch (error) {
    console.error('خطأ في جلب عدد الإحالات:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء جلب عدد الإحالات: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await client.close();
  }
}
 