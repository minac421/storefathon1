"use client";

import React, { useState, useEffect } from 'react';
import { 
  CastleData,
  extractCastleDataFromText, 
  addCastleToDatabase,
  importBulkAdvertisements,
  analyzeMarketPrices,
  loadCastleDatabase 
} from '../../utils/castle-valuation/telegramDataCollector';

// تعريف واجهة نوع البيانات للبطل
interface HeroInfo {
  level: number;
  crescents: number;
}

// تعريف واجهة نوع البيانات للإحصائيات
interface MarketStats {
  priceByPrestige: Array<{
    level: number;
    count: number;
    min: number;
    max: number;
    avg: number;
    median: number;
  }>;
  totalCastles: number;
  lastUpdate: Date;
}

export default function DataCollectorPage() {
  const [advertisementText, setAdvertisementText] = useState('');
  const [importedCount, setImportedCount] = useState(0);
  const [marketStats, setMarketStats] = useState<MarketStats | null>(null);
  const [bulkImportMode, setBulkImportMode] = useState(false);
  const [lastExtractedCastle, setLastExtractedCastle] = useState<CastleData | null>(null);
  
  // تحميل الإحصائيات عند تحميل الصفحة
  useEffect(() => {
    loadCastleDatabase();
    updateStats();
  }, []);
  
  // تحديث الإحصائيات
  const updateStats = () => {
    const stats = analyzeMarketPrices();
    setMarketStats(stats as MarketStats);
  };
  
  // معالجة استيراد إعلان فردي
  const handleSingleImport = () => {
    if (!advertisementText.trim()) {
      alert('الرجاء إدخال نص الإعلان');
      return;
    }
    
    const castle = extractCastleDataFromText(advertisementText, 'manual-entry');
    if (castle) {
      setLastExtractedCastle(castle);
    } else {
      alert('فشل استخراج بيانات القلعة من النص، تأكد من صحة المعلومات');
      return;
    }
  };
  
  // معالجة حفظ القلعة المستخرجة
  const handleSaveCastle = () => {
    if (!lastExtractedCastle) {
      alert('لا توجد بيانات قلعة للحفظ');
      return;
    }
    
    addCastleToDatabase(lastExtractedCastle);
    updateStats();
    
    alert('تم حفظ بيانات القلعة بنجاح');
    setLastExtractedCastle(null);
    setAdvertisementText('');
    setImportedCount(prevCount => prevCount + 1);
  };
  
  // معالجة استيراد عدة إعلانات
  const handleBulkImport = () => {
    if (!advertisementText.trim()) {
      alert('الرجاء إدخال نصوص الإعلانات');
      return;
    }
    
    // تقسيم النص إلى عدة إعلانات (كل إعلان يفصله عن الآخر سطرين فارغين)
    const advertisements = advertisementText
      .split(/\n\s*\n\s*\n/)
      .filter(text => text.trim())
      .map(text => ({ text, source: 'bulk-import' }));
    
    const importedCount = importBulkAdvertisements(advertisements);
    
    if (importedCount > 0) {
      updateStats();
      alert(`تم استيراد ${importedCount} من ${advertisements.length} إعلان بنجاح`);
      setAdvertisementText('');
      setImportedCount(prevCount => prevCount + importedCount);
    } else {
      alert('فشل استيراد الإعلانات، تأكد من صحة البيانات');
    }
  };
  
  // عرض بيانات القلعة المستخرجة
  const renderExtractedCastle = () => {
    if (!lastExtractedCastle) return null;
    
    const castle = lastExtractedCastle;
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-green-700">تم استخراج بيانات القلعة بنجاح:</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p><span className="font-bold">السعر:</span> ${castle.price}</p>
            <p><span className="font-bold">مستوى الهيبة:</span> {castle.prestigeLevel}</p>
            <p><span className="font-bold">نوع الربط:</span> {
              castle.linkType === 1 ? 'IGG فقط' : 
              castle.linkType === 3 ? 'ربط متعدد' : 'ربط عادي'
            }</p>
            <p><span className="font-bold">نوع العتاد:</span> {
              castle.equipmentType === 6 ? 'ذهبي كامل' : 
              castle.equipmentType === 5 ? 'معظمه ذهبي' : 
              castle.equipmentType === 4 ? '2-3 قطع ذهبية' : 
              castle.equipmentType === 3 ? 'بنفسجي + قطعة ذهبية' : 
              castle.equipmentType === 2 ? 'بنفسجي' : 
              castle.equipmentType === 1 ? 'أزرق' : 'غير معروف'
            }</p>
          </div>
          
          <div>
            <p><span className="font-bold">الأبطال:</span> {Object.keys(castle.heroes).length} بطل</p>
            <p><span className="font-bold">الفيالق:</span> {Object.keys(castle.legions).length} فيلق</p>
            <p><span className="font-bold">عدد المظاهر النادرة:</span> {castle.rareSkins}</p>
            <p><span className="font-bold">عدد سير الأبطال:</span> {castle.heroStoryCount}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-bold mb-2">تفاصيل الأبطال:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(castle.heroes).map(([heroId, heroData]) => {
              // تأكيد نوع البيانات
              const hero = heroData as HeroInfo;
              return (
                <div key={heroId} className="bg-gray-100 p-2 rounded">
                  <p className="text-sm">
                    {heroId === 'salah' ? 'صلاح الدين' : 
                     heroId === 'fatih' ? 'الفاتح' : 
                     heroId === 'mukhtar' ? 'مختار' : 
                     heroId === 'qutuz' ? 'قطز' : 
                     heroId === 'barquq' ? 'برقوق' : 
                     heroId === 'malik' ? 'مالك' : 
                     heroId === 'halima' ? 'حليمة' : 
                     heroId === 'qaitbay' ? 'قايتباي' : 
                     heroId === 'harun' ? 'هارون' : 
                     heroId === 'baron' ? 'بارون' : 
                     heroId === 'burak' ? 'بوراك' : 
                     heroId === 'alexander' ? 'الإسكندر الأكبر' : heroId}
                    : مستوى {hero.level} {hero.crescents > 0 ? `(${hero.crescents} هلال)` : ''}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-bold mb-2">تفاصيل الفيالق:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(castle.legions).map(([legionType, levelData]) => {
              // تأكيد نوع البيانات
              const level = Number(levelData);
              return (
                <div key={legionType} className="bg-gray-100 p-2 rounded">
                  <p className="text-sm">
                    {legionType === 'infantry' ? 'مشاة' : 
                     legionType === 'cavalry' ? 'فرسان' : 
                     legionType === 'archers' ? 'رماة' : 
                     legionType === 'chariots' ? 'عجلات' : legionType}
                    : مستوى {level}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={handleSaveCastle}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            حفظ البيانات
          </button>
          
          <button 
            onClick={() => setLastExtractedCastle(null)}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  };
  
  // عرض إحصائيات السوق
  const renderMarketStats = () => {
    if (!marketStats) return null;
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-blue-800">إحصائيات أسعار السوق</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المستوى</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عدد القلاع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">متوسط السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وسيط السعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">أقل سعر</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">أعلى سعر</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marketStats.priceByPrestige.map((stat, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index === 0 ? 'قلعة 30' : 
                     index === 1 ? 'جنود 1' : 
                     `هيبة ${index}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.count || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${stat.avg || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${stat.median || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${stat.min === Infinity ? 0 : stat.min}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${stat.max || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            إجمالي عدد القلاع في قاعدة البيانات: <span className="font-bold">{marketStats.totalCastles}</span>
          </p>
          <p>
            آخر تحديث: <span className="font-bold">{new Date(marketStats.lastUpdate).toLocaleString()}</span>
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">نظام جمع بيانات قلاع الفاتحون</h1>
        <p className="text-lg text-gray-600 mb-2">استيراد وتحليل بيانات القلاع من مجموعات تلجرام</p>
        <p className="text-sm text-gray-500">تم استيراد <span className="font-bold">{importedCount}</span> قلعة حتى الآن</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {bulkImportMode ? 'استيراد عدة إعلانات' : 'استيراد إعلان قلعة'}
            </h2>
            
            <button 
              onClick={() => setBulkImportMode(!bulkImportMode)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {bulkImportMode ? 'تبديل إلى وضع الإدخال الفردي' : 'تبديل إلى وضع الاستيراد الجماعي'}
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {bulkImportMode ? 'نصوص الإعلانات (افصل بين كل إعلان وآخر بسطرين فارغين)' : 'نص إعلان القلعة'}
            </label>
            <textarea
              value={advertisementText}
              onChange={(e) => setAdvertisementText(e.target.value)}
              placeholder={bulkImportMode ? 
                'ضع هنا عدة إعلانات مفصولة بسطرين فارغين...\nمثال:\nهيبة 3 للبيع، سعر 500$ صلاح 5، فاتح 5، مختار 5\n\n\nقلعة 30 للبيع، السعر 150$، صلاح 4، فاتح 3' : 
                'ضع هنا نص إعلان قلعة من تلجرام...\nمثال: هيبة 3 للبيع، سعر 500$ صلاح 5، فاتح 5، مختار 5، فيلق مشاة 3'
              }
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
              dir="rtl"
            ></textarea>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={bulkImportMode ? handleBulkImport : handleSingleImport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-md w-full"
            >
              {bulkImportMode ? 'استيراد الإعلانات' : 'تحليل الإعلان'}
            </button>
          </div>
        </div>
        
        <div>
          {lastExtractedCastle ? renderExtractedCastle() : renderMarketStats()}
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">دليل استخدام نظام جمع البيانات</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-700">طريقة الاستيراد الفردي:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>انسخ نص إعلان القلعة من مجموعة تلجرام</li>
              <li>الصق النص في مربع النص</li>
              <li>اضغط على "تحليل الإعلان" لاستخراج البيانات</li>
              <li>تحقق من صحة البيانات المستخرجة</li>
              <li>اضغط على "حفظ البيانات" لإضافتها إلى قاعدة البيانات</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2 text-green-700">طريقة الاستيراد الجماعي:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>انسخ عدة إعلانات من مجموعة تلجرام</li>
              <li>الصق النصوص في مربع النص، تأكد من فصل كل إعلان بسطرين فارغين</li>
              <li>اضغط على "استيراد الإعلانات" لتحليل جميع الإعلانات وإضافتها</li>
              <li>سيظهر إشعار بعدد الإعلانات التي تم استيرادها بنجاح</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-blue-800">ملاحظات مهمة:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>كلما زاد عدد القلاع في قاعدة البيانات، كلما زادت دقة نظام التقييم</li>
            <li>يمكن استيراد إعلانات من أي مجموعة تلجرام تخص قلاع الفاتحون</li>
            <li>تأكد من أن الإعلان يحتوي على سعر القلعة حتى يتم اعتباره صالحًا</li>
            <li>يتم تحديث إحصائيات السوق تلقائيًا بعد كل عملية استيراد ناجحة</li>
            <li>النظام يدعم استخراج جميع الأبطال الجدد (قايتباي، هارون، بارون، بوراك، الإسكندر)</li>
          </ul>
        </div>
      </div>
      
      <div className="text-center">
        <a 
          href="/castle-valuation" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          العودة إلى نظام التقييم
        </a>
        <a 
          href="/castle-valuation/sample-data" 
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mr-4"
        >
          نماذج إعلانات للاختبار
        </a>
      </div>
    </div>
  );
} 