"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [castleIP, setCastleIP] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referrerCode, setReferrerCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferrerCode(ref);
      setCastleIP(ref);
      console.log('تم استلام رمز الإحالة:', ref);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    if (!fullname || !email || !password || !castleIP) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          castle_ip: castleIP,
          referrerCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ أثناء التسجيل');
      }

      setSuccess(`تم التسجيل بنجاح! ${data.referralProcessed ? ' وتم تسجيل الإحالة.' : ''}`);
      
      setFullname('');
      setEmail('');
      setPassword('');
      setCastleIP('');
      
      setTimeout(() => {
        router.push('/competitions');
      }, 2000);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء التسجيل');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestReferral = async () => {
    if (!referrerCode) {
      setError('لا يوجد رمز إحالة للاختبار');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      const referResponse = await fetch('/api/contest/refer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referrerCastleIP: referrerCode
        }),
      });
      
      const referData = await referResponse.json();
      
      if (!referResponse.ok) {
        throw new Error(referData.message || 'حدث خطأ أثناء اختبار الإحالة');
      }
      
      if (referData.success) {
        setSuccess(`تم تسجيل الإحالة بنجاح! عدد الإحالات الحالي: ${referData.referralCount}`);
      } else {
        setError('فشل تسجيل الإحالة: ' + referData.message);
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء اختبار الإحالة');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-right">
            {success}
          </div>
        )}
        
        {referrerCode && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 text-right">
            تم دعوتك بواسطة لاعب آخر (كود: {referrerCode}). شكراً لانضمامك!
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2 text-right">الاسم الكامل</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-right"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-right"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-right">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-right"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2 text-right">آي بي القلعة (IP)</label>
            <input
              type="text"
              value={castleIP}
              onChange={(e) => setCastleIP(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none text-right"
              required
            />
            <p className="text-sm text-gray-500 mt-1 text-right">مثال: 123.456.789</p>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md text-white font-bold ${
              isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } transition duration-300`}
          >
            {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
          </button>
          
          {referrerCode && (
            <button
              type="button"
              onClick={handleTestReferral}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md text-white font-bold mt-4 ${
                isSubmitting ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"
              } transition duration-300`}
            >
              اختبار الإحالة مباشرة
            </button>
          )}
          
          <div className="text-center mt-4">
            <Link href="/competitions" className="text-blue-600 hover:underline">
              الذهاب إلى صفحة المسابقات مباشرة
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 