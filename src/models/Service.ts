import mongoose, { Schema, Document } from 'mongoose';

// واجهة للترجمات
interface Translation {
  ar: string;
  en: string;
  tr: string;
}

// واجهة للخدمة
export interface IService extends Document {
  id: string;
  category: 'resources' | 'bots' | 'castle' | 'events';
  name: Translation;
  description?: Translation;
  price: number;
  icon: string;
  iconAlt?: string;
  popular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// مخطط الخدمة
const ServiceSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: [true, 'يجب تحديد معرف الخدمة'],
      unique: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'يجب تحديد فئة الخدمة'],
      enum: ['resources', 'bots', 'castle', 'events']
    },
    name: {
      ar: { type: String, required: [true, 'يجب تحديد الاسم بالعربية'] },
      en: { type: String, required: [true, 'يجب تحديد الاسم بالإنجليزية'] },
      tr: { type: String, required: [true, 'يجب تحديد الاسم بالتركية'] }
    },
    description: {
      ar: { type: String },
      en: { type: String },
      tr: { type: String }
    },
    price: {
      type: Number,
      required: [true, 'يجب تحديد سعر الخدمة'],
      min: [0, 'يجب أن يكون السعر موجبًا']
    },
    icon: {
      type: String,
      required: [true, 'يجب تحديد رمز الخدمة']
    },
    iconAlt: {
      type: String
    },
    popular: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// إنشاء وتصدير النموذج
export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
