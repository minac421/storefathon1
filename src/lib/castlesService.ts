import { db, storage } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// واجهة القلعة
export interface Castle {
  id?: string; // معرف القلعة (اختياري عند الإنشاء، مطلوب عند التحديث)
  name: string; // اسم القلعة
  description: string; // وصف القلعة
  level: number; // مستوى القلعة
  strength: number; // قوة القلعة
  price: number; // سعر القلعة
  features: string[]; // ميزات القلعة
  icon: string; // رمز أو أيقونة القلعة
  popular: boolean; // ما إذا كانت القلعة مميزة/مشهورة
  videoUrl?: string; // رابط فيديو القلعة (اختياري)
  createdAt?: any; // تاريخ إنشاء القلعة
  updatedAt?: any; // تاريخ آخر تحديث للقلعة
}

// تجميع Firestore للقلاع
const castlesCollection = collection(db, 'castles');

/**
 * جلب جميع القلاع من قاعدة البيانات
 */
export const getAllCastles = async (): Promise<Castle[]> => {
  try {
    const castlesQuery = query(castlesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(castlesQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        level: data.level,
        strength: data.strength,
        price: data.price,
        features: data.features,
        icon: data.icon,
        popular: data.popular,
        videoUrl: data.videoUrl,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      };
    });
  } catch (error) {
    console.error('خطأ في جلب القلاع:', error);
    throw error;
  }
};

/**
 * جلب قلعة محددة بواسطة المعرف
 */
export const getCastleById = async (id: string): Promise<Castle | null> => {
  try {
    const docRef = doc(db, 'castles', id);
    const snapshot = await getDoc(docRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      level: data.level,
      strength: data.strength,
      price: data.price,
      features: data.features,
      icon: data.icon,
      popular: data.popular,
      videoUrl: data.videoUrl,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate()
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
    const docRef = await addDoc(castlesCollection, {
      ...castle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('خطأ في إضافة القلعة:', error);
    throw error;
  }
};

/**
 * تحديث قلعة موجودة
 */
export const updateCastle = async (castle: Castle): Promise<void> => {
  if (!castle.id) {
    throw new Error('معرف القلعة مطلوب للتحديث');
  }
  
  try {
    const castleRef = doc(db, 'castles', castle.id);
    
    const { id, ...castleData } = castle;
    
    await updateDoc(castleRef, {
      ...castleData,
      updatedAt: serverTimestamp()
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
    // حذف القلعة من Firestore
    await deleteDoc(doc(db, 'castles', id));
    
    // الحصول على القلعة للتحقق مما إذا كان لديها فيديو للحذف
    const castle = await getCastleById(id);
    
    // إذا كان هناك فيديو محمل في التخزين، قم بحذفه أيضًا
    if (castle?.videoUrl && castle.videoUrl.includes('firebase')) {
      const videoRef = ref(storage, castle.videoUrl);
      await deleteObject(videoRef);
    }
  } catch (error) {
    console.error('خطأ في حذف القلعة:', error);
    throw error;
  }
};

/**
 * رفع ملف فيديو للقلعة
 */
export const uploadCastleVideo = async (file: File, castleId: string): Promise<string> => {
  try {
    const fileExtension = file.name.split('.').pop();
    const fileName = `castles/${castleId}/video_${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, fileName);
    
    // رفع الملف
    await uploadBytes(storageRef, file);
    
    // الحصول على رابط التنزيل
    const downloadUrl = await getDownloadURL(storageRef);
    
    return downloadUrl;
  } catch (error) {
    console.error('خطأ في رفع فيديو القلعة:', error);
    throw error;
  }
};

/**
 * الحصول على القلاع المميزة/المشهورة
 */
export const getPopularCastles = async (): Promise<Castle[]> => {
  try {
    const popularQuery = query(
      castlesCollection, 
      where('popular', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(popularQuery);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        level: data.level,
        strength: data.strength,
        price: data.price,
        features: data.features,
        icon: data.icon,
        popular: data.popular,
        videoUrl: data.videoUrl,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
      };
    });
  } catch (error) {
    console.error('خطأ في جلب القلاع المميزة:', error);
    throw error;
  }
};
