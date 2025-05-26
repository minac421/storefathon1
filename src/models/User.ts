import mongoose, { Schema, Document } from 'mongoose';

// واجهة المستخدم
export interface IUser extends Document {
  userId: string;
  nickname: string;
  avatarId: number;
  status: string;
  lastSeen: Date;
}

// مخطط المستخدم
const UserSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'معرف المستخدم مطلوب'],
    unique: true,
    index: true
  },
  nickname: {
    type: String,
    required: [true, 'الاسم المستعار مطلوب'],
    trim: true
  },
  avatarId: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away', 'busy'],
    default: 'online'
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// إنشاء وتصدير النموذج
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 