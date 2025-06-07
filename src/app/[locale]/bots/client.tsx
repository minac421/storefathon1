"use client";

import React, { useState } from 'react';

// Define bot interface
interface Bot {
  id: number;
  name: string;
  description: string;
  price: number | null; // null means free
  features: string[];
  imageUrl: string;
  demoUrl?: string;
  compatibility: ('windows' | 'mac' | 'linux' | 'android' | 'ios')[];
  category: 'farm' | 'battle' | 'resource' | 'alliance' | 'all';
  popular: boolean;
  free: boolean;
}

export default function BotsClient({ bots, locale, t }: { bots: Bot[], locale: string, t: any }) {
  const isRTL = locale === 'ar';
  
  // States for filtering
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [compatibilityFilter, setCompatibilityFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  
  // Filter bots based on selected filters
  const filteredBots = bots.filter(bot => {
    // Filter by category
    if (categoryFilter !== 'all' && bot.category !== categoryFilter) {
      return false;
    }
    
    // Filter by compatibility
    if (compatibilityFilter !== 'all' && !bot.compatibility.includes(compatibilityFilter as any)) {
      return false;
    }
    
    // Filter by price
    if (priceFilter === 'free' && !bot.free) {
      return false;
    } else if (priceFilter === 'paid' && bot.free) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !bot.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !bot.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Bots Header */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t?.bots?.title || 'روبوتات اللعب'}</h1>
            <p className="text-xl max-w-3xl mx-auto">{t?.bots?.subtitle || 'أتمتة مهامك اليومية وتعزيز تجربة اللعب'}</p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">{t?.bots?.filters?.category || 'الفئة'}:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">{t?.bots?.filters?.all || 'الكل'}</option>
                <option value="farm">{t?.bots?.categories?.farm || 'مزارع'}</option>
                <option value="battle">{t?.bots?.categories?.battle || 'معارك'}</option>
                <option value="resource">{t?.bots?.categories?.resource || 'موارد'}</option>
                <option value="alliance">{t?.bots?.categories?.alliance || 'تحالفات'}</option>
                <option value="all">{t?.bots?.categories?.all || 'متنوع'}</option>
              </select>
            </div>
            
            {/* Compatibility Filter */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">{t?.bots?.filters?.compatibility || 'التوافق'}:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={compatibilityFilter}
                onChange={(e) => setCompatibilityFilter(e.target.value)}
              >
                <option value="all">{t?.bots?.filters?.all || 'الكل'}</option>
                <option value="windows">Windows</option>
                <option value="mac">Mac</option>
                <option value="linux">Linux</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>
            
            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">{t?.bots?.filters?.price || 'السعر'}:</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">{t?.bots?.filters?.all || 'الكل'}</option>
                <option value="free">{t?.bots?.filters?.free || 'مجاني'}</option>
                <option value="paid">{t?.bots?.filters?.paid || 'مدفوع'}</option>
              </select>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={t?.bots?.filters?.searchPlaceholder || 'ابحث عن روبوت...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => setSearchTerm('')}
              >
                {t?.bots?.filters?.clear || 'مسح'}
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bots Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBots.map(bot => (
              <div 
                key={bot.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Bot Image */}
                <div className="relative h-48 bg-gray-800">
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
                    🤖
                  </div>
                  
                  {/* Price Badge */}
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 px-3 py-1 rounded-full text-xs font-bold ${
                    bot.free ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}>
                    {bot.free ? (t?.bots?.free || 'مجاني') : `${bot.price} ${t?.bots?.currency || '$'}`}
                  </div>
                  
                  {/* Popular Badge */}
                  {bot.popular && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
                      {t?.bots?.popular || 'شائع'}
                    </div>
                  )}
                </div>
                
                {/* Bot Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{bot.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bot.category === 'farm' ? 'bg-green-100 text-green-800' : 
                      bot.category === 'battle' ? 'bg-red-100 text-red-800' : 
                      bot.category === 'resource' ? 'bg-amber-100 text-amber-800' : 
                      bot.category === 'alliance' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {t?.bots?.categories?.[bot.category] || bot.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{bot.description}</p>
                  
                  {/* Top Features Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{t?.bots?.topFeatures || 'أهم الميزات'}</h4>
                    <ul className="text-sm text-gray-600">
                      {bot.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="mb-1 flex items-start">
                          <span className="text-green-500 mr-1">✓</span> {feature}
                        </li>
                      ))}
                      {bot.features.length > 3 && (
                        <li className="text-blue-600 cursor-pointer" onClick={() => setSelectedBot(bot)}>
                          +{bot.features.length - 3} {t?.bots?.moreFeatures || 'المزيد من الميزات'}
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Compatibility Icons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {bot.compatibility.includes('windows') && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Windows</span>
                    )}
                    {bot.compatibility.includes('mac') && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Mac</span>
                    )}
                    {bot.compatibility.includes('linux') && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Linux</span>
                    )}
                    {bot.compatibility.includes('android') && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Android</span>
                    )}
                    {bot.compatibility.includes('ios') && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">iOS</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setSelectedBot(bot)}
                    >
                      {t?.bots?.viewDetails || 'عرض التفاصيل'}
                    </button>
                    
                    <div>
                      {bot.demoUrl && (
                        <a 
                          href={bot.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mr-2 px-3 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md text-sm"
                        >
                          {t?.bots?.tryDemo || 'تجربة'}
                        </a>
                      )}
                      
                      <button 
                        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {bot.free ? (t?.bots?.download || 'تحميل') : (t?.bots?.buy || 'شراء')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredBots.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">{t?.bots?.noResults || 'لا توجد نتائج تطابق معايير البحث'}</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Bot Details Modal */}
      {selectedBot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side: Image and basic info */}
                <div className="w-full md:w-1/3">
                  <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center text-white text-6xl mb-4">
                    🤖
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">{selectedBot.name}</h2>
                  
                  <div className="flex gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedBot.category === 'farm' ? 'bg-green-100 text-green-800' : 
                      selectedBot.category === 'battle' ? 'bg-red-100 text-red-800' : 
                      selectedBot.category === 'resource' ? 'bg-amber-100 text-amber-800' : 
                      selectedBot.category === 'alliance' ? 'bg-blue-100 text-blue-800' : 
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {t?.bots?.categories?.[selectedBot.category] || selectedBot.category}
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedBot.free ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedBot.free ? (t?.bots?.free || 'مجاني') : `${selectedBot.price} ${t?.bots?.currency || '$'}`}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedBot.description}</p>
                </div>
                
                {/* Right side: Details */}
                <div className="w-full md:w-2/3">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">{t?.bots?.allFeatures || 'جميع الميزات'}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                    {selectedBot.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-700">{t?.bots?.compatibility || 'التوافق'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                    <div className={`p-3 rounded ${selectedBot.compatibility.includes('windows') ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">💻</span>
                        <span>Windows</span>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded ${selectedBot.compatibility.includes('mac') ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🍎</span>
                        <span>Mac</span>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded ${selectedBot.compatibility.includes('linux') ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">🐧</span>
                        <span>Linux</span>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded ${selectedBot.compatibility.includes('android') ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">📱</span>
                        <span>Android</span>
                      </div>
                    </div>
                    
                    <div className={`p-3 rounded ${selectedBot.compatibility.includes('ios') ? 'bg-blue-50' : 'bg-gray-50 opacity-50'}`}>
                      <div className="flex items-center">
                        <span className="text-xl mr-2">📱</span>
                        <span>iOS</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-gray-700 mt-6">{t?.bots?.requirements || 'المتطلبات'}</h3>
                  <p className="text-gray-600">
                    {locale === 'ar' 
                      ? 'يتطلب نظام تشغيل حديث ومتصفح ويب محدث واتصال إنترنت مستقر.' 
                      : locale === 'tr' 
                        ? 'Modern bir işletim sistemi, güncel web tarayıcısı ve kararlı internet bağlantısı gerektirir.'
                        : 'Requires modern operating system, updated web browser, and stable internet connection.'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setSelectedBot(null)}
                >
                  {t?.bots?.back || 'العودة'}
                </button>
                
                <div className="flex gap-2">
                  {selectedBot.demoUrl && (
                    <a 
                      href={selectedBot.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      {t?.bots?.tryDemo || 'تجربة'}
                    </a>
                  )}
                  
                  <button 
                    className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {selectedBot.free ? (t?.bots?.download || 'تحميل') : (t?.bots?.buy || 'شراء')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
