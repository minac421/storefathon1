import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { Document, Model, Query } from 'mongoose';

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
    await dbConnect();
    const orderData = await request.json();
    
    // توليد رقم طلب فريد - التاريخ الحالي + 4 أرقام عشوائية
    const date = new Date();
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ORD-${datePart}-${randomPart}`;
    
    // إنشاء الطلب الجديد
    const newOrder = await (OrderModel as Model<any>).create({
      ...orderData,
      orderNumber,
      status: 'pending'
    });
    
    return new NextResponse(JSON.stringify({ 
      id: newOrder._id.toString(),
      orderNumber: newOrder.orderNumber,
      success: true 
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في إنشاء طلب جديد:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء إنشاء طلب جديد' }
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
