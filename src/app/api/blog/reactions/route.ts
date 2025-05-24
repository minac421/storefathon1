import { NextRequest, NextResponse } from 'next/server';
import { ReactionType } from '@/types/blog';
import { withDatabase } from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';

// تعريف واجهة التفاعل
interface Reaction {
  type: ReactionType;
  sessionId: string;
  nickname?: string;
  timestamp: string;
}

// تعريف نموذج البيانات للتفاعلات
const ReactionSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(ReactionType) },
  sessionId: { type: String, required: true },
  nickname: { type: String, default: 'زائر' },
  timestamp: { type: Date, default: Date.now }
});

// إنشاء أو الحصول على نموذج التفاعلات
const ReactionModel = mongoose.models.Reaction || mongoose.model('Reaction', ReactionSchema);

/**
 * جلب تفاعلات المنشور
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  
  if (!postId) {
    return NextResponse.json(
      { error: 'معرّف المنشور مطلوب' },
      { status: 400 }
    );
  }

  try {
  return await withDatabase(async () => {
    try {
        // 1. جلب التفاعلات للمنشور المحدد من قاعدة البيانات
      const filter = { postId };
        const reactions = await ReactionModel.find(filter).lean().exec();
      
        // 2. جلب المنشور لضمان وجوده وتحديث عدد المشاهدات
        const post = await BlogPost.findById(postId).exec();
        if (!post) {
          return NextResponse.json(
            { error: 'المنشور غير موجود' },
            { status: 404 }
          );
        }
        
        // 3. حساب عدد كل نوع من التفاعلات
      const counts = {
        [ReactionType.SWORD]: 0,
        [ReactionType.FIRE]: 0,
        [ReactionType.SHIELD]: 0,
        [ReactionType.CROWN]: 0,
        [ReactionType.CASTLE]: 0,
          [ReactionType.LAUGH]: 0,
        total: reactions.length
      };
      
      reactions.forEach(reaction => {
        // @ts-ignore - نتجاهل خطأ TypeScript لأن النوع موجود في ReactionType
        counts[reaction.type] = (counts[reaction.type] || 0) + 1;
      });
      
      return NextResponse.json({
        success: true,
        reactions,
        counts
      });
    } catch (error) {
      console.error('Error fetching reactions:', error);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء جلب التفاعلات' },
        { status: 500 }
      );
    }
  });
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    return NextResponse.json(
      { error: 'حدث خطأ في الاتصال بقاعدة البيانات' },
      { status: 500 }
    );
  }
}

/**
 * إضافة أو إزالة تفاعل
 */
