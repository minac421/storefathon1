import mongoose from 'mongoose';
import { BlogCategory } from '@/types/blog';

// استيراد تعريف فئات المقال من ملف الأنواع

// نموذج بيانات التعليق
const CommentSchema = new mongoose.Schema({
  author: {
    userId: { type: String, default: null }, // معرف المستخدم إذا كان مسجلاً
    name: { type: String, required: [true, 'الرجاء إدخال اسم المعلق'] }, // اسم المعلق
    avatar: { type: String, default: null } // الصورة الرمزية للمعلق
  },
  content: {
    type: String,
    required: [true, 'الرجاء إدخال نص التعليق'],
    trim: true,
    maxlength: [500, 'يجب ألا يزيد التعليق عن 500 حرف']
  },
  likes: [
    { type: String } // قائمة معرفات المستخدمين الذين أعجبوا بالتعليق
  ],
  replies: [{
    author: {
      userId: { type: String, default: null },
      name: { type: String, required: true },
      avatar: { type: String, default: null }
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [300, 'يجب ألا يزيد الرد عن 300 حرف']
    },
    likes: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
  }],
  isApproved: { type: Boolean, default: true }, // هل التعليق معتمد للعرض
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// تعريف نموذج معلومات الكاتب
const AuthorInfoSchema = new mongoose.Schema({
  userId: { type: String, default: null }, // معرف المستخدم إذا كان مسجلاً
  name: { type: String, required: true }, // اسم الكاتب
  avatar: { type: String, default: null }, // الصورة الرمزية للكاتب
  bio: { type: String, default: '' }, // نبذة عن الكاتب
  contactInfo: { type: String, default: null }, // معلومات التواصل (اختيارية)
  isFeatured: { type: Boolean, default: false }, // هل الكاتب مميز؟
  isVerified: { type: Boolean, default: false } // هل الكاتب موثق؟
});

// تعريف مخطط بيانات المقال
const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'الرجاء إدخال عنوان المقال'],
    trim: true,
    maxlength: [100, 'يجب ألا يزيد العنوان عن 100 حرف']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'الرجاء إدخال محتوى المقال'],
  },
  summary: {
    type: String,
    required: [true, 'الرجاء إدخال ملخص المقال'],
    maxlength: [300, 'يجب ألا يزيد الملخص عن 300 حرف']
  },
  category: {
    type: String,
    required: [true, 'الرجاء اختيار فئة المقال'],
    enum: Object.values(BlogCategory),
    default: BlogCategory.NEWS
  },
  // معلومات الكاتب المفصلة
  author: AuthorInfoSchema,
  
  // صور ووسائط المقال
  featuredImage: {
    type: String,
    default: null, // يمكن أن يكون المقال بدون صورة مميزة
  },
  media: {
    images: [{ type: String }], // مسارات الصور الإضافية
    videos: [{
      url: { type: String }, // مسار الفيديو
      thumbnail: { type: String, default: null }, // صورة مصغرة للفيديو
      title: { type: String, default: '' }, // عنوان الفيديو
      duration: { type: Number, default: 0 } // مدة الفيديو بالثواني
    }]
  },
  
  // التفاعل مع المقال
  interaction: {
    likes: [{ type: String }], // قائمة معرفات المستخدمين الذين أعجبوا بالمقال
    shares: { type: Number, default: 0 }, // عدد مرات مشاركة المقال
    bookmarks: [{ type: String }], // قائمة معرفات المستخدمين الذين حفظوا المقال
    views: { type: Number, default: 0 }, // عدد المشاهدات
    // إضافة قسم التفاعلات المتعددة
    reactions: {
      fire: [{ type: String }],    // تفاعل نار - معرفات المستخدمين
      shield: [{ type: String }],  // تفاعل درع - معرفات المستخدمين
      crown: [{ type: String }],   // تفاعل تاج - معرفات المستخدمين
      castle: [{ type: String }],  // تفاعل قلعة - معرفات المستخدمين 
      laugh: [{ type: String }]    // تفاعل ضحك - معرفات المستخدمين
    }
  },
  
  // التعليقات على المقال
  comments: [CommentSchema],
  
  // كلمات مفتاحية ووسوم
  tags: [{
    type: String,
    trim: true
  }],
  
  // تمييز المقال
  isFeatured: { type: Boolean, default: false }, // هل المقال مميز؟
  isPinned: { type: Boolean, default: false }, // هل المقال مثبت في الأعلى؟
  isPublished: { type: Boolean, default: true }, // هل المقال منشور؟
  needsReview: { type: Boolean, default: true }, // هل يحتاج المقال لمراجعة؟ (للمشاركات الجديدة)
  
  // تواريخ
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: { type: Date, default: null } // تاريخ النشر الفعلي
}, {
  timestamps: true
});

// إنشاء فهرس للبحث النصي
BlogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });

// إنشاء النموذج (إذا لم يكن موجود بالفعل)
export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
