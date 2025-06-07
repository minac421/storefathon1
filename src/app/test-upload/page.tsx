"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      addLog(`تم اختيار ملف: ${selectedFile.name} (${selectedFile.size} بايت)`);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        addLog('تم إنشاء معاينة للصورة');
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
      addLog('تم إلغاء اختيار الملف');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('الرجاء اختيار ملف أولاً');
      addLog('خطأ: لم يتم اختيار ملف');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      addLog('بدء عملية رفع الصورة...');

      const formData = new FormData();
      formData.append('file', file);
      addLog('تم إنشاء FormData وإضافة الملف');

      const response = await fetch('/api/test-upload', {
        method: 'POST',
        body: formData,
      });
      addLog(`استجابة الخادم: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'حدث خطأ أثناء رفع الصورة');
      }

      const data = await response.json();
      addLog(`تم رفع الصورة بنجاح. المسار: ${data.url}`);
      
      setUploadedImage(data.url);
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      setError(`حدث خطأ: ${(error as Error).message}`);
      addLog(`خطأ: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const testImage = (url: string) => {
    addLog(`اختبار تحميل الصورة من المسار: ${url}`);
    return new Promise<boolean>((resolve) => {
      const img = document.createElement('img');
      img.onload = () => {
        addLog('تم تحميل الصورة بنجاح');
        resolve(true);
      };
      img.onerror = () => {
        addLog('فشل في تحميل الصورة');
        resolve(false);
      };
      img.src = url;
    });
  };

  const handleTestImage = async () => {
    if (!uploadedImage) {
      setError('لا توجد صورة مرفوعة للاختبار');
      return;
    }

    addLog(`بدء اختبار الصورة المرفوعة: ${uploadedImage}`);
    const isLoaded = await testImage(uploadedImage);
    
    if (isLoaded) {
      addLog('✅ الصورة متاحة ويمكن عرضها');
    } else {
      addLog('❌ الصورة غير متاحة أو لا يمكن عرضها');
      setError('فشل في تحميل الصورة المرفوعة. تحقق من المسار والصلاحيات');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">اختبار رفع الصور</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">اختيار ورفع صورة</h2>
        
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-amber-50 file:text-amber-700
              hover:file:bg-amber-100"
          />
        </div>
        
        {preview && (
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">معاينة الصورة:</h3>
            <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
              <img src={preview} alt="معاينة" className="w-full h-full object-contain" />
            </div>
          </div>
        )}
        
        <div className="flex space-x-4 rtl:space-x-reverse">
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`px-4 py-2 rounded-md ${
              !file || uploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {uploading ? 'جاري الرفع...' : 'رفع الصورة'}
          </button>
          
          {uploadedImage && (
            <button
              onClick={handleTestImage}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              اختبار الصورة
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      {uploadedImage && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">الصورة المرفوعة</h2>
          <p className="mb-2 text-gray-600 break-all">المسار: {uploadedImage}</p>
          
          <div className="w-full h-60 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={uploadedImage}
              alt="الصورة المرفوعة"
              className="w-full h-full object-contain"
              onError={() => setError('فشل في تحميل الصورة المرفوعة')}
            />
          </div>
        </div>
      )}
      
      <div className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-auto h-60">
        <h2 className="text-lg font-semibold mb-2">سجل العمليات:</h2>
        <div className="font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index} className="mb-1">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 