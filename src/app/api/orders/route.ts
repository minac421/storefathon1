import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { Document, Model, Query } from 'mongoose';
import mongoose from 'mongoose';

// الحصول على جميع الطلبات
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    
    // استخراج معلمات التصفية
    const status = url.searchParams.get('status');
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const sortOrder = url.searchParams.get('sortOrder') || 'desc';
    const limit = url.searchParams.get('limit') ? parseInt(url.searchParams.get('limit')!) : 100;
    const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page')!) : 1;
    const skip = (page - 1) * limit;
    
    // بناء استعلام البحث
    const query: any = {};
    if (status) {
      query.status = status;
    }
    
    // بناء خيارات الترتيب
    const sort: any = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // الحصول على إجمالي عدد الطلبات للإحصائيات
    const totalOrders = await (OrderModel as Model<any>).countDocuments(query);
    
    // استرداد الطلبات
    const orders = await (OrderModel as Model<any>).find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    
    // تحويل النتائج
    const results = orders.map(doc => {
      const order = doc.toObject();
      return {
        id: order._id.toString(),
        orderNumber: order.orderNumber,
        customer: order.customer,
        items: order.items,
        totalPrice: order.totalPrice,
        status: order.status,
        images: order.images || {},
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      };
    });
    
    // إرجاع الطلبات مع تحديد ترميز UTF-8
    return new NextResponse(JSON.stringify({
      orders: results,
      pagination: {
        total: totalOrders,
        page,
        limit,
        pages: Math.ceil(totalOrders / limit)
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في جلب الطلبات:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء جلب الطلبات' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// إنشاء طلب جديد
export async function POST(request: NextRequest) {
  try {
    console.log('بدء إنشاء طلب جديد...');
    
    // الاتصال بقاعدة البيانات
    await dbConnect();
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    
    // قراءة بيانات الطلب
    const orderData = await request.json();
    console.log('بيانات الطلب المستلمة:', JSON.stringify(orderData, null, 2));
    
    // التحقق من البيانات المطلوبة بشكل مفصل
    if (!orderData.customer) {
      return new NextResponse(JSON.stringify(
        { error: 'بيانات العميل مفقودة' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return new NextResponse(JSON.stringify(
        { error: 'قائمة المنتجات فارغة أو غير صالحة' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    if (orderData.totalPrice === undefined || isNaN(orderData.totalPrice)) {
      return new NextResponse(JSON.stringify(
        { error: 'السعر الإجمالي مفقود أو غير صالح' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // التحقق من بيانات العميل الأساسية
    const { customer } = orderData;
    if (!customer.name || !customer.email || !customer.phone) {
      return new NextResponse(JSON.stringify(
        { error: 'بيانات العميل غير مكتملة (الاسم، البريد الإلكتروني، الهاتف مطلوبة)' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // توليد رقم طلب فريد
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ORD-${datePart}-${randomPart}`;
    
    console.log('إنشاء طلب جديد برقم:', orderNumber);
    
    // إنشاء الطلب الجديد
    const newOrder = await (OrderModel as Model<any>).create({
      ...orderData,
      orderNumber,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log('تم إنشاء الطلب بنجاح:', {
      id: newOrder._id.toString(),
      orderNumber: newOrder.orderNumber
    });
    
    return new NextResponse(JSON.stringify({ 
      id: newOrder._id.toString(),
      orderNumber: newOrder.orderNumber,
      success: true 
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في إنشاء طلب جديد:', error);
    
    // التحقق من نوع الخطأ ومعالجته
    if (error instanceof mongoose.Error.ValidationError) {
      // خطأ في التحقق من صحة البيانات
      const validationErrors: string[] = [];
      for (const field in error.errors) {
        validationErrors.push(`${field}: ${error.errors[field].message}`);
      }
      
      return new NextResponse(JSON.stringify(
        { 
          error: 'بيانات الطلب غير صالحة', 
          details: validationErrors 
        }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // خطأ في تكرار البيانات
    if (error.code === 11000) {
      return new NextResponse(JSON.stringify(
        { 
          error: 'تم إنشاء هذا الطلب مسبقًا',
          details: 'حقل مكرر: ' + JSON.stringify(error.keyValue || {})
        }
      ), {
        status: 409,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    return new NextResponse(JSON.stringify(
      { 
        error: 'حدث خطأ أثناء إنشاء طلب جديد',
        details: error instanceof Error ? error.message : 'خطأ غير معروف'
      }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// تحديث حالة الطلب
export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const orderData = await request.json();
    const { id, status } = orderData;
    
    if (!id) {
      return new NextResponse(JSON.stringify(
        { error: 'معرف الطلب مطلوب' }
      ), {
        status: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    await (OrderModel as Model<any>).findByIdAndUpdate(id, {
      status,
      updatedAt: new Date()
    });
    
    return new NextResponse(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في تحديث الطلب:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء تحديث الطلب' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
