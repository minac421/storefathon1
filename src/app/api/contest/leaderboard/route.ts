import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// رابط الاتصال بقاعدة البيانات MongoDB
const uri = "mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // استخراج عدد المتصدرين المطلوب عرضهم من عنوان URL
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    // الاتصال بقاعدة البيانات
    await client.connect();
    const database = client.db('storefathon');
    const participantsCollection = database.collection('participants');
    
    // جلب المتصدرين مرتبين حسب عدد الإحالات
    const leaderboardCursor = participantsCollection
      .find({})
      .sort({ referrals: -1 })
      .limit(limit);
    
    const participants = await leaderboardCursor.toArray();
    
    // إذا لم تكن هناك بيانات، نرجع قائمة فارغة
    if (!participants || participants.length === 0) {
      return NextResponse.json({ 
        success: true, 
        leaderboard: []
      });
    }
    
    // تنسيق البيانات للواجهة
    const leaderboard = participants.map(participant => ({
      id: participant._id.toString(),
        username: participant.username,
        castleIP: participant.castleIP,
        avatar: participant.avatar,
        referralCount: participant.referrals
      }));

    return NextResponse.json({ 
      success: true, 
      leaderboard
    });
  } catch (error) {
    console.error('خطأ في جلب المتصدرين:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء جلب قائمة المتصدرين: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  } finally {
    // إغلاق الاتصال بقاعدة البيانات
    await client.close();
  }
} 