export async function POST(request: NextRequest) {
  try {
  return await withDatabase(async () => {
    try {
      console.log('Received reaction POST request');
      const body = await request.json();
      console.log('Request body:', body);
      const { postId, type, sessionId, nickname } = body;
      
        if (!postId) {
          console.error('Missing postId field');
          return NextResponse.json(
            { error: 'معرّف المنشور مطلوب' },
            { status: 400 }
          );
        }
        
        if (!type) {
          console.error('Missing type field');
          return NextResponse.json(
            { error: 'نوع التفاعل مطلوب' },
            { status: 400 }
          );
        }
        
        if (!sessionId) {
          console.error('Missing sessionId field');
        return NextResponse.json(
            { error: 'معرّف الجلسة مطلوب' },
          { status: 400 }
        );
      }
      
      // التحقق من صحة نوع التفاعل
      const validReactionTypes = ['sword', 'fire', 'shield', 'crown', 'castle', 'laugh'];
      
      if (!validReactionTypes.includes(String(type))) {
        console.error('Invalid reaction type:', type);
        return NextResponse.json(
          { error: `نوع التفاعل غير صالح: ${type}. الأنواع المسموح بها: ${validReactionTypes.join(', ')}` },
          { status: 400 }
        );
      }
      
        // 1. التحقق من وجود المنشور
        const post = await BlogPost.findById(postId).exec();
        if (!post) {
          console.error('Post not found:', postId);
          return NextResponse.json(
            { error: 'المنشور غير موجود' },
            { status: 404 }
          );
        }

        // 2. التحقق من نموذج التفاعل الموجود
      const query = {
        postId,
        sessionId,
        type
      };
      const existingReaction = await ReactionModel.findOne(query).exec();
      
      let added = false;
      
      // إذا كان التفاعل موجود، قم بإزالته (تبديل حالة التفاعل)
      if (existingReaction) {
        await ReactionModel.deleteOne({ _id: existingReaction._id });
        added = false;
      } else {
        // إضافة التفاعل الجديد
        const newReactionData = {
          postId,
          type,
          sessionId,
          nickname: nickname || 'زائر',
          timestamp: new Date()
        };
        const newReaction = new ReactionModel(newReactionData);
        await newReaction.save();
        added = true;
      }
      
        // 3. تحديث نموذج المنشور أيضًا لحفظ التفاعلات

        // إضافة التفاعل حسب النوع في نموذج المنشور
        // تأكد من وجود مصفوفة التفاعلات وتهيئتها إذا لم تكن موجودة
        if (!post.interaction) {
          post.interaction = {
            likes: [],
            shares: 0,
            bookmarks: [],
            views: 0
          };
        }

        // معالجة تفاعلات مثل السيف والإعجاب
        if (type === 'sword') {
          // تحديث مصفوفة الإعجابات (likes)
          if (!post.interaction.likes) {
            post.interaction.likes = [];
          }

          const userLikeIndex = post.interaction.likes.indexOf(sessionId);
          if (added && userLikeIndex === -1) {
            // إضافة الإعجاب
            post.interaction.likes.push(sessionId);
          } else if (!added && userLikeIndex !== -1) {
            // إزالة الإعجاب
            post.interaction.likes.splice(userLikeIndex, 1);
          }
        } else {
          // معالجة أنواع التفاعلات الأخرى (fire, shield, crown, castle, laugh)
          // تأكد من وجود كائن التفاعلات وتهيئته إذا لم يكن موجود
          if (!post.interaction.reactions) {
            post.interaction.reactions = {
              fire: [],
              shield: [],
              crown: [],
              castle: [],
              laugh: []
            };
          }

          // تأكد من وجود المصفوفة المناسبة للنوع
          if (!post.interaction.reactions[type]) {
            post.interaction.reactions[type] = [];
          }

          const reactionsArray = post.interaction.reactions[type];
          const userReactionIndex = reactionsArray.indexOf(sessionId);

          if (added && userReactionIndex === -1) {
            // إضافة التفاعل
            reactionsArray.push(sessionId);
          } else if (!added && userReactionIndex !== -1) {
            // إزالة التفاعل
            reactionsArray.splice(userReactionIndex, 1);
          }
        }

        // حفظ التغييرات على المنشور
        await post.save();
        
        // 4. جلب جميع التفاعلات المحدثة للمنشور
      const updatedFilter = { postId };
        const reactions = await ReactionModel.find(updatedFilter).lean().exec();
      
        // 5. حساب عدد كل نوع من التفاعلات
      const counts = {
        [ReactionType.SWORD]: 0,
        [ReactionType.FIRE]: 0,
        [ReactionType.SHIELD]: 0,
        [ReactionType.CROWN]: 0,
        [ReactionType.CASTLE]: 0,
          [ReactionType.LAUGH]: 0,
        total: reactions.length
      };
      
      reactions.forEach(reaction => {
        // @ts-ignore - نتجاهل خطأ TypeScript لأن النوع موجود في ReactionType
        counts[reaction.type] = (counts[reaction.type] || 0) + 1;
      });
      
      return NextResponse.json({
        success: true,
        added,
        reactions,
        counts
      });
    } catch (error) {
      console.error('Error handling reaction:', error);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء معالجة التفاعل' },
        { status: 500 }
      );
    }
  });
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    return NextResponse.json(
      { error: 'حدث خطأ في الاتصال بقاعدة البيانات' },
      { status: 500 }
    );
  }
}
