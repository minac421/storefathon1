import mongoose from 'mongoose';

/**
 * وظائف مساعدة لتجاوز مشاكل TypeScript مع Mongoose
 */

export async function findDocById(model: any, id: string) {
  // استخدام mongoose.model لتجنب أخطاء TypeScript مع findById
  return await model.findById(id).lean().exec();
}

export async function findOnDoc(model: any, query: any) {
  // استخدام lean() وexec() لتجنب أخطاء TypeScript
  return await model.findOne(query).lean().exec();
}

export async function findDocs(model: any, query: any = {}, options: any = {}) {
  // المعاملات الافتراضية
  const { sort = { createdAt: -1 }, limit = 100, skip = 0 } = options;
  
  // استخدام Model.find ثم lean() ثم exec() 
  return await model.find(query).sort(sort).skip(skip).limit(limit).lean().exec();
}

export async function updateDoc(model: any, query: any, update: any, options: any = {}) {
  return await model.updateOne(query, update, options).exec();
}

export async function deleteDoc(model: any, query: any) {
  return await model.deleteOne(query).exec();
}

export async function countDocs(model: any, query: any = {}) {
  return await model.countDocuments(query).exec();
}

/**
 * دالة مساعدة لتحويل معرفات MongoDB (_id) إلى id للاستخدام في واجهة المستخدم
 * @param docs مستندات قاعدة البيانات ليتم تحويلها
 * @returns المستندات مع إضافة حقل id
 */
export function addClientIds<T extends Record<string, any>>(docs: T | T[]): T | T[] {
  if (!docs) return docs;
  
  // إذا كان المستند مصفوفة
  if (Array.isArray(docs)) {
    return docs.map(doc => addClientIds(doc)) as T[];
  }
  
  // إذا كان المستند كائنًا واحدًا
  const docCopy = { ...docs } as Record<string, any>;
  
  // إضافة حقل id إذا كان المستند يحتوي على _id
  if (docCopy._id) {
    // تحويل _id إلى سلسلة نصية إذا كان كائنًا
    const idStr = typeof docCopy._id === 'object' && docCopy._id.toString 
      ? docCopy._id.toString() 
      : docCopy._id;
    
    // إضافة حقل id فقط إذا لم يكن موجودًا بالفعل
    if (!docCopy.id) {
      docCopy.id = idStr;
    }
  }
  
  return docCopy as T;
}
