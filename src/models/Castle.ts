import mongoose from 'mongoose';

// تعريف مخطط بيانات القلعة
const CastleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'الرجاء إدخال اسم القلعة'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'الرجاء إدخال وصف القلعة'],
  },
  level: {
    type: Number,
    required: [true, 'الرجاء تحديد مستوى القلعة'],
    min: 1
  },
  strength: {
    type: Number,
    required: [true, 'الرجاء تحديد قوة القلعة'],
    min: 1
  },
  price: {
    type: Number,
    required: [true, 'الرجاء تحديد سعر القلعة'],
    min: 0
  },
  castleType: {
    type: String,
    required: [true, 'الرجاء تحديد نوع القلعة'],
    default: 'standard'
  },
  features: [{
    type: String,
    trim: true
  }],
  icon: {
    type: String,
    default: '🏰'
  },
  popular: {
    type: Boolean,
    default: false
  },
  videoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// إضافة فهرسة لتحسين البحث
CastleSchema.index({ name: 'text', description: 'text' });

// إنشاء النموذج (اذا لم يكن موجود بالفعل)
export default mongoose.models.Castle || mongoose.model('Castle', CastleSchema);

