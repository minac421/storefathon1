import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/models/Order';
import { Model } from 'mongoose';

// دالة لجلب إحصائيات لوحة التحكم
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // إحصائيات الطلبات
    const totalOrders = await (OrderModel as Model<any>).countDocuments();
    const newOrders = await (OrderModel as Model<any>).countDocuments({ status: 'pending' });
    const processingOrders = await (OrderModel as Model<any>).countDocuments({ status: 'processing' });
    const completedOrders = await (OrderModel as Model<any>).countDocuments({ status: 'completed' });
    
    // إحصائيات المبيعات والإيرادات
    const allOrders = await (OrderModel as Model<any>).find({ status: { $ne: 'canceled' } });
    
    // حساب إجمالي الإيرادات
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // حساب عدد العملاء الفريدين
    const uniqueCustomers = new Set();
    allOrders.forEach(order => {
      if (order.customer && order.customer.email) {
        uniqueCustomers.add(order.customer.email);
      }
    });
    
    // استخراج العناصر الفريدة (المنتجات)
    const uniqueProducts = new Set();
    allOrders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          uniqueProducts.add(item.id);
        });
      }
    });
    
    // حساب إيرادات الأسبوع الحالي
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // بداية الأسبوع (الأحد)
    startOfWeek.setHours(0, 0, 0, 0);
    
    const ordersThisWeek = allOrders.filter(order => new Date(order.createdAt) >= startOfWeek);
    const revenueThisWeek = ordersThisWeek.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // حساب إيرادات الأسبوع الماضي
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);
    endOfLastWeek.setSeconds(endOfLastWeek.getSeconds() - 1);
    
    const ordersLastWeek = allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startOfLastWeek && orderDate <= endOfLastWeek;
    });
    const revenueLastWeek = ordersLastWeek.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // حساب إيرادات الشهر الحالي
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const ordersThisMonth = allOrders.filter(order => new Date(order.createdAt) >= startOfMonth);
    const revenueThisMonth = ordersThisMonth.reduce((sum, order) => sum + order.totalPrice, 0);
    
    // الحصول على أحدث الطلبات
    const latestOrders = await (OrderModel as Model<any>).find()
      .sort({ createdAt: -1 })
      .limit(5);
      
    const formattedLatestOrders = latestOrders.map(order => {
      const orderObj = order.toObject();
      return {
        id: orderObj._id.toString(),
        orderNumber: orderObj.orderNumber,
        customer: orderObj.customer.name,
        date: orderObj.createdAt,
        amount: orderObj.totalPrice,
        status: orderObj.status
      };
    });
    
    // إرجاع البيانات
    return new NextResponse(JSON.stringify({
      orderStats: {
        total: totalOrders,
        new: newOrders,
        processing: processingOrders,
        completed: completedOrders
      },
      customerStats: {
        total: uniqueCustomers.size
      },
      productStats: {
        total: uniqueProducts.size
      },
      revenueStats: {
        total: totalRevenue,
        thisWeek: revenueThisWeek,
        lastWeek: revenueLastWeek,
        thisMonth: revenueThisMonth
      },
      latestOrders: formattedLatestOrders
    }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('خطأ في جلب إحصائيات لوحة التحكم:', error);
    return new NextResponse(JSON.stringify(
      { error: 'حدث خطأ أثناء جلب إحصائيات لوحة التحكم' }
    ), {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
} 