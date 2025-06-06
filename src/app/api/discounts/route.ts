import { NextResponse } from 'next/server';

// In-memory storage for discounts
let discounts: { [key: string]: any } = {};

// Helper function to check if user is admin
const isAdmin = async () => {
  // For now, we'll allow all requests for testing
  return true;
};

export async function POST(request: Request) {
  const isAdminUser = await isAdmin();
  
  if (!isAdminUser) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    const { productId, discountAmount, durationDays, type } = await request.json();
    
    // Validate input
    if (!productId || !discountAmount || !durationDays || !type) {
      return NextResponse.json({ error: 'بيانات غير كاملة' }, { status: 400 });
    }

    // Create discount in memory
    const discount = {
      id: `discount-${Date.now()}`,
      productId,
      amount: Number(discountAmount),
      type,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    };

    // Store discount in memory
    discounts[discount.id] = discount;

    return NextResponse.json({
      success: true,
      message: 'تم إضافة الخصم بنجاح',
      discount
    });
  } catch (error) {
    console.error('Error creating discount:', error);
    return NextResponse.json({ 
      error: 'حدث خطأ أثناء إضافة الخصم', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Filter out expired discounts
    const currentDate = new Date().toISOString();
    const activeDiscounts = Object.values(discounts).filter(discount => {
      return discount.startDate <= currentDate && discount.endDate >= currentDate;
    });

    return NextResponse.json({
      discounts: activeDiscounts
    });
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return NextResponse.json({
      error: 'حدث خطأ أثناء جلب الخصومات',
      details: error instanceof Error ? error.message : 'Unknown error',
      statusCode: 500
    });
  }
}
