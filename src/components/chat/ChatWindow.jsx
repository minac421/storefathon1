"use client";

import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { getUserSettings } from '@/utils/userSettings';
import { AVAILABLE_AVATARS } from '@/utils/userSettings';

export default function ChatWindow({ locale }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState({ nickname: '', avatarId: 0 });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  
  const messagesEndRef = useRef(null);
  const isRTL = locale === 'ar';
  
  // إضافة حالة لتتبع حالة الاتصال ورسائل الخطأ
  const [connectionState, setConnectionState] = useState({
    status: 'connecting', // 'connecting', 'connected', 'fallback', 'error'
    errorCount: 0,
    lastError: null,
    retryCount: 0
  });

  // إعداد اتصال Socket.IO
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let pollInterval;
      
      // تحديث حالة الاتصال
      setConnectionState(prev => ({
        ...prev,
        status: 'connecting'
      }));
      
      // استخدام طريقة استطلاع بدلاً من Socket.IO لتجنب الأخطاء
      async function setupChatConnection() {
        try {
          // جلب الرسائل الأولية
          await fetchMessages();
          
          // بدء استطلاع للرسائل الجديدة
          startPolling();
          
          // تعيين حالة الاتصال
          setConnectionState(prev => ({
            ...prev,
            status: 'connected',
            errorCount: 0,
            lastError: null
          }));
          
          // إنشاء كائن وهمي لواجهة Socket.IO
          const mockSocket = {
            emit: (event, data) => {
              console.log(`[Mock Socket] Emitting ${event}:`, data);
              
              // إرسال الرسائل عبر API
              if (event === 'send-message' && data) {
                sendMessage(data);
              }
              
              // إرسال حالة الكتابة (لا حاجة للإرسال، فقط تحديث الحالة محلياً)
              if (event === 'user-typing' && data) {
                // لا شيء حالياً، يمكن تنفيذه مستقبلاً
              }
            },
            connected: true,
            disconnected: false
          };
          
          setSocket(mockSocket);
        } catch (error) {
          console.error('Chat connection error:', error);
          setConnectionState(prev => ({
            ...prev,
            status: 'error',
            errorCount: prev.errorCount + 1,
            lastError: error.message
          }));
        }
      }
      
      // جلب الرسائل
      async function fetchMessages() {
        try {
          setIsLoading(true);
          
          const response = await fetch('/api/chat/messages');
          
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.success) {
            // تحميل الرسائل مع الاحتفاظ بترتيبها الزمني
            setMessages(data.messages || []);
            
            // طباعة عدد الرسائل المستلمة
            console.log(`تم تحميل ${data.messages?.length || 0} رسالة من قاعدة البيانات`);
            
            // تحديث قائمة المستخدمين المتصلين
            if (data.users) {
              setOnlineUsers(data.users);
            }
            setIsLoading(false);
          } else {
            throw new Error(data.error || 'فشل في جلب الرسائل');
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('فشل في تحميل رسائل الدردشة');
          setMessages([]);
        } finally {
          setIsLoading(false);
        }
      }
      
      // إرسال رسالة
      async function sendMessage(messageData) {
        try {
          const response = await fetch('/api/chat/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          
          const data = await response.json();
          
          if (!data.success) {
            throw new Error(data.error || 'فشل في إرسال الرسالة');
          }
          
          // إضافة الرسالة الجديدة إلى القائمة المحلية
          if (data.message) {
            setMessages(prev => {
              // البحث عن رسالة محلية للاستبدال
              const localIndex = prev.findIndex(msg => 
                msg.id.startsWith('local-') && 
                msg.message === data.message.message && 
                msg.sender === data.message.sender
              );
              
              if (localIndex !== -1) {
                // استبدال الرسالة المحلية
                const updatedMessages = [...prev];
                updatedMessages[localIndex] = data.message;
                return updatedMessages;
              }
              
              // إضافة الرسالة الجديدة
              return [...prev, data.message];
            });
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
      
      // بدء استطلاع للرسائل الجديدة
      function startPolling() {
        if (pollInterval) {
          clearInterval(pollInterval);
        }
        
        // استطلاع كل 5 ثوانٍ
        pollInterval = setInterval(async () => {
          try {
            const response = await fetch('/api/chat/messages');
            
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
              // تحديث الرسائل إذا كانت هناك رسائل جديدة
              const newMessages = data.messages || [];
              
              setMessages(prevMessages => {
                // تجميع معرفات الرسائل الحالية في مجموعة للبحث السريع
                const existingIds = new Set(prevMessages.map(msg => msg.id));
                
                // فلترة الرسائل الجديدة فقط (التي ليس لها معرف موجود بالفعل)
                const newUniqueMessages = newMessages.filter(msg => !existingIds.has(msg.id));
                
                // إذا لم تكن هناك رسائل جديدة، لا تقم بتحديث الحالة
                if (newUniqueMessages.length === 0) {
                  return prevMessages;
                }
                
                // استبدال الرسائل المحلية بنظائرها من الخادم
                const updatedMessages = prevMessages.filter(msg => !msg.id.startsWith('local-'));
                
                // دمج الرسائل الموجودة مع الرسائل الجديدة وترتيبها حسب الوقت
                const mergedMessages = [...updatedMessages, ...newUniqueMessages]
                  .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                
                return mergedMessages;
              });
              
              // تحديث قائمة المستخدمين المتصلين
              if (data.users) {
                setOnlineUsers(data.users);
              }
            }
          } catch (error) {
            console.error('Error during polling:', error);
            // لا نقوم بتعيين حالة خطأ لتجنب تعطيل واجهة المستخدم
          }
        }, 5000);
      }
      
      // بدء الاتصال
      setupChatConnection();
      
      // تنظيف عند إلغاء تحميل المكون
      return () => {
        if (pollInterval) {
          clearInterval(pollInterval);
        }
      };
    }
  }, [userProfile]);

  // تحميل إعدادات المستخدم عند بدء المكون
  useEffect(() => {
    // استدعاء API لجلب إعدادات المستخدم
    const fetchUserSettings = async () => {
      try {
        // أولا، نحاول الحصول على الإعدادات من localStorage
        const localSettings = getUserSettings();
        if (localSettings) {
          // إنشاء معرف فريد للمستخدم إذا لم يكن موجوداً
          const userId = localSettings.userId || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const updatedSettings = {
            ...localSettings,
            userId
          };
          setUserProfile(updatedSettings);
          
          // تسجيل المستخدم في نظام الشات
          try {
            const response = await fetch('/api/chat/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedSettings),
            });
            
            if (!response.ok) {
              throw new Error('فشل في تسجيل المستخدم في الشات');
            }
          } catch (error) {
            console.error('Error registering user in chat:', error);
          }
        }
        
        // ثم نحاول الحصول على الإعدادات من API
        const response = await fetch('/api/user/settings');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.settings) {
            const userId = data.settings.userId || `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const updatedSettings = {
              ...data.settings,
              userId
            };
            setUserProfile(updatedSettings);
          }
        }
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };
    
    fetchUserSettings();
  }, []);
  
  // التمرير التلقائي لأسفل عند إضافة رسائل جديدة
  useEffect(() => {
    // التمرير فقط داخل منطقة الرسائل
    const scrollToBottom = () => {
      const messagesContainer = messagesEndRef.current?.parentElement;
      if (messagesContainer && messagesEndRef.current) {
        try {
          // استخدام سلوك smooth للتمرير على الأجهزة التي تدعمه
          messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
          });
        } catch (error) {
          // التمرير العادي كخيار احتياطي
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    };
    
    // تأخير قصير للتأكد من استقرار الواجهة قبل التمرير
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]);
  
  // معالجة التغيير في حجم النافذة لضمان تجربة مستخدم ثابتة
  useEffect(() => {
    const handleResize = () => {
      // إعادة ضبط التمرير عند تغيير حجم النافذة
      const messagesContainer = messagesEndRef.current?.parentElement;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    };
    
    // إضافة مستمع لحدث تغيير الحجم
    window.addEventListener('resize', handleResize);
    
    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // الحصول على صورة المستخدم من معرف الأفاتار
  const getAvatarSrc = (avatarId) => {
    try {
      // ضمان أن avatarId عدد
      const numericId = parseInt(avatarId) || 1;
      
      // طباعة رسالة تصحيح للتأكد من معرف الأفاتار
      console.log('Getting avatar for ID:', numericId);
      
      // البحث عن الأفاتار بالمعرف الصحيح
      const avatar = AVAILABLE_AVATARS.find(a => a.id === numericId);
      
      if (avatar) {
        console.log('Found avatar:', avatar.src);
        return avatar.src;
      }
      
      // إذا لم يتم العثور على الصورة، استخدم الصورة الافتراضية
      console.warn('Avatar not found for ID:', numericId);
      
      // استخدام الأفاتار الافتراضي الأول إذا كان متاحًا
      if (AVAILABLE_AVATARS && AVAILABLE_AVATARS.length > 0) {
        return AVAILABLE_AVATARS[0].src;
      }
      
      return '/images/avatars/hero_icon_8_wake.png'; // صورة افتراضية
    } catch (error) {
      console.error('Error getting avatar src:', error);
      return '/images/avatars/hero_icon_8_wake.png'; // صورة افتراضية في حالة الخطأ
    }
  };
  
  // الحصول على معلومات المستخدم من الرسالة
  const getUserInfoFromMessage = (msg) => {
    // التحقق من وجود معرف الأفاتار في الرسالة نفسها أولاً
    if (msg.senderAvatarId) {
      return {
        avatarId: msg.senderAvatarId,
        isOnline: true
      };
    }

    // البحث عن المستخدم في قائمة المستخدمين النشطين
    const activeUser = onlineUsers.find(user => 
      user.userId === msg.userId || user.nickname === msg.sender
    );
    
    // استخدام بيانات المستخدم النشط إذا وجد
    if (activeUser && activeUser.avatarId) {
      return {
        avatarId: activeUser.avatarId,
        isOnline: true
      };
    }
    
    // استخدام القيمة الافتراضية إذا لم يتم العثور على أي معرف أفاتار
    return {
      avatarId: 1,
      isOnline: false
    };
  };
  
  // إرسال حالة الكتابة للمستخدمين الآخرين
  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    if (socket && userProfile.nickname) {
      socket.emit('user-typing', {
        room: 'global',
        username: userProfile.nickname,
        isTyping: e.target.value.trim() !== ''
      });
    }
  };
  
  // إرسال رسالة جديدة
  const handleSend = async (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      // التحقق من وجود ملف شخصي للمستخدم
      if (!userProfile.nickname || !userProfile.userId) {
        // توجيه المستخدم لإنشاء ملف شخصي
        alert('يجب إنشاء ملف شخصي قبل إرسال رسائل. سيتم توجيهك إلى صفحة الملف الشخصي.');
        window.location.href = '/blog/profile';
        return;
      }
      
      setIsTyping(false);
      
      if (socket) {
        socket.emit('user-typing', {
          room: 'global',
          username: userProfile.nickname,
          userId: userProfile.userId,
          isTyping: false
        });
      }
      
      // تخزين الرسالة قبل مسح مربع الإدخال
      const currentMessage = message.trim();
      setMessage(''); // مسح مربع الإدخال فوراً لتحسين تجربة المستخدم
      
      try {
        // طباعة معلومات المستخدم للتأكد من صحة البيانات
        console.log('User profile before sending message:', {
          nickname: userProfile.nickname,
          userId: userProfile.userId,
          avatarId: userProfile.avatarId
        });
        
        const messageData = {
          message: currentMessage,
          sender: userProfile.nickname,
          userId: userProfile.userId,
          senderAvatarId: userProfile.avatarId || 1 // ضمان وجود قيمة افتراضية
        };
        
        // إنشاء معرف فريد للرسالة المحلية
        const localId = `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // إنشاء رسالة محلية للعرض الفوري
        const localMessage = {
          id: localId,
          ...messageData,
          timestamp: new Date().toISOString(),
          interaction: {
            likes: [],
            isLiked: false
          },
          pending: true // علامة لتمييز الرسائل قيد الإرسال
        };
        
        // إضافة الرسالة محليًا فوراً للتجربة المستخدم الأفضل
        setMessages(prev => [...prev, localMessage]);
        
        try {
          // محاولة إرسال الرسالة إلى API
          const response = await fetch('/api/chat/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'فشل في إرسال الرسالة');
          }
          
          const data = await response.json();
          
          if (data.success) {
            // تحديث الرسالة المحلية بالمعرف الجديد وإزالة علامة pending
            setMessages(prev => 
              prev.map(msg => 
                msg.id === localId ? { ...data.message, pending: false } : msg
              )
            );
          } else {
            throw new Error(data.error || 'فشل في إرسال الرسالة');
          }
        } catch (apiError) {
          console.error('Error sending message to API:', apiError);
          
          // تحديث الرسالة المحلية لإظهار الخطأ
          setMessages(prev => 
            prev.map(msg => 
              msg.id === localId ? { ...msg, pending: false, error: true, errorMessage: apiError.message } : msg
            )
          );
          
          // إظهار رسالة خطأ صغيرة تحت الرسالة بدلاً من تنبيه
          console.error(`فشل في إرسال الرسالة: ${apiError.message}`);
        }
      } catch (error) {
        console.error('Error in handleSend:', error);
        // إظهار رسالة خطأ فقط في حالة فشل العملية بالكامل
        alert(`حدث خطأ: ${error.message}`);
      }
    }
  };

  // إضافة وظيفة التعامل مع الإعجاب بالرسائل
  const handleLikeMessage = async (messageId) => {
    // التحقق من وجود ملف شخصي للمستخدم
    if (!userProfile.nickname || !userProfile.userId) {
      alert('يجب إنشاء ملف شخصي قبل الإعجاب بالرسائل');
      return;
    }
    
    try {
      // تحديث الإعجاب محليًا أولاً للاستجابة السريعة
      setMessages(prev => 
        prev.map(msg => {
          if (msg.id === messageId) {
            const userLiked = msg.interaction.likes.includes(userProfile.userId);
            return {
              ...msg,
              interaction: {
                ...msg.interaction,
                likes: userLiked
                  ? msg.interaction.likes.filter(id => id !== userProfile.userId)
                  : [...msg.interaction.likes, userProfile.userId],
                isLiked: !userLiked
              }
            };
          }
          return msg;
        })
      );
      
      try {
        // محاولة إرسال الإعجاب إلى API
        const response = await fetch('/api/chat/messages/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageId,
            userId: userProfile.userId
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success) {
            // تحديث الرسالة في الواجهة بناءً على رد الخادم
            setMessages(prev => 
              prev.map(msg => 
                msg.id === messageId ? { ...data.message, id: messageId } : msg
              )
            );
            
            console.log(`تم ${data.liked ? 'إضافة' : 'إزالة'} الإعجاب بالرسالة ${messageId}`);
          }
        } else {
          // في حالة فشل الطلب، نعيد الرسالة إلى حالتها السابقة
          const errorData = await response.json();
          console.error('خطأ في تحديث الإعجاب:', errorData.error);
          // إعادة تحميل الرسائل
          fetchMessages();
        }
      } catch (apiError) {
        console.warn('تعذر تحديث الإعجاب عبر API:', apiError);
        // إعادة تحميل الرسائل
        fetchMessages();
      }
    } catch (error) {
      console.error('Error liking message:', error);
      // يمكن إضافة إشعار للمستخدم هنا
    }
  };

  return (
    <div className="my-10 px-2 sm:px-4 max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-2xl overflow-hidden border border-blue-500/30 transition-all duration-300 hover:shadow-blue-400/20 hover:shadow-2xl h-[600px] flex flex-col">
        {/* شريط العنوان */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-3 sm:p-4 border-b border-blue-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600/50 mr-2 sm:mr-3 border border-blue-400/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 text-blue-200">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
              </svg>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white">دردشة الفاتحون المباشرة</h3>
          </div>
          <div className="text-blue-200 text-xs sm:text-sm flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            <span>{onlineUsers.length} لاعب متصل حالياً</span>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* قائمة اللاعبين المتصلين - تظهر فقط في الشاشات الكبيرة */}
          <div className="hidden md:block w-64 bg-gradient-to-b from-blue-950 to-blue-900 border-l border-blue-700/50 py-4 px-3 overflow-y-auto flex-shrink-0">
            <h4 className="text-blue-200 font-bold mb-4 pb-2 border-b border-blue-700/70 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400 mr-2">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              <span>اللاعبين المتصلين</span>
            </h4>
            
            {/* مؤشر حالة الاتصال */}
            <div className="mb-4 p-2 rounded-lg border border-blue-700/50 bg-blue-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-blue-300 text-xs">حالة الاتصال:</span>
                <div className="flex items-center">
                  {connectionState.status === 'connected' && (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></span>
                      <span className="text-green-400 text-xs">متصل</span>
                    </>
                  )}
                  
                  {connectionState.status === 'connecting' && (
                    <>
                      <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-1"></span>
                      <span className="text-yellow-400 text-xs">جاري الاتصال...</span>
                    </>
                  )}
                  
                  {connectionState.status === 'fallback' && (
                    <>
                      <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-1"></span>
                      <span className="text-orange-400 text-xs">وضع محدود</span>
                    </>
                  )}
                  
                  {connectionState.status === 'error' && (
                    <>
                      <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-1"></span>
                      <span className="text-red-400 text-xs">خطأ في الاتصال</span>
                    </>
                  )}
                </div>
              </div>
              
              {/* عرض زر إعادة الاتصال في حالة الخطأ أو الوضع المحدود */}
              {(connectionState.status === 'error' || connectionState.status === 'fallback') && (
                <button 
                  className="w-full mt-1 py-1 px-2 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                  onClick={() => window.location.reload()}
                >
                  إعادة الاتصال
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {/* ملفي الشخصي */}
              {userProfile?.nickname && (
                <div className="flex items-center py-2 px-3 rounded-lg bg-blue-800/40 border border-blue-600/30 mb-4 shadow-sm">
                  <div className="w-9 h-9 rounded-full overflow-hidden mr-2 border-2 border-blue-400 shadow-md">
                    <img 
                      src={getAvatarSrc(userProfile.avatarId)} 
                      alt={userProfile.nickname} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">{userProfile.nickname}</span>
                    <span className="text-blue-300 text-xs">أنت - متصل الآن</span>
                  </div>
                </div>
              )}
              
              {/* قائمة اللاعبين */}
              <ul className="space-y-2">
                {onlineUsers.map((user, index) => (
                  <li key={user.name || `user-${index}`} className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-800/20 transition-colors">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400/50">
                        <img 
                          src={getAvatarSrc(user.avatarId)} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-blue-900"></div>
                    </div>
                    <span className="text-blue-100 mr-2">{user.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* منطقة الدردشة */}
          <div className="w-full md:flex-1 flex flex-col bg-gradient-to-b from-gray-900/80 to-blue-950/80 overflow-hidden">
            {/* شريط قائمة اللاعبين المتصلين للشاشات الصغيرة */}
            <div className="md:hidden bg-blue-900/60 p-2 border-b border-blue-700/30 overflow-x-auto flex-shrink-0">
              <div className="flex space-x-2 rtl:space-x-reverse">
                {userProfile?.nickname && (
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400/40">
                      <img 
                        src={getAvatarSrc(userProfile.avatarId)} 
                        alt={userProfile.nickname} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-blue-200 text-xs mt-1">أنت</span>
                  </div>
                )}
                
                {onlineUsers.map((user, index) => (
                  <div key={user.name || `mobile-user-${index}`} className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-400/30">
                        <img 
                          src={getAvatarSrc(user.avatarId)} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-blue-900"></div>
                    </div>
                    <span className="text-blue-200 text-xs mt-1 whitespace-nowrap max-w-[4rem] truncate">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* عرض الرسائل - استخدام flex-direction: column-reverse */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 flex flex-col-reverse">
              {typingUsers.length > 0 && (
                <div className="text-blue-300 text-xs sm:text-sm mb-2 flex items-center">
                  <div className="flex space-x-1 rtl:space-x-reverse items-center mr-2">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                  <span>
                    {typingUsers.length === 1 
                      ? `${typingUsers[0]} يكتب الآن...` 
                      : `${typingUsers.length} لاعبين يكتبون الآن...`}
                  </span>
                </div>
              )}
              
              <div ref={messagesEndRef} />
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full opacity-80">
                  <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-blue-300">جاري تحميل المحادثات...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-400 mb-3 opacity-70">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-300 text-center max-w-xs">فشل في تحميل المحادثات: {error}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => window.location.reload()}
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-80">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-400 mb-3 opacity-70">
                    <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd" />
                  </svg>
                  <p className="text-blue-300 text-center max-w-xs">لا توجد رسائل بعد. كن أول من يبدأ المحادثة!</p>
                </div>
              ) : (
                [...messages].reverse().map((msg, index) => {
                    const formattedDate = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const isCurrentUser = userProfile.nickname && msg.sender === userProfile.nickname;
                    
                    return (
                      <div 
                        key={msg.id || `message-${index}-${msg.timestamp}`} 
                      className={`mb-3 max-w-[90%] sm:max-w-[85%] ${isCurrentUser ? 'self-end ml-auto' : 'self-start'} animate-fade-in`}
                      >
                      <div className="flex items-start gap-1 sm:gap-2">
                          {!isCurrentUser && (
                            <div className="flex-shrink-0">
                            <div className="relative">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/40 overflow-hidden shadow-md">
                                <img 
                                  src={getAvatarSrc(getUserInfoFromMessage(msg).avatarId)} 
                                  alt={msg.sender} 
                                  title={`${msg.sender} (Avatar ID: ${getUserInfoFromMessage(msg).avatarId})`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {getUserInfoFromMessage(msg).isOnline && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-blue-900"></div>
                              )}
                            </div>
                            </div>
                          )}
                          <div className={`${isCurrentUser ? 'order-1' : 'order-2'}`}>
                            <div className="flex items-baseline mb-1">
                            <span className="font-bold text-blue-200 text-sm sm:text-base mr-2">{msg.sender}</span>
                              <span className="text-xs text-blue-400">{formattedDate}</span>
                            </div>
                            <div 
                            className={`rounded-lg p-2 sm:p-3 shadow-lg ${isCurrentUser 
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none' 
                                : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 rounded-tl-none'
                              } ${msg.error ? 'border border-red-500' : ''} ${msg.pending ? 'opacity-70' : ''}`}
                            >
                            <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{msg.message}</p>
                            {msg.error && (
                              <p className="text-xs text-red-300 mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 inline-block mr-1">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                </svg>
                                {msg.errorMessage || 'فشل في الإرسال'}
                              </p>
                            )}
                            {msg.pending && (
                              <p className="text-xs text-blue-300 mt-1 flex items-center">
                                <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري الإرسال...
                              </p>
                            )}
                            <div className="flex items-center justify-end mt-1.5 text-xs">
                              <button 
                                className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
                                onClick={() => handleLikeMessage(msg.id)}
                              >
                                {msg.interaction?.isLiked || (msg.interaction?.likes && msg.interaction.likes.includes('currentUserId')) ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-400">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                  </svg>
                                )}
                                <span className="mr-1">{msg.interaction?.likes?.length || 0}</span>
                              </button>
                            </div>
                            </div>
                          </div>
                          {isCurrentUser && (
                            <div className="flex-shrink-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/40 overflow-hidden shadow-md">
                                <img 
                                  src={getAvatarSrc(getUserInfoFromMessage(msg).avatarId)} 
                                  alt={msg.sender} 
                                  title={`${msg.sender} (Avatar ID: ${getUserInfoFromMessage(msg).avatarId})`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                })
              )}
            </div>
            
            {/* مربع إدخال الرسالة - ثابت بالأسفل */}
            <div className="p-2 sm:p-4 border-t border-blue-800/40 bg-gradient-to-r from-blue-900/40 to-blue-950/40 flex-shrink-0">
              {/* إظهار حالة الاتصال في وضع الخطأ */}
              {connectionState.status === 'error' && (
                <div className="mb-2 p-2 rounded-lg bg-red-900/30 border border-red-700/50 text-xs text-red-200">
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-red-400">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.48 10 10 10 10-4.48 10-10S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 10l-1.72 1.72a.75.75 0 101.06 1.06L12 11.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L12 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span>يوجد مشكلة في الاتصال</span>
                  </div>
                  <p>بعض ميزات الدردشة قد لا تعمل. يمكنك إرسال رسائل ولكن قد لا تظهر الردود فورًا.</p>
                  <button 
                    className="mt-1 py-1 px-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
                    onClick={() => window.location.reload()}
                  >
                    إعادة تحميل الصفحة
                  </button>
                </div>
              )}
              
              {/* إظهار حالة الاتصال في وضع محدود */}
              {connectionState.status === 'fallback' && (
                <div className="mb-2 p-2 rounded-lg bg-yellow-900/20 border border-yellow-700/30 text-xs text-yellow-200">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1 text-yellow-400">
                      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                    <span>الدردشة تعمل في الوضع المحدود</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder="اكتب رسالتك هنا..."
                    className="w-full p-2 sm:p-3 pr-10 sm:pr-12 rounded-xl bg-blue-900/30 text-white border border-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner placeholder-blue-400/70 text-sm sm:text-base"
                  />
                  {userProfile?.nickname ? (
                    <div className="absolute right-2 sm:right-3 bottom-1 sm:bottom-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-blue-600/40">
                      <img 
                        src={getAvatarSrc(userProfile.avatarId)}
                        alt={userProfile.nickname}
                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ) : (
                    <div className="absolute right-2 sm:right-3 bottom-1.5 sm:bottom-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400/70">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="p-2 sm:p-3 px-3 sm:px-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 group text-sm sm:text-base"
                  disabled={!message.trim() || !userProfile?.nickname}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180 transition-transform group-hover:translate-x-1">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                  <span>إرسال</span>
                </button>
              </form>
              
              {!userProfile?.nickname && (
                <div className="mt-2 text-center p-2 bg-blue-900/20 rounded-lg border border-blue-800/30 text-blue-300 text-xs sm:text-sm">
                  <span>يجب إنشاء ملف شخصي قبل المشاركة في الدردشة. </span>
                  <a href="/blog/profile" className="text-blue-400 hover:text-blue-300 underline">انقر هنا لإنشاء ملفك الشخصي</a>
                </div>
              )}
            </div>
            
            {/* قسم التواصل المباشر */}
            <div className="p-2 sm:p-3 bg-blue-900 border-t border-blue-700 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-blue-200 text-xs sm:text-sm mb-2 sm:mb-0">للتواصل المباشر:</div>
                <div className="flex flex-wrap gap-3 justify-around sm:space-x-4 sm:rtl:space-x-reverse">
                  <a 
                    href="https://t.me/storefathon1" 
                    target="_blank" 
                    className="flex items-center text-blue-200 hover:text-white text-xs sm:text-sm"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 me-1">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.24-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.67-.4-.68-.23-1.21-.35-1.16-.74.02-.2.3-.4.81-.6 3.17-1.35 5.29-2.24 6.39-2.68 3.05-1.24 3.69-1.46 4.1-1.47.09 0 .29.02.42.16.11.1.14.26.16.37.01.09.02.28 0 .38z"/>
                    </svg>
                    تلجرام
                  </a>
                  <a 
                    href="https://wa.me/201062047932" 
                    target="_blank" 
                    className="flex items-center text-blue-200 hover:text-white text-xs sm:text-sm"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 me-1">
                      <path d="M17.6 6.32C16.16 4.91 14.13 4 12 4s-4.16.91-5.6 2.32C5.01 7.76 4 9.83 4 12c0 1.56.45 3.06 1.3 4.3L4.11 20.1l3.89-1.19c1.2.75 2.6 1.19 4 1.19 2.14 0 4.16-.91 5.6-2.32C18.99 16.24 20 14.17 20 12c0-2.17-1.01-4.24-2.4-5.68zM12 18.5c-1.29 0-2.5-.37-3.56-1.03l-.26-.15-2.79.86.87-2.71-.17-.29c-.71-1.21-1.08-2.63-1.08-4.18 0-4.55 3.7-8.25 8.25-8.25S21.5 7.45 21.5 12s-3.7 8.25-8.25 8.25zm2.25-6.15c.15.08.29.17.42.25.34.19.45.39.53.64.07.25.07.5.05.6-.02.11-.05.26-.22.41-.16.15-.34.2-.47.24-.7.22-1.62.38-2.31-.44-.17-.2-.28-.45-.35-.79-.06-.33-.03-.67.08-.98.11-.29.32-.51.56-.65.25-.15.51-.23.73-.29.54-.15 1.08.17.64.77-.44.59.21.73.34.85z"/>
                    </svg>
                    واتساب
                  </a>
                  <a 
                    href="tel:+201062047932" 
                    className="flex items-center text-blue-200 hover:text-white text-xs sm:text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 me-1">
                      <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"/>
                    </svg>
                    اتصل بنا
                  </a>
                  <a 
                    href="https://t.me/Moon_ClawoaN" 
                    target="_blank" 
                    className="flex items-center text-blue-200 hover:text-white text-xs sm:text-sm"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 me-1">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.24-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.67-.4-.68-.23-1.21-.35-1.16-.74.02-.2.3-.4.81-.6 3.17-1.35 5.29-2.24 6.39-2.68 3.05-1.24 3.69-1.46 4.1-1.47.09 0 .29.02.42.16.11.1.14.26.16.37.01.09.02.28 0 .38z"/>
                    </svg>
                    تلجرام ٢
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
