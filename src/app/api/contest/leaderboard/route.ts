import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// مسار ملف قاعدة البيانات
const dbPath = path.join(process.cwd(), 'contest-db.json');

// قراءة قاعدة البيانات
const readDb = () => {
  if (!fs.existsSync(dbPath)) {
    return { participants: [], referrals: [] };
  }
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

export async function GET(request) {
  try {
    // استخراج عدد المتصدرين المطلوب عرضهم من عنوان URL
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;
    
    // قراءة بيانات المشاركين من قاعدة البيانات
    const db = readDb();
    
    // إذا لم تكن هناك بيانات، نرجع قائمة فارغة
    if (!db.participants || db.participants.length === 0) {
      return NextResponse.json({ 
        success: true, 
        leaderboard: []
      });
    }
    
    // ترتيب المشاركين حسب عدد الإحالات بترتيب تنازلي
    const leaderboard = [...db.participants]
      .sort((a, b) => b.referrals - a.referrals)
      .slice(0, limit) // أعلى 10 متصدرين أو حسب العدد المطلوب
      .map(participant => ({
        id: participant.id,
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
  }
} 