"use client";

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/admin';

export default function AdminHelp() {
  return (
    <div className="flex h-screen bg-gray-100 rtl">
      {/* القائمة الجانبية */}
      <Sidebar activePath="/admin/help" />
      
      {/* المحتوى الرئيسي */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">مساعدة المسؤول</h1>
            
            <div className="flex items-center">
              <Link href="/admin" className="ml-4 text-gray-500 hover:text-amber-600">
                العودة للوحة الرئيسية
              </Link>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">دليل استكشاف الأخطاء وإصلاحها</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">مشكلة في رفع الصور</h3>
                <p className="mb-4 text-gray-700">
                  إذا كنت تواجه مشكلة في رفع الصور أو عدم ظهورها بعد الرفع، يمكنك اتباع الخطوات التالية:
                </p>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                  <p className="text-amber-700">
                    <strong>ملاحظة مهمة:</strong> للتأكد من أن النظام يعمل بشكل صحيح، تأكد من وجود المجلدات التالية:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-amber-800">
                    <li>public/uploads</li>
                    <li>public/test-uploads</li>
                  </ul>
                </div>
                
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>
                    <strong>اختبر نظام رفع الصور:</strong>{' '}
                    <Link href="/test-upload" className="text-blue-600 hover:underline" target="_blank">
                      انتقل إلى صفحة اختبار رفع الصور
                    </Link> لمعرفة ما إذا كان رفع الصور يعمل بشكل صحيح.
                  </li>
                  <li>
                    <strong>تحقق من مجلد الرفع:</strong> تأكد من وجود مجلد <code className="bg-gray-100 px-2 py-1 rounded">public/uploads</code> وأن لديك صلاحيات للكتابة عليه.
                  </li>
                  <li>
                    <strong>تحقق من سجلات الخادم:</strong> راجع سجلات وحدة التحكم في المتصفح (F12) لمعرفة ما إذا كانت هناك أي أخطاء.
                  </li>
                  <li>
                    <strong>أعد تشغيل الخادم:</strong> في بعض الأحيان، يمكن أن يساعد إعادة تشغيل خادم التطوير في حل المشكلات.
                  </li>
                </ol>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-2">التحقق من الصور المرفوعة</h3>
                <p className="mb-4 text-gray-700">
                  يمكنك استخدام مستكشف الملفات للتحقق من أن الصور تم رفعها بنجاح إلى المجلد الصحيح.
                </p>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-mono text-sm">
                    مسار مجلد الرفع: {process.cwd()}/public/uploads
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-2">حلول لمشاكل شائعة</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">مشكلة: الصور لا تظهر بعد الرفع</h4>
                    <p className="text-gray-700">
                      الحل: تأكد من أن مسار الصورة المخزن في قاعدة البيانات صحيح وأن الصورة موجودة فعليًا في المجلد المحدد.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">مشكلة: خطأ في رفع الصورة</h4>
                    <p className="text-gray-700">
                      الحل: تحقق من حجم الصورة ونوعها. يجب أن يكون حجم الصورة أقل من 2 ميجابايت وتكون بأحد الصيغ المدعومة (JPG، PNG، WEBP).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">مشكلة: خطأ في صلاحيات المجلد</h4>
                    <p className="text-gray-700">
                      الحل: تأكد من أن مجلد الرفع لديه صلاحيات الكتابة المناسبة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 