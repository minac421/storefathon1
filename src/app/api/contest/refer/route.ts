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
    // استقبال بيانات الإحالة
    const { referrerCastleIP } = await req.json();

    if (!referrerCastleIP) {
      return NextResponse.json({ 
        success: false, 
        message: 'بيانات الإحالة غير مكتملة' 
      }, { status: 400 });
    }

    // قراءة قاعدة البيانات
    const db = readDb();

    // البحث عن المستخدم الذي قام بالإحالة
    const referrer = db.participants.find(p => p.castleIP === referrerCastleIP);
    if (!referrer) {
      return NextResponse.json({ 
        success: false, 
        message: 'لم يتم العثور على المستخدم المُحيل' 
      }, { status: 404 });
    }

    // الحصول على عنوان IP للمستخدم الزائر
    // في بيئة الإنتاج، يجب استخدام طرق أكثر دقة للتعرف على المستخدم
    const visitorIP = req.headers.get('x-forwarded-for') || 'unknown-ip';
    
    // التحقق من عدم وجود إحالة مسبقة من نفس العنوان
    const existingReferral = db.referrals.find(ref => 
      ref.referrerId === referrer.id && ref.visitorIP === visitorIP
    );

    if (existingReferral) {
      return NextResponse.json({ 
        success: false, 
        message: 'تم تسجيل هذه الإحالة مسبقًا' 
      }, { status: 400 });
    }

    // إنشاء إحالة جديدة
    const newReferral = {
      id: Date.now().toString(),
      referrerId: referrer.id,
      visitorIP: visitorIP,
      createdAt: new Date().toISOString()
    };

    // إضافة الإحالة الجديدة لقاعدة البيانات
    db.referrals.push(newReferral);
    
    // زيادة عدد الإحالات للمستخدم المحيل
    referrer.referrals += 1;
    
    // حفظ التغييرات
    writeDb(db);

    return NextResponse.json({ 
      success: true, 
      message: 'تم تسجيل الإحالة بنجاح',
      referralCount: referrer.referrals
    });
  } catch (error) {
    console.error('خطأ في تسجيل الإحالة:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'حدث خطأ أثناء تسجيل الإحالة: ' + (error.message || 'خطأ غير معروف')
    }, { status: 500 });
  }
} 