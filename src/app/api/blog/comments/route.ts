import { NextRequest, NextResponse } from 'next/server';
import { withDatabase } from '@/lib/db';
import mongoose from 'mongoose';
import BlogPost from '@/models/BlogPost';
import { addClientIds } from '@/lib/mongoHelpers';

// تعريف نموذج البيانات للتعليقات
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  authorAvatarId: { type: Number },
  postId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// إنشاء أو الحصول على نموذج التعليقات
let CommentModel: mongoose.Model<any>;

try {
  // محاولة الحصول على النموذج الموجود
  CommentModel = mongoose.model('Comment');
} catch (err) {
  // إذا لم يكن النموذج موجوداً، نقوم بإنشائه
  CommentModel = mongoose.model('Comment', commentSchema);
}

// دالة مساعدة للتحقق من صحة معرف المنشور
async function validatePostId(postId: string) {
  // أولاً، تحقق من أن المعرف له تنسيق صالح
  if (!postId || typeof postId !== 'string') {
    console.warn('تحقق من صحة المعرف: معرف المنشور غير صالح أو مفقود', { postId });
    return { valid: false, error: 'معرف المنشور غير صالح أو مفقود' };
  }

  try {
    // محاولة إنشاء ObjectId إذا كان المعرف بالتنسيق الصحيح
    let objectId;
    let isValidObjectId = false;
    
    // التحقق من أن المعرف يطابق تنسيق ObjectId في MongoDB
    if (/^[0-9a-fA-F]{24}$/.test(postId)) {
      try {
        objectId = new mongoose.Types.ObjectId(postId);
        isValidObjectId = true;
      } catch (err) {
        console.warn('لا يمكن تحويل المعرف إلى ObjectId مع أنه يبدو صالحًا:', { postId, error: err });
      }
    } else {
      console.log('المعرف ليس بتنسيق MongoDB ObjectId، سيتم البحث بطريقة أخرى:', { postId });
    }
    
    // إعداد استعلام بناءً على نوع المعرف
    const query: any = { $or: [] };
    
    // إضافة البحث بالمعرف الأصلي إذا كان معرف MongoDB صالح
    if (isValidObjectId) {
      query.$or.push({ _id: objectId });
    }
    
    // إضافة بحث باستخدام حقل id وكذلك باستخدام حقل slug
    query.$or.push({ id: postId });
    query.$or.push({ slug: postId });
    
    console.log('التحقق من المنشور باستخدام الاستعلام:', JSON.stringify(query));
    
    // البحث عن المنشور
    const count = await BlogPost.countDocuments(query);
    
    const isValid = count > 0;
    console.log(`نتيجة التحقق من المنشور: ${isValid ? 'موجود' : 'غير موجود'}`, { postId, count });
    
    return { 
      valid: isValid, 
      error: isValid ? null : 'المنشور غير موجود' 
    };
  } catch (err) {
    console.error('خطأ غير متوقع في التحقق من معرف المنشور:', err);
    return { valid: false, error: 'خطأ في التحقق من معرف المنشور' };
  }
}

