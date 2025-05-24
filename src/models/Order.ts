import mongoose, { Schema, Document } from 'mongoose';

// تعريف نوع العنصر في الطلب
interface OrderItem {
  id: string;
  name: string;
  price: number;
  icon: string;
  quantity: number;
  category: 'resources' | 'bots' | 'castle' | 'events' | 'packages';
}

// تعريف بيانات العميل
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod?: 'credit' | 'paypal' | 'bank' | string;
}

// تعريف بيانات الصور
interface OrderImages {
  coordImageUrl?: string;
  nameImageUrl?: string;
}

// تعريف نوع الطلب
export interface OrderDocument extends Document {
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'canceled';
  images?: OrderImages;
  createdAt: Date;
  updatedAt: Date;
}

// تعريف مخطط الطلب
const OrderSchema: Schema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      notes: { type: String },
      paymentMethod: { 
        type: String, 
        required: false
      },
    },
    items: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        icon: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        category: { 
          type: String, 
          required: true,
          enum: ['resources', 'bots', 'castle', 'events', 'packages']
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'completed', 'canceled'],
      default: 'pending',
    },
    images: {
      coordImageUrl: { type: String },
      nameImageUrl: { type: String }
    }
  },
  {
    timestamps: true, // إضافة حقول createdAt و updatedAt
  }
);

// إنشاء النموذج أو استخدامه إذا كان موجودًا
const OrderModel = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
