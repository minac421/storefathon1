import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { Model } from 'mongoose';

// الحصول على تفاصيل طلب واحد
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    
    // التحقق من صحة معرف الطلب
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
    
    // البحث عن الطلب بواسطة المعرف
    const order = await (OrderModel as Model<any>).findById(id);
    
    // التحقق من وجود الطلب
    if (!order) {
      return new NextResponse(JSON.stringify(
        { error: 'لم يتم العثور على الطلب' }
      ), {
        status: 404,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }
    
    // تحويل الطلب إلى كائن عادي
    const orderObj = order.toObject();
    
    // إرجاع تفاصيل الطلب مع تحديد ترميز UTF-8
    return new NextResponse(JSON.stringify({
      order: {
        id: orderObj._id.toString(),
        orderNumber: orderObj.orderNumber,
        customer: orderObj.customer,
        items: orderObj.items,
        totalPrice: orderObj.totalPrice,
        status: orderObj.status,
        createdAt: orderObj.createdAt,
        updatedAt: orderObj.updatedAt
      }
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في جلب تفاصيل الطلب:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء جلب تفاصيل الطلب' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
