import { NextRequest, NextResponse } from 'next/server';
import { withDatabase } from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import mongoose from 'mongoose';
import { findDocById, findOnDoc, updateDoc } from '@/lib/mongoHelpers';

/**
 * GET handler: استرجاع الإعجابات أو التعليقات لمنشور معين
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get('postId');
  const type = searchParams.get('type'); // 'likes' or 'comments'
  
  if (!postId) {
    return NextResponse.json(
      { error: 'معرف المنشور مطلوب' },
      { status: 400 }
    );
  }
  
  try {
    return await withDatabase(async () => {
      // التحقق من وجود المنشور - استخدام findDocById
      const post = await findDocById(BlogPost, postId);
      
      if (!post) {
        return NextResponse.json(
          { error: 'المنشور غير موجود' },
          { status: 404 }
        );
      }
      
      if (type === 'likes') {
        return NextResponse.json({
          success: true,
          likes: post.interaction?.likes || [],
          count: post.interaction?.likes?.length || 0
        });
      }
      
      if (type === 'comments') {
        return NextResponse.json({
          success: true,
          comments: post.comments || [],
          count: post.comments?.length || 0
        });
      }
      
      return NextResponse.json(
        { error: 'نوع التفاعل غير صالح. يجب أن يكون "likes" أو "comments"' },
        { status: 400 }
      );
    });
  } catch (error) {
    console.error('Error fetching interactions:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء استرجاع التفاعلات' },
      { status: 500 }
    );
  }
}

/**
 * POST handler: إضافة إعجاب، إزالة إعجاب، إضافة تعليق أو رد على تعليق
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, postId, userId, commentId, content } = body;
    
    if (!postId || !userId || !action) {
      return NextResponse.json(
        { error: 'المعلومات غير كاملة' },
        { status: 400 }
      );
    }
    
    return await withDatabase(async () => {
      // التحقق من وجود المنشور - استخدام findDocById
      const post = await findDocById(BlogPost, postId);
      
      if (!post) {
        return NextResponse.json(
          { error: 'المنشور غير موجود' },
          { status: 404 }
        );
      }
      
      // تبديل حالة الإعجاب بالمنشور
      if (action === 'like') {
        const likes = post.interaction.likes || [];
        const userLikedIndex = likes.indexOf(userId);
        const userLiked = userLikedIndex === -1; // true إذا لم يكن المستخدم قد أعجب بالمنشور من قبل
        
        let updateOperation;
        
        if (userLiked) {
          // المستخدم لم يعجب بالمنشور بعد، أضف الإعجاب
          updateOperation = { 
            $addToSet: { 
              'interaction.likes': userId 
            } 
          };
        } else {
          // المستخدم أعجب بالمنشور بالفعل، أزل الإعجاب
          updateOperation = { 
            $pull: { 
              'interaction.likes': userId 
            } 
          };
        }
        
        // استخدام updateDoc بدلاً من post.save()
        await updateDoc(
          BlogPost,
          { _id: postId },
          updateOperation
        );
        
        // تحديث المصفوفة محلياً للرد
        if (userLiked) {
          likes.push(userId);
        } else {
          likes.splice(userLikedIndex, 1);
        }
        
        return NextResponse.json({
          success: true,
          likes,
          userLiked,
          count: likes.length
        });
      }
      
      // إضافة تعليق على المنشور
      if (action === 'comment' && content) {
        const commentId = new mongoose.Types.ObjectId();
        
        const newComment = {
          _id: commentId,
          author: {
            userId: userId,
            name: body.displayName || 'مستخدم',
            avatar: body.avatar || '/images/avatars/default.png'
          },
          content,
          likes: [],
          replies: [],
          isApproved: true,
          createdAt: new Date()
        };
        
        // استخدام updateDoc بدلاً من post.save()
        await updateDoc(
          BlogPost,
          { _id: postId },
          { $push: { comments: newComment } }
        );
        
        return NextResponse.json({
          success: true,
          comment: newComment
        });
      }
      
      // إضافة رد على تعليق
      if (action === 'reply' && content && commentId) {
        // البحث عن التعليق
        const commentIndex = post.comments.findIndex(c => 
          c._id && c._id.toString() === commentId
        );
        
        if (commentIndex === -1) {
          return NextResponse.json(
            { error: 'التعليق غير موجود' },
            { status: 404 }
          );
        }
        
        const replyId = new mongoose.Types.ObjectId();
        
        const newReply = {
          _id: replyId,
          author: {
            userId: userId,
            name: body.displayName || 'مستخدم',
            avatar: body.avatar || '/images/avatars/default.png'
          },
          content,
          likes: [],
          isApproved: true,
          createdAt: new Date()
        };
        
        // استخدام updateDoc بدلاً من post.save()
        await updateDoc(
          BlogPost,
          { 
            _id: postId,
            "comments._id": new mongoose.Types.ObjectId(commentId)
          },
          { 
            $push: { 
              "comments.$.replies": newReply 
            } 
          }
        );
        
        return NextResponse.json({
          success: true,
          reply: newReply
        });
      }
      
      // تبديل الإعجاب بالتعليق
      if (action === 'likeComment' && commentId) {
        // البحث عن التعليق
        const commentIndex = post.comments.findIndex(c => 
          c._id && c._id.toString() === commentId
        );
        
        if (commentIndex === -1) {
          return NextResponse.json(
            { error: 'التعليق غير موجود' },
            { status: 404 }
          );
        }
        
        // التأكد من وجود مصفوفة الإعجابات
        const likes = post.comments[commentIndex].likes || [];
        const userLikedIndex = likes.indexOf(userId);
        
        let updateOperation;
        const userLiked = userLikedIndex === -1;
        
        if (userLiked) {
          // المستخدم لم يعجب بالتعليق بعد، أضف الإعجاب
          updateOperation = { 
            $addToSet: { 
              [`comments.${commentIndex}.likes`]: userId 
            } 
          };
        } else {
          // المستخدم أعجب بالتعليق بالفعل، أزل الإعجاب
          updateOperation = { 
            $pull: { 
              [`comments.${commentIndex}.likes`]: userId 
            } 
          };
        }
        
        // استخدام updateDoc بدلاً من post.save()
        await updateDoc(
          BlogPost,
          { _id: postId },
          updateOperation
        );
        
        // تحديث المصفوفة محلياً للرد
        if (userLiked) {
          likes.push(userId);
        } else {
          likes.splice(userLikedIndex, 1);
        }
        
        return NextResponse.json({
          success: true,
          likes,
          userLiked,
          count: likes.length
        });
      }
      
      // إضافة مشاركة للمنشور
      if (action === 'share') {
        const shares = post.interaction.shares || [];
        const userSharedIndex = shares.indexOf(userId);
        
        if (userSharedIndex === -1) {
          // المستخدم لم يشارك المنشور بعد، أضف المشاركة
          shares.push(userId);
        }
        
        // استخدام updateDoc بدلاً من الاتصال المباشر
        await updateDoc(BlogPost,
          { _id: postId },
          { $set: { 'interaction.shares': shares } }
        );
        
        return NextResponse.json({
          success: true,
          shares,
          count: shares.length
        });
      }
      
      // تبديل حالة الإضافة إلى المفضلة
      if (action === 'bookmark') {
        const bookmarks = post.interaction.bookmarks || [];
        const userBookmarkedIndex = bookmarks.indexOf(userId);
        
        if (userBookmarkedIndex === -1) {
          // المستخدم لم يضف المنشور إلى المفضلة، أضفه
          bookmarks.push(userId);
        } else {
          // المستخدم أضاف المنشور إلى المفضلة بالفعل، أزله
          bookmarks.splice(userBookmarkedIndex, 1);
        }
        
        // استخدام updateDoc بدلاً من الاتصال المباشر
        await updateDoc(BlogPost,
          { _id: postId },
          { $set: { 'interaction.bookmarks': bookmarks } }
        );
        
        return NextResponse.json({
          success: true,
          bookmarks,
          isBookmarked: userBookmarkedIndex === -1,
          count: bookmarks.length
        });
      }
      
      // إضافة أو إزالة تفاعل بنوع محدد (سيف، نار، درع، تاج، قلعة)
      if (action === 'react' && body.reactionType) {
        const reactionType = body.reactionType; // 'sword', 'fire', 'shield', 'crown', 'castle'
        
        if (!['sword', 'fire', 'shield', 'crown', 'castle'].includes(reactionType)) {
          return NextResponse.json(
            { error: 'نوع التفاعل غير صالح' },
            { status: 400 }
          );
        }
        
        // تحقق من وجود مصفوفة التفاعلات وإنشائها إذا لم تكن موجودة
        if (!post.interaction.reactions) {
          post.interaction.reactions = {
            sword: [],
            fire: [],
            shield: [],
            crown: [],
            castle: []
          };
        }
        
        // تحقق من وجود مصفوفة التفاعل المحدد وإنشائها إذا لم تكن موجودة
        if (!post.interaction.reactions[reactionType]) {
          post.interaction.reactions[reactionType] = [];
        }
        
        const reactions = post.interaction.reactions[reactionType];
        const userReactedIndex = reactions.indexOf(userId);
        
        if (userReactedIndex === -1) {
          // المستخدم لم يتفاعل بهذا النوع بعد، أضف التفاعل
          reactions.push(userId);
        } else {
          // المستخدم تفاعل بهذا النوع بالفعل، أزل التفاعل
          reactions.splice(userReactedIndex, 1);
        }
        
        // تحديث التفاعلات
        const updatedReactions = {
          ...post.interaction.reactions,
          [reactionType]: reactions
        };
        
        // استخدام updateDoc بدلاً من الاتصال المباشر
        await updateDoc(BlogPost,
          { _id: postId },
          { $set: { 'interaction.reactions': updatedReactions } }
        );
        
        return NextResponse.json({
          success: true,
          reactions: updatedReactions,
          userReacted: userReactedIndex === -1,
          type: reactionType
        });
      }
      
      return NextResponse.json(
        { error: 'نوع الإجراء غير معتمد' },
        { status: 400 }
      );
    });
  } catch (error) {
    console.error('Error handling interaction:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء معالجة التفاعل' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler: حذف تعليق أو رد
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    const commentId = searchParams.get('commentId');
    const replyId = searchParams.get('replyId');
    const userId = searchParams.get('userId');
    
    if (!postId || !userId || !commentId) {
      return NextResponse.json(
        { error: 'معلومات غير كاملة' },
        { status: 400 }
      );
    }
    
    return await withDatabase(async () => {
      // التحقق من وجود المنشور - استخدام findDocById
      const post = await findDocById(BlogPost, postId);
      
      if (!post) {
        return NextResponse.json(
          { error: 'المنشور غير موجود' },
          { status: 404 }
        );
      }
      
      // حذف رد
      if (replyId) {
        // البحث عن التعليق المستهدف
        const commentIndex = post.comments.findIndex(c => 
          c._id && c._id.toString() === commentId
        );
        
        if (commentIndex === -1) {
          return NextResponse.json(
            { error: 'التعليق غير موجود' },
            { status: 404 }
          );
        }
        
        const comment = post.comments[commentIndex];
        
        // التحقق من وجود مصفوفة الردود
        if (!comment.replies || comment.replies.length === 0) {
          return NextResponse.json(
            { error: 'لا توجد ردود لهذا التعليق' },
            { status: 404 }
          );
        }
        
        // البحث عن الرد المستهدف
        const replyIndex = comment.replies.findIndex(r => 
          r._id && r._id.toString() === replyId
        );
        
        if (replyIndex === -1) {
          return NextResponse.json(
            { error: 'الرد غير موجود' },
            { status: 404 }
          );
        }
        
        const reply = comment.replies[replyIndex];
        
        // التحقق من أن المستخدم هو صاحب الرد
        if (reply.author.userId !== userId) {
          return NextResponse.json(
            { error: 'غير مصرح لك بحذف هذا الرد' },
            { status: 403 }
          );
        }
        
        // حذف الرد من التعليق
        comment.replies.splice(replyIndex, 1);
        post.comments[commentIndex] = comment;
        await post.save();
        
        return NextResponse.json({
          success: true,
          message: 'تم حذف الرد بنجاح'
        });
      }
      
      // حذف تعليق
      const commentIndex = post.comments.findIndex(c => 
        c._id && c._id.toString() === commentId
      );
      
      if (commentIndex === -1) {
        return NextResponse.json(
          { error: 'التعليق غير موجود' },
          { status: 404 }
        );
      }
      
      const comment = post.comments[commentIndex];
      
      // التحقق من أن المستخدم هو صاحب التعليق
      if (comment.author.userId !== userId) {
        return NextResponse.json(
          { error: 'غير مصرح لك بحذف هذا التعليق' },
          { status: 403 }
        );
      }
      
      // حذف التعليق من المنشور
      post.comments.splice(commentIndex, 1);
      await post.save();
      
      return NextResponse.json({
        success: true,
        message: 'تم حذف التعليق بنجاح'
      });
    });
  } catch (error) {
    console.error('Error deleting interaction:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء حذف التفاعل' },
      { status: 500 }
    );
  }
}
