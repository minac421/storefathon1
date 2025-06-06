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
    // استخراج آي بي القلعة من عنوان URL
    const url = new URL(request.url);
    const castleIP = url.searchParams.get('ip');
    
    if (!castleIP) {
      return NextResponse.json({ 
        success: false, 
        message: 'يرجى تحديد آي بي القلعة'
      }, { status: 400 });
    }
    
    // قراءة بيانات المشاركين من قاعدة البيانات
    const db = readDb();
    
    // البحث عن المستخدم
    const participant = db.participants.find(p => p.castleIP === castleIP);
    
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
  }
} 