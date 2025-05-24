import dbConnect from './dbConnect';
import CastleModel from '../models/Castle';
import { Castle } from './castlesService';

// خدمة التعامل مع قاعدة بيانات MongoDB

/**
 * الحصول على جميع القلاع من قاعدة البيانات
 */
export const getAllCastles = async (): Promise<Castle[]> => {
  try {
    await dbConnect();
    const castles = await CastleModel.find({}).sort({ createdAt: -1 });
    
    return castles.map(doc => {
      const castle = doc.toObject();
      return {
        id: castle._id.toString(),
        name: castle.name,
        description: castle.description,
        level: castle.level,
        strength: castle.strength,
        price: castle.price,
        features: castle.features,
        icon: castle.icon,
        popular: castle.popular,
        videoUrl: castle.videoUrl,
        createdAt: castle.createdAt,
        updatedAt: castle.updatedAt
      };
    });
  } catch (error) {
    console.error('خطأ في جلب القلاع:', error);
    throw error;
  }
};

/**
 * الحصول على قلعة محددة بواسطة المعرف
 */
export const getCastleById = async (id: string): Promise<Castle | null> => {
  try {
    await dbConnect();
    const castle = await CastleModel.findById(id);
    
    if (!castle) {
      return null;
    }
    
    const castleObj = castle.toObject();
    return {
      id: castleObj._id.toString(),
      name: castleObj.name,
      description: castleObj.description,
      level: castleObj.level,
      strength: castleObj.strength,
      price: castleObj.price,
      features: castleObj.features,
      icon: castleObj.icon,
      popular: castleObj.popular,
      videoUrl: castleObj.videoUrl,
      createdAt: castleObj.createdAt,
      updatedAt: castleObj.updatedAt
    };
  } catch (error) {
    console.error('خطأ في جلب القلعة:', error);
    throw error;
  }
};

/**
 * إضافة قلعة جديدة
 */
export const addCastle = async (castle: Omit<Castle, 'id'>): Promise<string> => {
  try {
    await dbConnect();
    const newCastle = await CastleModel.create(castle);
    return newCastle._id.toString();
  } catch (error) {
    console.error('خطأ في إضافة القلعة:', error);
    throw error;
  }
};

/**
 * تحديث قلعة موجودة
 */
export const updateCastle = async (castle: Castle): Promise<void> => {
  try {
    await dbConnect();
    
    const { id, ...castleData } = castle;
    
    await CastleModel.findByIdAndUpdate(id, {
      ...castleData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('خطأ في تحديث القلعة:', error);
    throw error;
  }
};

/**
 * حذف قلعة
 */
export const deleteCastle = async (id: string): Promise<void> => {
  try {
    await dbConnect();
    await CastleModel.findByIdAndDelete(id);
  } catch (error) {
    console.error('خطأ في حذف القلعة:', error);
    throw error;
  }
};

/**
 * رفع ملف فيديو للقلعة
 * ملاحظة: يتطلب تنفيذ كامل لرفع ملفات في Next.js، نستخدم رابط وهمي مؤقتاً
 */
export const uploadCastleVideo = async (file: File, castleId: string): Promise<string> => {
  try {
    // عادة ما تتضمن هذه العملية رفع الملف إلى خدمة تخزين ملفات سحابية
    // نحن فقط نعيد رابط وهمي الآن، مع تنفيذ كامل لاحقاً
    const videoUrl = `https://example.com/videos/${castleId}_${Date.now()}.mp4`;
    
    // تحديث القلعة برابط الفيديو
    await updateCastle({
      id: castleId,
      videoUrl,
      // هذه البيانات ستكون متاحة بالفعل في الخادم 
      // لكننا نضيفها هنا فقط للتوافق مع واجهة الدالة
    } as Castle);
    
    return videoUrl;
  } catch (error) {
    console.error('خطأ في رفع فيديو القلعة:', error);
    throw error;
  }
};

/**
 * الحصول على القلاع المميزة
 */
export const getPopularCastles = async (): Promise<Castle[]> => {
  try {
    await dbConnect();
    const castles = await CastleModel.find({ popular: true }).sort({ createdAt: -1 });
    
    return castles.map(doc => {
      const castle = doc.toObject();
      return {
        id: castle._id.toString(),
        name: castle.name,
        description: castle.description,
        level: castle.level,
        strength: castle.strength,
        price: castle.price,
        features: castle.features,
        icon: castle.icon,
        popular: castle.popular,
        videoUrl: castle.videoUrl,
        createdAt: castle.createdAt,
        updatedAt: castle.updatedAt
      };
    });
  } catch (error) {
    console.error('خطأ في جلب القلاع المميزة:', error);
    throw error;
  }
};
