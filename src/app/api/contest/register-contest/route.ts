import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// مسار ملف قاعدة البيانات
const dbPath = path.join(process.cwd(), 'contest-db.json');

// التأكد من وجود ملف قاعدة البيانات
const ensureDbExists = () => {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ participants: [], referrals: [] }), 'utf-8');
  }
};

// قراءة قاعدة البيانات
const readDb = () => {
  ensureDbExists();
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// كتابة قاعدة البيانات
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

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

    // قراءة قاعدة البيانات
    const db = readDb();

    // التحقق من وجود المستخدم مسبقاً
    const existingUser = db.participants.find(p => p.castleIP === castleIP);
    if (existingUser) {
      return NextResponse.json({ 
        success: false, 
        message: 'أنت مسجل بالفعل في المسابقة'
      }, { status: 400 });
    }

    // إضافة المستخدم للمسابقة
    const newParticipant = {
      id: Date.now().toString(),
      castleIP,
      username,
      avatar: avatar || 1,
      joinedAt: new Date().toISOString(),
      referrals: 0
    };

    // إضافة المستخدم للمصفوفة
    db.participants.push(newParticipant);
    
    // حفظ التغييرات في قاعدة البيانات
    writeDb(db);

    // إنشاء رابط الإحالة باستخدام آي بي القلعة والدومين الصحيح
    const referralLink = `https://storefathon1-c3kg.vercel.app/register?ref=${castleIP}`;

    return NextResponse.json({ 
      success: true, 
      message: 'تم تسجيلك بنجاح في المسابقة',
      participant: newParticipant,
      referralLink: referralLink
    });
  } catch (error) {
    console.error('خطأ في تسجيل المستخدم:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء التسجيل: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  }
} 