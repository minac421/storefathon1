"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Referral() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('جاري معالجة الإحالة...');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleReferral = async () => {
      try {
        const referrerCode = searchParams.get('ref');
        
        if (!referrerCode) {
          setError('رمز الإحالة غير موجود');
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }

        // استدعاء API لتسجيل الإحالة
        const response = await fetch('/api/contest/refer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            referrerCastleIP: referrerCode
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('تم تسجيل الإحالة بنجاح! جاري التوجيه للصفحة الرئيسية...');
          // تخزين حالة الإحالة في التخزين المحلي
          localStorage.setItem(`referred-by-${referrerCode}`, 'true');
        } else {
          // في حالة وجود خطأ، نقوم بتخزينه ولكن نستمر في توجيه المستخدم للصفحة الرئيسية
          setError(data.message || 'حدث خطأ أثناء تسجيل الإحالة');
        }

        // توجيه المستخدم للصفحة الرئيسية بعد ثانيتين
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err) {
        setError('حدث خطأ غير متوقع أثناء معالجة الإحالة');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    };

    handleReferral();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">نظام الإحالات</h1>
          
          {!error ? (
            <div className="text-green-600 mt-2">
              <div className="animate-pulse mb-2">
                <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p>{status}</p>
            </div>
          ) : (
            <div className="text-red-600 mt-2">
              <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
              <p className="mt-2">جاري التوجيه للصفحة الرئيسية...</p>
            </div>
          )}
          
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-full animate-[progress_2s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// تعريف الانيميشن في الـ CSS
export const metadata = {
  title: 'معالجة الإحالة',
}; 