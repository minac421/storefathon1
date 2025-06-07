"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ReferralContest() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userReferralLink, setUserReferralLink] = useState("");
  const [userReferralCount, setUserReferralCount] = useState(0);
  const locale = "ar"; // تعيين اللغة العربية افتراضيًا
  
  // بيانات نموذج التسجيل
  const [castleIP, setCastleIP] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  // إضافة تايمر للمسابقة
  const [timeRemaining, setTimeRemaining] = useState({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // إضافة حالة لتحديد لون المؤقت
  const [timerStatus, setTimerStatus] = useState('normal'); // normal, warning, danger

  // قائمة الصور الرمزية المتاحة للاختيار
  const avatars = [
    { id: 1, src: "/images/avatars/avatar1.png" },
    { id: 2, src: "/images/avatars/avatar2.png" },
    { id: 3, src: "/images/avatars/avatar3.png" },
    { id: 4, src: "/images/avatars/avatar4.png" },
    { id: 5, src: "/images/avatars/avatar5.png" },
    { id: 6, src: "/images/avatars/avatar6.png" },
  ];

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // إضافة state جديدة للتحكم في العرض
  const [isClient, setIsClient] = useState(false);
  
  // إضافة state جديدة لحالة تحديث الإحالات
  const [isUpdatingReferrals, setIsUpdatingReferrals] = useState(false);
  
  // إضافة معلومات عن آخر تحديث
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  
  // إضافة useEffect للتأكد من أن الكود يعمل فقط على جانب العميل
  useEffect(() => {
    setIsClient(true);
  }, []);

  // إضافة مؤقت تنازلي للمسابقة
  useEffect(() => {
    if (!isClient) return;

    // استخدام تاريخ ثابت لانتهاء المسابقة (17 يونيو 2025 - بعد 10 أيام من 7 يونيو)
    const endDate = new Date('2025-06-17T23:59:59');

    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        // انتهت المسابقة
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      // حساب الوقت المتبقي
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
      
      // تحديث حالة المؤقت بناءً على الوقت المتبقي
      if (days === 0) {
        if (hours < 6) {
          setTimerStatus('danger');
        } else if (hours < 24) {
          setTimerStatus('warning');
        }
      } else if (days === 1) {
        setTimerStatus('warning');
      } else {
        setTimerStatus('normal');
      }
    };
    
    // تحديث المؤقت كل ثانية
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // تحديث أولي
    
    return () => clearInterval(timerInterval);
  }, [isClient]);

  useEffect(() => {
    // التحقق من وجود بيانات تسجيل سابقة في التخزين المحلي
    if (isClient) {
      const savedRegistration = localStorage.getItem('contestRegistration');
      if (savedRegistration) {
        const data = JSON.parse(savedRegistration);
        setIsRegistered(true);
        setCastleIP(data.castleIP);
        setUsername(data.username);
        setSelectedAvatar(data.avatar);
        setUserReferralLink(`https://storefathon1-c3kg.vercel.app/r?ref=${data.castleIP}`);
        // جلب عدد الإحالات من الخادم
        fetchReferralCount(data.castleIP);
      }

      // جلب بيانات المتصدرين من الخادم
      fetchLeaderboard();
      
      // التحقق من وجود رمز إحالة في الرابط
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get('ref');
      
      if (refCode) {
        // تسجيل الإحالة على الخادم
        const processedReferrals = localStorage.getItem('processed-referrals') || '[]';
        const processedArray = JSON.parse(processedReferrals);
        
        if (!processedArray.includes(refCode)) {
          registerReferral(refCode);
          
          // تسجيل أن هذا الرمز قد تمت معالجته
          processedArray.push(refCode);
          localStorage.setItem('processed-referrals', JSON.stringify(processedArray));
        }
      }
    }
  }, [isClient]);

  // دالة لجلب عدد الإحالات محسنة باستخدام useCallback
  const fetchReferralCount = useCallback(async (ip) => {
    try {
      setIsUpdatingReferrals(true);
      const response = await fetch(`/api/contest/referrals/count?ip=${ip}`);
      const data = await response.json();
      
      if (data.success) {
        setUserReferralCount(data.count);
        setLastRefreshTime(new Date());
      }
      setIsUpdatingReferrals(false);
    } catch (error) {
      console.error("خطأ في جلب عدد الإحالات", error);
      setIsUpdatingReferrals(false);
    }
  }, []);

  // إضافة تحديث دوري لعدد الإحالات
  useEffect(() => {
    if (!isClient || !isRegistered || !castleIP) return;
    
    // تحديث أولي لعدد الإحالات
    fetchReferralCount(castleIP);
    
    // تحديث دوري كل 2 دقيقة
    const intervalId = setInterval(() => {
      fetchReferralCount(castleIP);
    }, 2 * 60 * 1000); // 2 دقيقة
    
    return () => clearInterval(intervalId);
  }, [isClient, isRegistered, castleIP, fetchReferralCount]);

  // دالة لتسجيل إحالة
  const registerReferral = async (referrerCode) => {
    try {
      const response = await fetch('/api/contest/refer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          referrerCastleIP: referrerCode
        })
      });
      
      const data = await response.json();
      if (data.success) {
        console.log('تم تسجيل الإحالة بنجاح');
      } else {
        console.error('خطأ في تسجيل الإحالة:', data.message);
      }
    } catch (error) {
      console.error('خطأ في تسجيل الإحالة:', error);
    }
  };

  // دالة لجلب بيانات المتصدرين
  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contest/leaderboard');
      
      // تحقق من نوع الاستجابة
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("الخادم أرجع استجابة غير صالحة عند جلب المتصدرين");
        setIsLoading(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        console.error("خطأ في جلب المتصدرين:", data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("خطأ في جلب بيانات المتصدرين", error);
      setIsLoading(false);
    }
  };

  // إضافة وظيفة تسجيل مباشر باستخدام API
  const handleDirectRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError("");

    // التحقق من صحة المدخلات
    if (!castleIP || !username) {
      setRegistrationError("يرجى إدخال جميع البيانات المطلوبة");
      setIsSubmitting(false);
      return;
    }

    try {
      // إرسال بيانات التسجيل إلى الخادم
      const response = await fetch('/api/contest/register-contest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          castleIP,
          username,
          avatar: selectedAvatar || 1
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ أثناء التسجيل');
      }
      
      // تخزين معلومات التسجيل محليًا
      const registrationData = { 
        castleIP,
        username,
        avatar: selectedAvatar || 1 
      };
      localStorage.setItem('contestRegistration', JSON.stringify(registrationData));
      
      // تحديث حالة المستخدم
      setIsRegistered(true);
      setUserReferralLink(data.referralLink);
      setUserReferralCount(0);
      setIsSubmitting(false);
      
      // تحديث قائمة المتصدرين
      fetchLeaderboard();
    } catch (error) {
      console.error("خطأ في التسجيل", error);
      setRegistrationError(error.message || "حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى");
      setIsSubmitting(false);
    }
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userReferralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error('خطأ في نسخ النص: ', error);
      });
  };

  const handleRefreshReferrals = () => {
    if (isRegistered && castleIP && !isUpdatingReferrals) {
      fetchReferralCount(castleIP);
    }
  };

  // تعريف منصات التواصل الاجتماعي
  const socialPlatforms = [
    { 
      name: 'facebook', 
      text: 'فيسبوك', 
      color: 'bg-[#3b5998]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    { 
      name: 'twitter', 
      text: 'تويتر', 
      color: 'bg-[#1da1f2]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      )
    },
    { 
      name: 'whatsapp', 
      text: 'واتساب', 
      color: 'bg-[#25d366]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    },
    { 
      name: 'telegram', 
      text: 'تيليجرام', 
      color: 'bg-[#0088cc]',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    }
  ];

  // تحسين وظيفة shareOnSocialMedia لإضافة رسائل مخصصة لكل منصة
  const shareOnSocialMedia = (platform) => {
    let shareUrl = "";
    let shareText = "";
    
    // تخصيص الرسالة حسب المنصة
    switch(platform) {
      case 'facebook':
        shareText = "انضم إلى مسابقة Store Fathon واحصل على جوائز قيمة! استخدم رابط الدعوة الخاص بي 👇";
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(userReferralLink)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareText = "انضم إلى مسابقة #StoreFathon واربح جوائز رائعة! استخدم رابط الدعوة الخاص بي 👇";
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(userReferralLink)}`;
        break;
      case 'whatsapp':
        shareText = "مرحباً! أدعوك للانضمام إلى مسابقة Store Fathon للفوز بجوائز قيمة. استخدم رابط الدعوة الخاص بي:";
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + userReferralLink)}`;
        break;
      case 'telegram':
        shareText = "مرحباً! أدعوك للانضمام إلى مسابقة Store Fathon للفوز بجوائز قيمة 🏆 استخدم رابط الدعوة الخاص بي:";
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(userReferralLink)}&text=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
        {/* العنوان والتايمر */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-5 md:p-8 mb-6 md:mb-10 text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center">مسابقة الدعوة والإحالة</h1>
          
          {/* تايمر العد التنازلي محسن */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 inline-flex">
              <div className="flex flex-row-reverse gap-2 md:gap-4">
                <div className="text-center w-16 md:w-20">
                  <div className={`${
                    timerStatus === 'danger' ? 'bg-red-500/30' : 
                    timerStatus === 'warning' ? 'bg-amber-500/30' : 
                    'bg-white/20'
                  } rounded-lg p-2 transition-colors duration-500`}>
                    <div className="text-2xl md:text-4xl font-bold">{timeRemaining.days}</div>
                  </div>
                  <div className="text-xs md:text-sm mt-1">أيام</div>
                </div>
                <div className="text-center w-16 md:w-20">
                  <div className={`${
                    timerStatus === 'danger' ? 'bg-red-500/30' : 
                    timerStatus === 'warning' ? 'bg-amber-500/30' : 
                    'bg-white/20'
                  } rounded-lg p-2 transition-colors duration-500`}>
                    <div className="text-2xl md:text-4xl font-bold">{timeRemaining.hours}</div>
                  </div>
                  <div className="text-xs md:text-sm mt-1">ساعات</div>
                </div>
                <div className="text-center w-16 md:w-20">
                  <div className={`${
                    timerStatus === 'danger' ? 'bg-red-500/30' : 
                    timerStatus === 'warning' ? 'bg-amber-500/30' : 
                    'bg-white/20'
                  } rounded-lg p-2 transition-colors duration-500`}>
                    <div className="text-2xl md:text-4xl font-bold">{timeRemaining.minutes}</div>
                  </div>
                  <div className="text-xs md:text-sm mt-1">دقائق</div>
                </div>
                <div className="text-center w-16 md:w-20">
                  <div className={`${
                    timerStatus === 'danger' ? 'bg-red-500/30' : 
                    timerStatus === 'warning' ? 'bg-amber-500/30' : 
                    'bg-white/20'
                  } rounded-lg p-2 transition-colors duration-500 relative overflow-hidden`}>
                    <div className="text-2xl md:text-4xl font-bold">{timeRemaining.seconds}</div>
                    <div className={`absolute bottom-0 left-0 h-1 ${
                      timerStatus === 'danger' ? 'bg-red-400' : 
                      timerStatus === 'warning' ? 'bg-amber-400' : 
                      'bg-white/40'
                    }`} style={{ width: `${(timeRemaining.seconds / 60) * 100}%` }}></div>
                  </div>
                  <div className="text-xs md:text-sm mt-1">ثواني</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* إضافة إشعار للوقت المتبقي عندما يكون قليلاً */}
          {timerStatus !== 'normal' && (
            <div className={`${
              timerStatus === 'danger' ? 'bg-red-500' : 'bg-amber-500'
            } text-white text-sm md:text-base py-2 px-4 rounded-full mx-auto mb-4 inline-block animate-pulse shadow-lg`}>
              {timerStatus === 'danger' 
                ? 'تحذير: المسابقة ستنتهي خلال ساعات قليلة!' 
                : 'انتبه: المسابقة ستنتهي قريبًا!'}
            </div>
          )}
          
          <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6 leading-relaxed">
            انضم إلى مسابقتنا المميزة لزيادة متابعي الموقع! ببساطة، كل ما عليك فعله هو دعوة أصدقائك للانضمام إلى موقعنا باستخدام رابط الإحالة الخاص بك. كلما زاد عدد الأشخاص الذين ينضمون عبر رابطك، زادت فرصتك في الفوز بإحدى الجوائز القيمة!
          </p>
          <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-5 justify-center">
            <div className="bg-white/10 rounded-lg p-3 md:p-4 flex items-center max-w-xs w-full backdrop-blur-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-blue-600 rounded-full flex items-center justify-center text-lg md:text-xl font-bold ml-3 md:mr-4 shrink-0">1</div>
              <div>
                <p className="font-semibold text-white text-sm md:text-base">أدخل آي بي قلعتك واسمك</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 md:p-4 flex items-center max-w-xs w-full backdrop-blur-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-blue-600 rounded-full flex items-center justify-center text-lg md:text-xl font-bold ml-3 md:mr-4 shrink-0">2</div>
              <div>
                <p className="font-semibold text-white text-sm md:text-base">شارك الرابط مع أصدقائك</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 md:p-4 flex items-center max-w-xs w-full backdrop-blur-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-blue-600 rounded-full flex items-center justify-center text-lg md:text-xl font-bold ml-3 md:mr-4 shrink-0">3</div>
              <div>
                <p className="font-semibold text-white text-sm md:text-base">اربح جوائز قيمة</p>
              </div>
            </div>
          </div>
        </div>

        {/* الجوائز - تحديث الجوائز حسب الطلب */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-6 md:mb-10">
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 text-white p-4 md:p-5">
            <h2 className="text-lg md:text-2xl font-bold">الجوائز</h2>
            <p className="text-xs md:text-sm opacity-90">فرصتك للفوز بجوائز قيمة حصرية</p>
          </div>
          <div className="p-4 md:p-6 bg-gradient-to-b from-amber-50 to-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 p-4 md:p-6 rounded-lg border-2 border-yellow-300 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-yellow-400 opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-700 origin-bottom-left rounded-full"></div>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-xl md:text-3xl font-bold mb-3 md:mb-4 shadow-lg transform transition-transform duration-500 group-hover:rotate-12">1</div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-yellow-800">المركز الأول</h3>
                <ul className="space-y-2 mb-4 text-left rtl:text-right">
                  <li className="flex items-center text-yellow-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    بوت لمدة 4 شهور
                  </li>
                  <li className="flex items-center text-yellow-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    حزمة 10$ (كريديت)
                  </li>
                  <li className="flex items-center text-yellow-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    5 مليار قمح
                  </li>
                </ul>
                <div className="inline-block bg-yellow-500 text-white text-sm px-4 py-2 rounded-full font-bold animate-pulse">الجائزة الكبرى</div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-300 opacity-50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-yellow-300 opacity-50 rounded-full blur-xl animate-pulse delay-700"></div>
              </div>
              
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 rounded-lg border-2 border-gray-300 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-gray-400 opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-700 origin-bottom-left rounded-full"></div>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full text-xl md:text-3xl font-bold mb-3 md:mb-4 shadow-lg transform transition-transform duration-500 group-hover:rotate-12">2</div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">المركز الثاني</h3>
                <ul className="space-y-2 mb-4 text-left rtl:text-right">
                  <li className="flex items-center text-gray-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    بوت لمدة 4 شهور
                  </li>
                  <li className="flex items-center text-gray-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    5 مليار قمح
                  </li>
                </ul>
                <div className="inline-block bg-gray-500 text-white text-sm px-4 py-2 rounded-full font-bold">جائزة مميزة</div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gray-300 opacity-50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gray-300 opacity-50 rounded-full blur-xl animate-pulse delay-700"></div>
              </div>
              
              <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-4 md:p-6 rounded-lg border-2 border-amber-300 text-center shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-amber-500 opacity-10 transform scale-0 group-hover:scale-100 transition-transform duration-700 origin-bottom-left rounded-full"></div>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-full text-xl md:text-3xl font-bold mb-3 md:mb-4 shadow-lg transform transition-transform duration-500 group-hover:rotate-12">3</div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-amber-800">المركز الثالث</h3>
                <ul className="space-y-2 mb-4 text-left rtl:text-right">
                  <li className="flex items-center text-amber-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    بوت لمدة شهرين
                  </li>
                  <li className="flex items-center text-amber-700 font-semibold">
                    <svg className="w-5 h-5 ml-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    5 مليار قمح
                  </li>
                </ul>
                <div className="inline-block bg-amber-600 text-white text-sm px-4 py-2 rounded-full font-bold">جائزة رائعة</div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-amber-300 opacity-50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-amber-300 opacity-50 rounded-full blur-xl animate-pulse delay-700"></div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm md:text-base text-gray-700 font-semibold">لا تفوت فرصتك! قم بدعوة أصدقائك الآن للمشاركة في المسابقة والفوز بجوائز حصرية</p>
              <div className="mt-3 inline-block text-sm text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 rounded-full shadow-md animate-pulse">المسابقة متاحة لمدة 10 أيام فقط</div>
            </div>
          </div>
        </div>

        {/* نموذج التسجيل أو رابط الدعوة */}
        {!isRegistered ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-right">التسجيل في المسابقة</h2>
            
            {registrationError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-right">
                {registrationError}
              </div>
            )}
            
            <form onSubmit={handleDirectRegistration} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-right">اسم اللاعب</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسمك في اللعبة"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-amber-500 focus:outline-none text-right"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-right">آي بي القلعة (IP)</label>
                <input
                  type="text"
                  value={castleIP}
                  onChange={(e) => setCastleIP(e.target.value)}
                  placeholder="أدخل آي بي القلعة الخاص بك"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-amber-500 focus:outline-none text-right"
                  required
                />
                <p className="text-sm text-gray-500 mt-1 text-right">مثال: 123.456.789</p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-md text-white font-bold ${
                  isSubmitting ? "bg-gray-400" : "bg-amber-500 hover:bg-amber-600"
                } transition duration-300`}
              >
                {isSubmitting ? "جاري التسجيل..." : "سجل الآن"}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-5 md:p-6 mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-800 text-right">رابط الإحالة الخاص بك</h2>
            
            <div className="bg-gray-100 rounded-md p-3 md:p-4 flex items-center mb-4">
              <input
                type="text"
                value={userReferralLink}
                readOnly
                className="flex-grow bg-transparent border-none focus:outline-none text-right truncate" 
              />
              <button
                onClick={copyToClipboard}
                className="ml-3 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
              >
                {copied ? 'تم النسخ!' : 'نسخ الرابط'}
              </button>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 text-right">
              <p className="text-blue-700">
                <span className="font-bold">تلميح:</span> شارك هذا الرابط مع أصدقائك للحصول على نقاط إحالة.
              </p>
              <p className="text-blue-700 mt-1">
                عندما يقوم صديقك بالنقر على رابط الإحالة الخاص بك، سيتم توجيهه مباشرة إلى الصفحة الرئيسية وتسجيل الإحالة.
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-md p-4 mb-4 text-right relative">
              <div className="flex justify-between items-center">
                <button 
                  onClick={handleRefreshReferrals} 
                  disabled={isUpdatingReferrals}
                  className={`p-2 rounded-full ${isUpdatingReferrals ? 'bg-gray-300 text-gray-500' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors`}
                  title="تحديث عدد الإحالات"
                >
                  <svg 
                    className={`w-5 h-5 ${isUpdatingReferrals ? 'animate-spin' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <div>
                  <div className="mb-2 font-semibold text-gray-700">عدد الإحالات الحالي:</div>
                  <div className="text-3xl font-bold text-blue-600">{userReferralCount}</div>
                </div>
              </div>
              
              {/* عرض وقت آخر تحديث */}
              {lastRefreshTime && (
                <div className="text-xs text-gray-500 mt-2">
                  آخر تحديث: {lastRefreshTime.toLocaleTimeString()}
                </div>
              )}
              
              {/* تقدم مرئي نحو المركز الأول */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-600 font-medium">0</span>
                  <span className="text-blue-600 font-medium">10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(userReferralCount * 10, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">
                  {userReferralCount >= 10 ? 
                    'لقد وصلت إلى الحد المطلوب للتأهل للجوائز! واصل جمع المزيد من الإحالات لضمان مكانك في المقدمة!' : 
                    `تحتاج إلى ${10 - userReferralCount} إحالات إضافية للوصول إلى الحد الأدنى للتأهل`
                  }
                </div>
              </div>
            </div>
            
            {/* تحسين أزرار المشاركة الاجتماعية */}
            <div className="mb-2 font-semibold text-gray-700 text-right">شارك رابطك الآن:</div>
            <div className="flex flex-wrap justify-center gap-2">
              {socialPlatforms.map(platform => (
                <button
                  key={platform.name}
                  onClick={() => shareOnSocialMedia(platform.name)}
                  className={`px-4 py-2 rounded-full text-white flex items-center ${platform.color} hover:opacity-90 transition-all transform hover:scale-105 hover:shadow-md`}
                >
                  {platform.icon}
                  <span className="ml-2">{platform.text}</span>
                </button>
              ))}
            </div>
            
            {/* إضافة نصائح لزيادة الإحالات */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg text-right">
              <h3 className="font-bold text-amber-800 mb-2">نصائح لزيادة إحالاتك:</h3>
              <ul className="text-amber-700 text-sm space-y-2 list-disc list-inside">
                <li>شارك رابطك في مجموعات اللعبة على واتساب وتيليجرام</li>
                <li>اطلب من أصدقائك مشاركة الرابط مع أصدقائهم أيضاً</li>
                <li>استخدم المنتديات ومجموعات اللعبين لنشر رابطك</li>
                <li>تأكد من شرح المسابقة والجوائز عند مشاركة الرابط</li>
              </ul>
            </div>
          </div>
        )}
        
        {/* جدول المتصدرين */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 md:mb-10">
          <div className="bg-blue-600 text-white p-4 md:p-5">
            <h2 className="text-lg md:text-xl font-bold">المتصدرون</h2>
            <p className="text-xs md:text-sm opacity-90">المستخدمون الأكثر دعوة للأصدقاء</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">المركز</th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">اللاعب</th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">آي بي القلعة</th>
                  <th className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">عدد الإحالات</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                      </div>
                      <p className="mt-2 text-gray-600">جاري تحميل البيانات...</p>
                    </td>
                  </tr>
                ) : leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-600">
                      لا يوجد مشاركين في المسابقة بعد. كن أول المشاركين!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((player, index) => (
                    <tr key={player.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right">
                        <span className={`inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 ${
                          index === 0 ? "bg-yellow-400" : 
                          index === 1 ? "bg-gray-400" : 
                          index === 2 ? "bg-amber-700" : 
                          "bg-gray-200 text-gray-700"
                        } text-white rounded-full font-bold text-xs md:text-sm`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full overflow-hidden">
                            <Image 
                              src={avatars.find(a => a.id === player.avatar)?.src || "/images/avatars/avatar1.png"} 
                              alt="صورة المستخدم" 
                              width={32} 
                              height={32} 
                            />
                          </div>
                          <span>{player.username}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right text-sm md:text-base">{player.castleIP}</td>
                      <td className="py-2 px-3 md:py-3 md:px-4 text-right font-bold text-sm md:text-base">{player.referralCount}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer locale={locale} simplified={true} />

      {/* إضافة إشعار بنجاح نسخ الرابط */}
      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          تم نسخ الرابط بنجاح!
        </div>
      )}
    </>
  );
} 