// دالة مساعدة للحصول على التعليقات من نموذج BlogPost مباشرة
async function getPostCommentsDirectly(postId: string) {
  console.log('محاولة الحصول على التعليقات من نموذج BlogPost مباشرةً:', { postId });
  
  try {
    // تحضير الاستعلام
    const query: any = { $or: [] };
    
    // إضافة البحث بـ _id إذا كان معرف MongoDB صالح
    if (/^[0-9a-fA-F]{24}$/.test(postId)) {
      try {
        const objectId = new mongoose.Types.ObjectId(postId);
        query.$or.push({ _id: objectId });
      } catch (err) {
        console.log('تعذر تحويل المعرف إلى ObjectId:', { postId });
      }
    }
    
    // إضافة بحث بـ slug وid
    query.$or.push({ id: postId });
    query.$or.push({ slug: postId });
    
    console.log('استعلام الحصول على تعليقات المنشور:', JSON.stringify(query));
    
    // تنفيذ الاستعلام وتحديد فقط حقل التعليقات
    const post = await (BlogPost as any).findOne(query).select('comments').lean().exec();
    
    // التحقق من وجود المنشور
    if (!post) {
      console.log('لم يتم العثور على المنشور:', { postId });
      return { success: false, error: 'المنشور غير موجود' };
    }
    
    // التحقق من وجود التعليقات
    if (!post.comments || !Array.isArray(post.comments)) {
      console.log('المنشور موجود ولكن لا توجد تعليقات:', { postId });
      return { success: true, comments: [] };
    }
    
    console.log(`تم العثور على ${post.comments.length} تعليق للمنشور:`, { postId });
    
    // تحويل التعليقات
    const transformedComments = post.comments.map(comment => {
      // التعامل مع تنسيق schema الخاص بالمنشور
      const commentObj = {
        id: comment._id ? comment._id.toString() : `temp-${Date.now()}`,
        text: comment.content, // في نموذج BlogPost، التعليق يستخدم حقل content
        author: typeof comment.author === 'object' ? comment.author.name : comment.author,
        authorAvatarId: comment.author && typeof comment.author === 'object' && comment.author.avatar ? 
          // محاولة استخراج معرف الصورة من مسار الصورة إذا كان متاحًا
          parseInt(comment.author.avatar.replace(/[^\d]/g, '')) || 1 : 1,
        createdAt: comment.createdAt || new Date().toISOString(),
        postId: postId
      };
      
      return commentObj;
    });
    
    // ترتيب التعليقات من الأحدث إلى الأقدم
    transformedComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return { success: true, comments: transformedComments };
  } catch (error) {
    console.error('خطأ أثناء الحصول على تعليقات المنشور مباشرة:', error);
    return { success: false, error: error.message || 'حدث خطأ أثناء جلب تعليقات المنشور' };
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');
  
  if (!postId) {
    console.warn('محاولة الوصول إلى التعليقات بدون معرف منشور');
    return NextResponse.json({ 
      success: false, 
      error: 'معرف المنشور مطلوب' 
    }, { status: 400 });
  }
  
  console.log('طلب التعليقات للمنشور:', { postId });
  
  try {
    return await withDatabase(async () => {
      try {
        // طريقة 1: محاولة الحصول على التعليقات من النموذج BlogPost مباشرة (الطريقة المفضلة)
        const directResult = await getPostCommentsDirectly(postId);
        if (directResult.success) {
          return NextResponse.json(directResult);
        }
        
        console.log('فشل الحصول على التعليقات من BlogPost، محاولة الطريقة البديلة');
        
        // طريقة 2: التحقق من وجود المنشور ثم الحصول على التعليقات من CommentModel
        // التحقق من وجود المنشور (تم تحسين هذه الدالة)
        const { valid, error } = await validatePostId(postId);
        
        if (!valid) {
          console.warn(`تحذير: المنشور غير صالح: ${postId}، الخطأ: ${error}`);
          return NextResponse.json({
            success: false,
            error: error || 'حدث خطأ أثناء التحقق من وجود المنشور'
          }, { status: error === 'المنشور غير موجود' ? 404 : 400 });
        }
        
        console.log('جاري البحث عن تعليقات المنشور:', { postId });
        
        // استرجاع التعليقات باستخدام أسلوب بناء الاستعلام خطوة بخطوة
        const comments = await CommentModel.find()
          .where('postId').equals(postId)
          .sort({ createdAt: -1 })
          .lean()
          .limit(100); // تقييد عدد التعليقات للأداء
        
        console.log(`تم العثور على ${comments.length} تعليق للمنشور:`, { postId });
        
        // تحويل معرفات MongoDB (_id) إلى معرفات سهلة الاستخدام للواجهة (id)
        const clientComments = comments && comments.length > 0 ? addClientIds(comments) : [];
        
        return NextResponse.json({ 
          success: true, 
          comments: clientComments 
        });
      } catch (error) {
        console.error('خطأ في جلب التعليقات:', error);
        // إضافة تفاصيل أكثر للخطأ
        const errorDetails = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : '';
        
        console.error('تفاصيل خطأ جلب التعليقات:', { 
          message: errorDetails, 
          stack: errorStack,
          postId 
        });
        
        return NextResponse.json({ 
          success: false, 
          error: 'حدث خطأ أثناء جلب التعليقات',
          details: errorDetails
        }, { status: 500 });
      }
    });
  } catch (dbConnError) {
    console.error('خطأ في الاتصال بقاعدة البيانات:', dbConnError);
    const errorDetails = dbConnError instanceof Error ? dbConnError.message : String(dbConnError);
    const errorStack = dbConnError instanceof Error ? dbConnError.stack : '';
    
    console.error('تفاصيل خطأ الاتصال بقاعدة البيانات:', { 
      message: errorDetails, 
      stack: errorStack,
      postId 
    });
    
    return NextResponse.json({ 
      success: false, 
      error: 'حدث خطأ في الاتصال بقاعدة البيانات',
      details: errorDetails
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    return await withDatabase(async () => {
      try {
        const { text, author, authorAvatarId, postId } = await req.json();
        
        // التحقق من البيانات المطلوبة
        if (!text || typeof text !== 'string') {
          return NextResponse.json({ 
            success: false, 
            error: 'يجب كتابة نص التعليق' 
          }, { status: 400 });
        }
        
        if (!author || typeof author !== 'string') {
          return NextResponse.json({ 
            success: false, 
            error: 'يجب تحديد اسم المعلق' 
          }, { status: 400 });
        }
        
        if (!postId || typeof postId !== 'string') {
          return NextResponse.json({ 
            success: false, 
            error: 'يجب تحديد معرف المنشور' 
          }, { status: 400 });
        }
        
        // التحقق من وجود المنشور
        const { valid, error } = await validatePostId(postId);
        
        if (!valid) {
          return NextResponse.json({
            success: false,
            error: error || 'حدث خطأ أثناء التحقق من وجود المنشور'
          }, { status: error === 'المنشور غير موجود' ? 404 : 400 });
        }
        
        try {
          // طريقة 1: إضافة التعليق إلى المنشور نفسه في نموذج BlogPost (الطريقة المفضلة)
          const query: any = { $or: [] };
          
          // إضافة البحث بـ _id إذا كان معرف MongoDB صالح
          if (/^[0-9a-fA-F]{24}$/.test(postId)) {
            try {
              const objectId = new mongoose.Types.ObjectId(postId);
              query.$or.push({ _id: objectId });
            } catch (err) {
              console.log('تعذر تحويل المعرف إلى ObjectId:', { postId });
            }
          }
          
          // إضافة بحث بـ slug وid
          query.$or.push({ id: postId });
          query.$or.push({ slug: postId });
          
          console.log('استعلام إضافة تعليق للمنشور:', JSON.stringify(query));
          
          // إنشاء تعليق جديد لنموذج BlogPost
          const newComment = {
            author: {
              name: author,
              avatar: authorAvatarId ? `/images/avatars/${authorAvatarId}.png` : '/images/avatars/default.png'
            },
            content: text,
            createdAt: new Date()
          };
          
          // تحديث المنشور بإضافة التعليق
          const updateResult = await (BlogPost as any).updateOne(
            query,
            { $push: { comments: newComment } }
          );
          
          console.log('نتيجة إضافة التعليق للمنشور:', updateResult);
          
          if (updateResult.matchedCount > 0) {
            // تم العثور على المنشور وتحديثه
            return NextResponse.json({ 
              success: true, 
              comment: {
                id: `temp-${Date.now()}`,
                text: text,
                author: author,
                authorAvatarId: authorAvatarId || 1,
                createdAt: new Date().toISOString(),
                postId: postId
              }
            });
          }
          
          console.log('لم يتم العثور على المنشور لإضافة التعليق، جاري المحاولة بالطريقة البديلة');
          
          // طريقة 2: إضافة التعليق في نموذج التعليقات المستقل
          const newCommentModel = new CommentModel({
            text,
            author,
            authorAvatarId: authorAvatarId || 1, // قيمة افتراضية إذا لم يتم التحديد
            postId,
            createdAt: new Date()
          });
          
          await newCommentModel.save();
          
          // تحويل المستند إلى كائن عادي وإضافة id سهل الاستخدام للواجهة
          const commentDoc = newCommentModel.toObject();
          const clientComment = addClientIds(commentDoc);
          
          return NextResponse.json({ 
            success: true, 
            comment: clientComment 
          });
        } catch (saveError) {
          console.error('Error saving comment:', saveError);
          const errorStack = saveError instanceof Error ? saveError.stack : '';
          console.error('تفاصيل خطأ حفظ التعليق:', { 
            message: saveError.message, 
            stack: errorStack,
            postId 
          });
          
          return NextResponse.json({ 
            success: false, 
            error: 'حدث خطأ أثناء حفظ التعليق',
            details: saveError instanceof Error ? saveError.message : String(saveError)
          }, { status: 500 });
        }
      } catch (error) {
        console.error('Error creating comment:', error);
        const errorStack = error instanceof Error ? error.stack : '';
        console.error('تفاصيل خطأ إنشاء التعليق:', { 
          message: error.message, 
          stack: errorStack 
        });
        
        return NextResponse.json({ 
          success: false, 
          error: 'حدث خطأ أثناء إنشاء التعليق',
          details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
      }
    });
  } catch (dbConnError) {
    console.error('خطأ في الاتصال بقاعدة البيانات عند إضافة تعليق:', dbConnError);
    const errorStack = dbConnError instanceof Error ? dbConnError.stack : '';
    console.error('تفاصيل خطأ الاتصال بقاعدة البيانات:', { 
      message: dbConnError.message, 
      stack: errorStack 
    });
    
    return NextResponse.json({ 
      success: false, 
      error: 'حدث خطأ في الاتصال بقاعدة البيانات',
      details: dbConnError instanceof Error ? dbConnError.message : String(dbConnError)
    }, { status: 500 });
  }
}
