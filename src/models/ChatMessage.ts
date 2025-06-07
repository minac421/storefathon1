import mongoose, { Schema, Document } from 'mongoose';

// واجهة رسالة الدردشة
export interface IChatMessage extends Document {
  id: string;
  message: string;
  sender: string;
  userId: string;
  senderAvatarId: number;
  timestamp: Date;
  interaction: {
    likes: string[];
    isLiked: boolean;
  };
}

// مخطط تفاعل الرسالة
const InteractionSchema = new Schema({
  likes: {
    type: [String],
    default: []
  },
  isLiked: {
    type: Boolean,
    default: false
  }
});

// مخطط رسالة الدردشة
const ChatMessageSchema = new Schema({
  message: {
    type: String,
    required: [true, 'محتوى الرسالة مطلوب'],
    trim: true
  },
  sender: {
    type: String,
    required: [true, 'اسم المرسل مطلوب'],
    trim: true
  },
  userId: {
    type: String,
    required: [true, 'معرف المستخدم مطلوب'],
    index: true
  },
  senderAvatarId: {
    type: Number,
    default: 1
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  interaction: {
    type: InteractionSchema,
    default: () => ({
      likes: [],
      isLiked: false
    })
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
export default mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema); 