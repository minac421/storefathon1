import { NextRequest, NextResponse } from 'next/server';
import { BlogCategory } from '@/types/blog';
import dbConnect from '@/lib/dbConnect';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';
import { findDocById, findOnDoc, findDocs, updateDoc, deleteDoc, countDocs, addClientIds } from '@/lib/mongoHelpers';

/**
 * تحويل العنوان إلى slug صديق للـ URL
 * @param text النص المراد تحويله
 * @returns slug منسق
 */
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // تطبيع النص
    .replace(/[\u0300-\u036f]/g, '') // إزالة علامات التشكيل
    .toLowerCase() // تحويل إلى أحرف صغيرة
    .trim() // إزالة المسافات الزائدة
    .replace(/\s+/g, '-') // استبدال المسافات بشرطات
    .replace(/[^\w\-]+/g, '') // إزالة جميع الأحرف غير الكلمات
    .replace(/\-\-+/g, '-') // استبدال الشرطات المتعددة بشرطة واحدة
    .replace(/^-+/, '') // إزالة الشرطات من البداية
    .replace(/-+$/, ''); // إزالة الشرطات من النهاية
}

/**
 * API للحصول على المقالات (جميع المقالات أو مقال محدد)
 */
export async function GET(request: NextRequest) {
  // أقصى عدد لمحاولات الاتصال بقاعدة البيانات
  const MAX_RETRIES = 2;
  let retryCount = 0;
  
  while (retryCount <= MAX_RETRIES) {
    try {
      console.log(`محاولة الاتصال بقاعدة البيانات (${retryCount + 1}/${MAX_RETRIES + 1})`);
      
      // الاتصال بقاعدة البيانات
      await dbConnect();

      // استخراج المعلمات من الـ URL
      const url = new URL(request.url);
      const slug = url.searchParams.get('slug');
      const id = url.searchParams.get('id');
      
      // إذا تم تقديم معرف أو slug، قم بإرجاع المقال المحدد
      if (slug) {
        // استخدام الوظيفة المساعدة findOnDoc لتجنب أخطاء TypeScript
        const post = await findOnDoc(BlogPost, { 
          slug: slug, 
          isPublished: true 
        });
        
        if (!post) {
          return NextResponse.json(
            { error: 'المقال غير موجود' },
            { status: 404 }
          );
        }
        
        // زيادة عدد المشاهدات باستخدام updateDoc
        await updateDoc(BlogPost, 
          { slug: slug },
          { $inc: { "interaction.views": 1 } }
        );

        // تحويل معرفات MongoDB إلى id للواجهة
        const clientPost = addClientIds(post);
        
        // طباعة معلومات التصحيح
        console.log(`استجابة API للمقال الفردي (${slug}): صورة: ${clientPost.featuredImage ? 'موجودة' : 'غير موجودة'}`);
        
        return NextResponse.json({ post: clientPost });
      }
      
      if (id) {
        // استخدام الوظيفة المساعدة findDocById لتجنب أخطاء TypeScript
        const post = await findDocById(BlogPost, id);
        
        if (!post) {
          return NextResponse.json(
            { error: 'المقال غير موجود' },
            { status: 404 }
          );
        }

        // تحويل معرفات MongoDB إلى id للواجهة
        const clientPost = addClientIds(post);
        
        return NextResponse.json({ post: clientPost });
      }
      
      // إرجاع جميع المقالات المنشورة مع دعم التصنيف والترتيب
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const sort = url.searchParams.get('sort') || 'recent';
      const category = url.searchParams.get('category');
      
      // إنشاء شروط البحث
      const query: any = {};
      
      // إذا لم يتم طلب عرض المنشورات غير المنشورة، نعرض فقط المنشورات المنشورة
      const includeUnpublished = url.searchParams.get('includeUnpublished') === 'true';
      if (!includeUnpublished) {
        query.isPublished = true;
      }
      
      if (category) {
        query.category = category;
      }
      
      // تحديد طريقة الترتيب
      let sortOption: any = { createdAt: -1 }; // الافتراضي: الأحدث أولاً
      
      if (sort === 'popular') {
        sortOption = { "interaction.views": -1 }; // الأكثر مشاهدة
      } else if (sort === 'comments') {
        sortOption = { "comments.length": -1 }; // الأكثر تعليقات
      }
      
      // حساب التخطي للصفحات
      const skip = (page - 1) * limit;
      
      console.log('Query:', JSON.stringify(query));
      console.log('Sort:', JSON.stringify(sortOption));
      
      // تنفيذ الاستعلام مع الترتيب والتقسيم إلى صفحات
      // استخدام الوظيفة المساعدة findDocs لتجنب أخطاء TypeScript
      const posts = await findDocs(BlogPost, query, {
        sort: sortOption,
        skip: skip,
        limit: limit
      });
      
      console.log(`تم استرجاع ${posts.length} منشورات`);
      
      // الحصول على إجمالي عدد المقالات للترقيم
      const total = await countDocs(BlogPost, query);
      const totalPages = Math.ceil(total / limit);
      
      // تحويل معرفات المنشورات من MongoDB إلى id للواجهة
      const clientPosts = addClientIds(posts);
      
      // الطباعة للتصحيح
      console.log('تحويل منشورات MongoDB إلى منشورات لواجهة المستخدم مع الصور:');
      clientPosts.forEach(post => {
        console.log(`المنشور: ${post.title} - صورة: ${post.featuredImage ? 'موجودة' : 'غير موجودة'}`);
      });
      
      // إرجاع النتائج مع معلومات الترقيم
      const pagination = {
        total,
        page,
        limit,
        totalPages,
      };
      
      return NextResponse.json({ 
        posts: clientPosts, 
        pagination 
      });
      
    } catch (error) {
      retryCount++;
      
      if (retryCount > MAX_RETRIES) {
        console.error('Error fetching posts after maximum retries:', error);
        
        // تفاصيل إضافية للخطأ
        let errorMessage = 'حدث خطأ أثناء جلب المقالات';
        let errorDetails = '';
        
        if (error instanceof Error) {
          errorDetails = error.message;
          
          // تحسين رسائل الخطأ
          if (error.message.includes('MongoServerSelectionError')) {
            errorMessage = 'تعذر الاتصال بخادم قاعدة البيانات';
          } else if (error.message.includes('Authentication failed')) {
            errorMessage = 'فشل المصادقة مع قاعدة البيانات';
          } else if (error.message.includes('Operation')) {
            errorMessage = 'انتهت مهلة عملية قاعدة البيانات';
          }
        }
        
        return NextResponse.json(
          { 
            error: errorMessage, 
            details: errorDetails,
            code: 'DB_ERROR' 
          },
          { status: 500 }
        );
      }
      
      // انتظار قبل المحاولة مرة أخرى - تزداد المدة مع كل محاولة
      const delay = 1000 * retryCount; // 1 ثانية، ثم 2 ثانية
      console.log(`فشل الاتصال بقاعدة البيانات، إعادة المحاولة بعد ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // لن يتم الوصول إلى هذه النقطة أبدًا بسبب حلقة المحاولة أعلاه
  return NextResponse.json(
    { error: 'خطأ غير متوقع' },
    { status: 500 }
  );
}

/**
 * API لإنشاء مقال جديد
 */
export async function POST(request: NextRequest) {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();

    // التحقق من نوع المحتوى
    const contentType = request.headers.get('content-type') || '';
    
    let title = '';
    let content = '';
    let summary = '';
    let category = '';
    let tags: string[] = [];
    let featuredImage: string | null = null;
    let author: any = null;
    
    // التعامل مع FormData (في حالة تحميل ملفات)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      title = formData.get('title') as string || '';
      content = formData.get('content') as string || '';
      category = formData.get('category') as string || 'news';
      const authorName = formData.get('authorName') as string || 'مستخدم جديد';
      const authorAvatar = formData.get('authorAvatar') as string || '/images/avatars/default.png';
      
      // معالجة الصورة المرفقة
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        console.log('تم استلام ملف صورة:', imageFile.name, 'حجم:', imageFile.size);
        
        try {
          // تحويل الصورة إلى Data URL للعرض مباشرة
          const arrayBuffer = await imageFile.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const base64 = buffer.toString('base64');
          const contentType = imageFile.type || 'image/jpeg';
          featuredImage = `data:${contentType};base64,${base64}`;
          console.log('تم معالجة الصورة بنجاح وتحويلها إلى صيغة قابلة للعرض');
        } catch (error) {
          console.error('خطأ في معالجة ملف الصورة:', error);
        }
      } else {
        console.log('لم يتم العثور على ملف الصورة في FormData أو أن الملف فارغ');
      }
      
      // إنشاء ملخص من المحتوى إذا لم يكن موجودًا
      summary = content.substring(0, 150) + (content.length > 150 ? '...' : '');
      
      // معلومات المؤلف
      author = {
        name: authorName,
        avatar: authorAvatar,
        isVerified: false
      };
    } 
    // التعامل مع JSON
    else {
      const body = await request.json();
      title = body.title || '';
      content = body.content || '';
      summary = body.summary || '';
      category = body.category || '';
      tags = body.tags || [];
      featuredImage = body.featuredImage || null;
      author = body.author || null;
    }

    // التحقق من وجود محتوى
    if (!content) {
      return NextResponse.json(
        { error: 'محتوى المنشور مطلوب' },
        { status: 400 }
      );
    }
    
    // التأكد من وجود عنوان مناسب
    if (!title || title.trim() === '') {
      title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
    }
    
    // التأكد من وجود ملخص
    if (!summary || summary.trim() === '') {
      summary = content.substring(0, 150) + (content.length > 150 ? '...' : '');
    }
    
    // التأكد من وجود فئة
    if (!category) {
      category = 'news';
    }

    // إنشاء slug فريد من العنوان
    let slug = slugify(title);
    if (!slug) {
      slug = 'post-' + Date.now().toString();
    }
    
    // التحقق مما إذا كان الـ slug موجودًا بالفعل
    const existingPost = await findOnDoc(BlogPost, { 
      slug: slug 
    });
    
    if (existingPost) {
      // إضافة رقم عشوائي لتجنب تكرار الـ slug
      slug = `${slug}-${Date.now().toString().slice(-6)}`;
    }
    
    // إنشاء مقال جديد
    const newPost = new mongoose.models.BlogPost({
      title,
      slug,
      content,
      summary,
      category,
      tags: tags || [],
      featuredImage: featuredImage || null,
      author: {
        name: author?.name || 'فريق الفاتحون',
        avatar: author?.avatar || '/images/avatars/team.png',
        isVerified: author?.isVerified || false
      },
      interaction: {
        likes: [],
        shares: 0,
        views: 0,
        bookmarks: []
      },
      isPublished: true, // تغيير ليكون منشورًا بشكل افتراضي
      isApproved: true // تغيير ليكون موافقًا عليه بشكل افتراضي
    });
    
    // حفظ المقال في قاعدة البيانات
    await newPost.save();
    
    return NextResponse.json({
      success: true,
      post: newPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء المقال' },
      { status: 500 }
    );
  }
}

/**
 * API لتحديث مقال موجود
 */
export async function PUT(request: NextRequest) {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { id, title, content, summary, category, tags, isPublished, isApproved, featuredImage } = body;
    
    if (!id) {
      console.error('خطأ: معرف المقال غير موجود في الطلب');
      return NextResponse.json(
        { error: 'معرف المقال مطلوب' },
        { status: 400 }
      );
    }
    
    // تحديث المقال مباشرة في قاعدة البيانات
    const updateData: any = {
      updatedAt: new Date()
    };
    
    if (title) {
      updateData.title = title;
      
      // تحديث الـ slug إذا تغير العنوان
      let newSlug = slugify(title);
      if (!newSlug) {
        newSlug = 'post-' + Date.now().toString();
      }
      
      const existingPost = await findOnDoc(BlogPost, { 
        slug: newSlug, 
        _id: { $ne: id } 
      });
      
      if (existingPost) {
        // إضافة تاريخ للـ slug لتجنب التكرار
        newSlug = `${newSlug}-${Date.now().toString().slice(-6)}`;
      }
      
      updateData.slug = newSlug;
    }
    
    if (content) updateData.content = content;
    if (summary) updateData.summary = summary;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
    }
    
    if (isApproved !== undefined) {
      updateData.isApproved = isApproved;
    }
    
    // إضافة معالجة لحقل الصورة المميزة
    if (featuredImage !== undefined) {
      updateData.featuredImage = featuredImage;
      console.log('تحديث الصورة المميزة:', featuredImage);
    }
    
    try {
      // استخدام updateDoc مع التحقق من النوع
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { error: 'معرف المقال غير صالح' },
          { status: 400 }
        );
      }

      // تحديث المقال مع التحقق من النجاح
      const updateResult = await updateDoc(BlogPost, { _id: id }, updateData);
      
      if (!updateResult) {
        throw new Error('فشل في تحديث المقال');
      }
      
      // جلب المقال المحدث مع التحقق من وجوده
      const post = await findDocById(BlogPost, id);
      
      if (!post) {
        return NextResponse.json(
          { error: 'حدث خطأ أثناء جلب المقال المحدث' },
          { status: 500 }
        );
      }
      
      // نظرًا لأن findDocById يستخدم lean()، فالنتيجة هي كائن JavaScript عادي وليس وثيقة Mongoose
      return NextResponse.json({
        success: true,
        post: {
          ...post, // استخدام الكائن مباشرة بدلاً من استدعاء toObject()
          _id: post._id.toString(),
          createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
          updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined
        }
      });
    } catch (error) {
      console.error('Error updating post:', error);
      return NextResponse.json(
        { error: 'حدث خطأ أثناء تحديث المقال' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء تحديث المقال' },
      { status: 500 }
    );
  }
}

/**
 * API لحذف مقال
 */
export async function DELETE(request: NextRequest) {
  try {
    // الاتصال بقاعدة البيانات
    await dbConnect();
    
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'معرف المقال مطلوب' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود المقال قبل الحذف
    const exists = await findDocById(BlogPost, id);
    
    if (!exists) {
      return NextResponse.json(
        { error: 'المقال غير موجود' },
        { status: 404 }
      );
    }
    
    // حذف المقال
    await deleteDoc(BlogPost, { _id: id });
    
    return NextResponse.json({ 
      success: true,
      message: 'تم حذف المقال بنجاح'
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف المقال' },
      { status: 500 }
    );
  }
}
