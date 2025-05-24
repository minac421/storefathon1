import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CastleModel from '@/models/Castle';
import { Document, Model, Query } from 'mongoose';

// الحصول على جميع القلاع بدون نظام صفحات
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    
    // استخراج معلمات التصفية والترتيب فقط
    const level = url.searchParams.get('level');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    
    // بناء استعلام البحث
    const query: any = {};
    if (level) {
      query.level = parseInt(level);
    }
    
    // بناء خيارات الترتيب
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // الحصول على إجمالي العدد للإحصائيات
    const totalCastles = await (CastleModel as Model<any>).countDocuments(query);
    
    // استرداد جميع القلاع بدون حدود (الحد الأقصى 500 قلعة لمنع التحميل الزائد)
    const castles = await (CastleModel as Model<any>).find(query)
      .sort(sort)
      .limit(500); // حد أقصى للحماية من التحميل الزائد
    
    // تحويل النتائج
    const results = castles.map(doc => {
      const castle = doc.toObject();
      return {
        id: castle._id.toString(),
        name: castle.name,
        description: castle.description,
        level: castle.level,
        strength: castle.strength,
        price: castle.price,
        features: castle.features || [],
        icon: castle.icon || '🏰',
        popular: castle.popular || false,
        videoUrl: castle.videoUrl || '',
      };
    });
    
    // إرجاع جميع القلاع في مصفوفة واحدة مع تحديد ترميز UTF-8
    return new NextResponse(JSON.stringify({
      castles: results,
      stats: {
        totalCastles
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في جلب القلاع:', error);
    
    // وضع بيانات وهمية للقلاع في حالة فشل الاتصال بقاعدة البيانات
    const mockCastles = [
      {
        id: '1',
        name: 'قلعة الفاتح الأولى',
        description: 'قلعة قوية ومحصنة توفر حماية ممتازة للاعبين الجدد. تتميز بجدران سميكة وموقع استراتيجي.',
        level: 10,
        strength: 75,
        price: 1500,
        features: [
          'جدران محصنة',
          'أبراج مراقبة',
          'خندق دفاعي',
          'مخزن موارد صغير'
        ],
        icon: '🏰',
        popular: true,
        videoUrl: ''
      },
      {
        id: '2',
        name: 'قلعة المحارب',
        description: 'قلعة متوسطة الحجم مناسبة للاعبين من المستوى المتوسط. توفر توازنًا جيدًا بين الدفاع والهجوم.',
        level: 20,
        strength: 85,
        price: 3500,
        features: [
          'حواجز دفاعية متقدمة',
          'مركز تدريب للجنود',
          'مخزن موارد متوسط',
          'أسلحة دفاعية متطورة',
          'مركز قيادة تكتيكي'
        ],
        icon: '🏰',
        popular: false,
        videoUrl: ''
      },
      {
        id: '3',
        name: 'قلعة الفاتح الذهبية',
        description: 'قلعة فاخرة للاعبين المتقدمين. توفر أقصى مستويات الحماية والقدرة الهجومية.',
        level: 35,
        strength: 100,
        price: 10000,
        features: [
          'دفاعات ذكية متقدمة',
          'مركز أبحاث عسكري',
          'مخزن موارد ضخم',
          'دفاعات مضادة للطائرات',
          'مركز قيادة استراتيجي',
          'درع وقائي متطور'
        ],
        icon: '🏰',
        popular: true,
        videoUrl: ''
      }
    ];

    // إرجاع البيانات الوهمية
    return new NextResponse(JSON.stringify({
      castles: mockCastles,
      stats: {
        totalCastles: mockCastles.length
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// إضافة قلعة جديدة
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const castleData = await request.json();
    const newCastle = await (CastleModel as Model<any>).create(castleData);
    
    return new NextResponse(JSON.stringify({ 
      id: newCastle._id.toString(),
      success: true 
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في إضافة قلعة جديدة:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء إضافة قلعة جديدة' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// تحديث قلعة موجودة
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const castleData = await request.json();
    const { id, ...updateData } = castleData;
    
    await (CastleModel as Model<any>).findByIdAndUpdate(id, {
      ...updateData,
      updatedAt: new Date()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في تحديث القلعة:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء تحديث القلعة' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// حذف قلعة
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new NextResponse(JSON.stringify(
        { error: 'معرف القلعة مطلوب' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    await (CastleModel as Model<any>).findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في حذف القلعة:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء حذف القلعة' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
