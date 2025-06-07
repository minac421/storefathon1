// تعريف فئات المقال المتاحة
export enum BlogCategory {
  GUIDE = 'guide', // أدلة اللاعبين
  NEWS = 'news', // أخبار اللعبة
  TIPS = 'tips', // نصائح وحيل
  ANALYSIS = 'analysis', // تحليلات وتقييمات
  MARKET = 'market', // أخبار السوق
  MEMES = 'memes', // ميمز وطرائف
  EXPERIENCE = 'experience', // تجارب اللاعبين
}

// أنواع التفاعلات المختلفة للمقالات
export enum ReactionType {
  SWORD = 'sword', // سيف للموافقة القوية أو المحتوى الاستراتيجي
  FIRE = 'fire',   // نار للمحتوى الحماسي والمثير
  SHIELD = 'shield', // درع للمحتوى المفيد أو النصائح الدفاعية
  CROWN = 'crown',  // تاج للمحتوى الاستثنائي
  CASTLE = 'castle', // قلعة للأفكار الإبداعية أو المبتكرة
  LAUGH = 'laugh'  // ضحك للمحتوى المسلي أو الطريف
}

// واجهة بيانات التفاعل
export interface Reaction {
  type: ReactionType;
  sessionId: string; // معرف الجلسة لمنع التكرار
  nickname?: string; // اسم مستعار اختياري للمستخدم
  timestamp: string; // توقيت التفاعل
}

// واجهة معلومات المؤلف
export interface Author {
  nickname: string;  // الاسم المستعار
  avatar?: string;   // رابط الصورة الرمزية
  sessionId: string; // معرّف جلسة مشفر (للداخل فقط)
  email?: string;    // اختياري، للإشعارات
  badge?: string;    // شارة خاصة (مطور، مشرف، لاعب مميز)
}

// واجهة التعليق
export interface Comment {
  id: string;
  postId: string;
  content: string;
  author: Author;
  createdAt: string;
  reactions: Reaction[];
  replies?: Comment[];
}

// واجهة تفاعلات المقال
export interface PostInteraction {
  reactions: Reaction[];
  views: number;
  shares: number;
  comments: Comment[];
}

// نموذج بيانات المقال للواجهة الأمامية
export interface BlogPostProps {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  category: string;
  featuredImage: string;
  author: Author;
  tags: string[];
  interaction: PostInteraction;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
