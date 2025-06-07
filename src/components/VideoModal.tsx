"use client";

import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
  title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen || !videoUrl) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4">
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-center">فيديو: {title}</h2>
        </div>
        
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900 rounded-lg">
          {/* عرض رسالة تحميل */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-white bg-black bg-opacity-50 px-4 py-2 rounded">
              جاري تحميل الفيديو...
            </div>
          </div>
          
          {/* تحليل نوع الفيديو وعرضه بالشكل المناسب */}
          {videoUrl.startsWith('data:') ? (
            // إذا كان رابط base64
            <video className="w-full h-full" controls autoPlay>
              <source src={videoUrl} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          ) : videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
            // إذا كان فيديو يوتيوب
            <iframe 
              className="w-full h-full" 
              src={videoUrl.replace('watch?v=', 'embed/')} 
              title={title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : videoUrl.includes('t.me/') || videoUrl.includes('telegram.me/') || videoUrl.includes('telegram.dog/') ? (
            // إذا كان رابط تيليجرام
            <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50">
              <div className="mb-4 text-blue-600 text-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.426 14.741h-.012l-.001.003c.47.003.117-.051.152-.099.039-.054.067-.182.066-.333l-.105-1.587c-.47.042-1.003.043-1.444-.187.006-.008.016-.023.025-.035.063-.084.141-.184.245-.269.231-.189.55-.311.933-.311h.001c.426.001.954.175 1.437.425.433.224.835.488 1.124.673l.483.31c.729.465 1.753 1.118 2.58 1.234.414.058.795.015 1.114-.104.159-.059.328-.176.343-.386.014-.21-.136-.374-.304-.414-.168-.04-.411-.01-.641.083-.384.154-.783.232-1.125.191-.615-.074-1.347-.5-2.089-.97l-.533-.342c-.31-.2-.719-.468-1.103-.67-.359-.186-.74-.306-.964-.306-.073 0-.147.015-.22.047-.247.108-.42.336-.513.601-.103.293-.063.622.117.861zm6.819-8.741l-6.023 2.349c-1.167.455-2.274.889-3.274 1.283-1.995.788-1.982.788-1.682 1.154.15.183.548.428 1.315.761.831.361 1.907.825 2.144.852.679.077 1.858-.45 3.558-1.367l4.031-2.165.683-.37c.632-.342 1.328-.717 1.328-1.498 0-.382-.26-.703-.434-.879-.174-.176-.418-.309-.695-.401-.55-.185-1.148-.132-1.755.033l.804-.752zm-.721 1.312c.224-.066.421-.037.539.142.085.129.122.372-.041.665-.185.334-.636.568-1.059.772l-4.043 1.978c-.878.43-3.246 1.719-3.921 1.785-.312.031-1.128-.341-2.062-.741-.76-.327-1.521-.652-1.673-.835.018-.03.096-.143.2-.27.131-.159.291-.348.537-.411.54-.14 1.75-.631 2.91-1.092.718-.285 1.472-.585 2.039-.806l6.564-2.575c.392-.213.655-.248.01.388z"/>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">فيديو في تيليجرام</h3>
                <p className="mb-4 text-gray-700">انقر الزر لمشاهدة الفيديو مباشرة في تيليجرام</p>
                <a 
                  href={videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto max-w-xs"
                >
                  <span className="mr-2">فتح الفيديو في تيليجرام</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          ) : (
            // فيديو عادي - حاول كل الأنواع المتاحة
            <video 
              className="w-full h-full z-20 relative" 
              controls 
              autoPlay 
              playsInline
              onLoadStart={() => console.log('بدء تحميل الفيديو:', videoUrl)}
              onCanPlay={() => console.log('يمكن تشغيل الفيديو')}
              onError={(e) => console.error('خطأ في تحميل الفيديو:', e)}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/ogg" />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white p-4 text-center">
                لم يتمكن متصفحك من تشغيل الفيديو.<br/>
                الرابط: <code className="bg-gray-800 p-1 rounded text-xs break-all">{videoUrl}</code>
              </div>
            </video>
          )}
        </div>
        
        <div className="p-4 flex justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
