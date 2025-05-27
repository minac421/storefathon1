import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ServiceModel from '@/models/Service';
import { Document, Model } from 'mongoose';

// الحصول على جميع الخدمات بدون نظام صفحات
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 جاري محاولة الاتصال بقاعدة البيانات للخدمات...');
    await dbConnect();
    
    const url = new URL(request.url);
    
    // استخراج معلمات التصفية والترتيب
    const category = url.searchParams.get('category');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    
    // بناء استعلام البحث
    const query: any = {};
    if (category) {
      query.category = category;
    }
    
    // بناء خيارات الترتيب
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // الحصول على إجمالي العدد للإحصائيات
    const totalServices = await (ServiceModel as Model<any>).countDocuments(query);
    const distinctCategories = await (ServiceModel as Model<any>).distinct('category');
    
    // استرداد جميع الخدمات 
    const services = await (ServiceModel as Model<any>).find(query)
      .sort(sort)
      .limit(500); // حد أقصى للحماية من التحميل الزائد
    
    // تحويل النتائج
    const results = services.map((doc: Document) => {
      const service = doc.toObject();
      return {
        id: service.id,
        category: service.category,
        name: service.name,
        description: service.description,
        price: service.price,
        icon: service.icon,
        iconAlt: service.iconAlt,
        popular: service.popular || false,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      };
    });
    
    // تنظيم النتائج حسب الفئة
    const categorizedResults = {
      resources: results.filter(service => service.category === 'resources'),
      castle: results.filter(service => service.category === 'castle'),
      bots: results.filter(service => service.category === 'bots'),
      events: results.filter(service => service.category === 'events'),
      charging: results.filter(service => service.category === 'charging')
    };
    
    // إرجاع جميع الخدمات في مصفوفة واحدة مع تحديد ترميز UTF-8
    return new NextResponse(JSON.stringify({
      services: categorizedResults,
      stats: {
        totalServices,
        distinctCategories
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في جلب الخدمات:', error);
    
    // في حالة الفشل، إرجاع البيانات الوهمية المعرفة سابقًا
    // حتى لا تنعطل واجهة المستخدم
    const mockServices = {
      resources: [
        { id: 'wood', name: { ar: 'الخشب', en: 'Wood', tr: 'Ahşap' }, price: 150, icon: '/images/resources/wood.svg', iconAlt: '🌲' },
        { id: 'iron', name: { ar: 'الحديد', en: 'Iron', tr: 'Demir' }, price: 200, icon: '/images/resources/iron.svg', iconAlt: '⛏️' },
        { id: 'wheat', name: { ar: 'القمح', en: 'Wheat', tr: 'Buğday' }, price: 100, icon: '/images/resources/wheat.svg', iconAlt: '🌾' },
        { id: 'silver', name: { ar: 'الفضة', en: 'Silver', tr: 'Gümüş' }, price: 250, icon: '/images/resources/silver.svg', iconAlt: '🔷' },
      ],
      castle: [
        { id: 'castle1', name: { ar: 'قلعة صغيرة', en: 'Small Castle', tr: 'Küçük Kale' }, price: 500, icon: '/images/castles/small_castle.svg', iconAlt: '🏰' },
        { id: 'castle2', name: { ar: 'قلعة متوسطة', en: 'Medium Castle', tr: 'Orta Kale' }, price: 1000, icon: '/images/castles/medium_castle.svg', iconAlt: '🏯' },
        { id: 'castle3', name: { ar: 'قلعة كبيرة', en: 'Large Castle', tr: 'Büyük Kale' }, price: 1500, icon: '/images/castles/large_castle.svg', iconAlt: '🏡️' },
      ],
      bots: [
        { id: 'bot1', name: { ar: 'بوت المزارع', en: 'Farmer Bot', tr: 'Çiftçi Bot' }, price: 300, icon: '/images/bots/farmer_bot.svg', iconAlt: '🤖' },
        { id: 'bot2', name: { ar: 'بوت المحارب', en: 'Warrior Bot', tr: 'Savaşçı Bot' }, price: 450, icon: '/images/bots/warrior_bot.svg', iconAlt: '👾' },
        { id: 'bot3', name: { ar: 'بوت التاجر', en: 'Trader Bot', tr: 'Tüccar Bot' }, price: 400, icon: '/images/bots/trader_bot.svg', iconAlt: '🎮' },
      ],
      events: [
        {
          id: 'starter',
          name: { ar: 'حزمة المبتدئ', en: 'Starter Package', tr: 'Başlangıç Paketi' },
          description: {
            ar: 'مثالية للاعبين الجدد، تتضمن موارد أساسية للبدء',
            en: 'Perfect for new players, includes basic resources to get started',
            tr: 'Yeni oyuncular için mükemmel, başlamak için temel kaynaklar içerir'
          },
          price: 499,
          icon: '🎁',
          popular: false
        },
        {
          id: 'premium',
          name: { ar: 'حزمة بريميوم', en: 'Premium Package', tr: 'Premium Paket' },
          description: {
            ar: 'تضم مجموعة متنوعة من الموارد والمزايا للاعبين المتقدمين',
            en: 'Includes a diverse set of resources and perks for advanced players',
            tr: 'Gelişmiş oyuncular için çeşitli kaynaklar ve avantajlar içerir'
          },
          price: 999,
          icon: '💎',
          popular: true
        },
        {
          id: 'ultimate',
          name: { ar: 'الحزمة النهائية', en: 'Ultimate Package', tr: 'Ultimate Paket' },
          description: {
            ar: 'كل ما تحتاجه لتصبح قوة لا يستهان بها في اللعبة',
            en: 'Everything you need to become a formidable power in the game',
            tr: 'Oyunda korkunç bir güç olmak için ihtiyacınız olan her şey'
          },
          price: 1499,
          icon: '👑',
          popular: false
        }
      ],
      charging: [
        {
          id: 'charging-gems-100',
          name: { ar: '100 جوهرة', en: '100 Gems', tr: '100 Mücevher' },
          description: {
            ar: 'اشحن حسابك بـ 100 جوهرة للاستمتاع بمزايا إضافية في اللعبة',
            en: 'Charge your account with 100 gems to enjoy additional in-game benefits',
            tr: 'Oyun içi ek avantajların keyfini çıkarmak için hesabınıza 100 mücevher yükleyin'
          },
          price: 10,
          icon: '💳',
          iconAlt: '100 جوهرة',
          popular: false
        },
        {
          id: 'charging-gems-500',
          name: { ar: '500 جوهرة', en: '500 Gems', tr: '500 Mücevher' },
          description: {
            ar: 'اشحن حسابك بـ 500 جوهرة مع خصم 10% على السعر الأصلي',
            en: 'Charge your account with 500 gems with a 10% discount on the original price',
            tr: 'Hesabınıza orijinal fiyat üzerinden %10 indirimle 500 mücevher yükleyin'
          },
          price: 45,
          icon: '💳',
          iconAlt: '500 جوهرة',
          popular: true
        }
      ]
    };
    
    return new NextResponse(JSON.stringify({
      services: mockServices,
      stats: {
        totalServices: Object.values(mockServices).flat().length,
        distinctCategories: Object.keys(mockServices)
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// إضافة خدمة جديدة
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const serviceData = await request.json();
    
    console.log('بيانات الخدمة المستلمة في API:', {
      category: serviceData.category,
      id: serviceData.id,
      name: serviceData.name
    });
    
    // التحقق من وجود معرف الخدمة
    const existingService = await (ServiceModel as Model<any>).findOne({ id: serviceData.id });
    if (existingService) {
      return new NextResponse(JSON.stringify({
        error: 'معرف الخدمة مستخدم بالفعل، الرجاء استخدام معرف آخر'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // التأكد من صحة الفئة
    if (serviceData.category && !['resources', 'bots', 'castle', 'events', 'charging'].includes(serviceData.category)) {
      return new NextResponse(JSON.stringify({
        error: `فئة الخدمة غير صالحة: ${serviceData.category}`
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // إنشاء خدمة جديدة
    const newService = await (ServiceModel as Model<any>).create(serviceData);
    
    return new NextResponse(JSON.stringify({ 
      id: newService.id,
      success: true 
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error: any) {
    console.error('خطأ في إضافة خدمة جديدة:', error);
    let errorMessage = 'حدث خطأ أثناء إضافة الخدمة الجديدة';
    
    // التعامل مع أخطاء التحقق من قاعدة البيانات
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map((err: any) => err.message).join(', ');
    }
    
    return new NextResponse(JSON.stringify(
      { error: errorMessage }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// تحديث خدمة موجودة
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const serviceData = await request.json();
    const { id, ...updateData } = serviceData;
    
    await (ServiceModel as Model<any>).findOneAndUpdate(
      { id: id }, 
      {
        ...updateData,
        updatedAt: new Date()
      }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في تحديث الخدمة:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء تحديث الخدمة' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// حذف خدمة
export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new NextResponse(JSON.stringify(
        { error: 'معرف الخدمة مطلوب' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    await (ServiceModel as Model<any>).findOneAndDelete({ id: id });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في حذف الخدمة:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء حذف الخدمة' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
