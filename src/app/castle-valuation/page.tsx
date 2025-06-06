"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  calculateCastlePrice, 
  prepareDataForValuation, 
  generateValuationReport, 
  getCastleTier 
} from '../../utils/castle-valuation/improvedCastleValuation';

// مستويات الهيبة
const PRESTIGE_LEVELS = [
  { value: 0, label: 'بدون هيبة (قلعة عادية)' },
  { value: 1, label: 'هيبة 1' },
  { value: 2, label: 'هيبة 2' },
  { value: 3, label: 'هيبة 3' },
  { value: 4, label: 'هيبة 4' },
  { value: 5, label: 'هيبة 5' }
];

// قائمة الأبطال الأساسيين
const MAIN_HEROES = [
  { id: 'salah', name: 'صلاح الدين', tier: 1 },
  { id: 'fatih', name: 'الفاتح', tier: 1 },
  { id: 'mukhtar', name: 'مختار', tier: 1 },
  { id: 'qutuz', name: 'قطز', tier: 2 },
  { id: 'malik', name: 'مالك', tier: 2 },
  { id: 'barquq', name: 'برقوق', tier: 2 },
  { id: 'qaitbay', name: 'قايتباي', tier: 3 },
  { id: 'harun', name: 'هارون', tier: 3 },
  { id: 'baron', name: 'بارون', tier: 3 },
  { id: 'burak', name: 'بوراك', tier: 4 },
  { id: 'alexander', name: 'الإسكندر الأكبر', tier: 4 },
  { id: 'halima', name: 'حليمة', tier: 4 }
];

// أنواع العتاد
const EQUIPMENT_TYPES = [
  { value: 1, label: 'أزرق' },
  { value: 2, label: 'بنفسجي' },
  { value: 3, label: 'بنفسجي + قطعة ذهبية' },
  { value: 4, label: 'بنفسجي + 2-3 قطع ذهبية' },
  { value: 5, label: 'معظمه ذهبي' },
  { value: 6, label: 'ذهبي كامل' }
];

// أنواع الربط
const LINK_TYPES = [
  { value: 1, label: 'IGG فقط (أفضل)' },
  { value: 2, label: 'ربط عادي' },
  { value: 3, label: 'ربط متعدد' }
];

// مستويات الفيالق
const LEGION_LEVELS = [
  { value: 0, label: 'غير مطور' },
  { value: 1, label: 'مستوى 1' },
  { value: 2, label: 'مستوى 2' },
  { value: 3, label: 'مستوى 3' },
  { value: 4, label: 'مستوى 4' },
  { value: 5, label: 'مستوى 5 (ماكس)' }
];

// تعريف نوع بيانات النموذج
interface HeroInfo {
  level: number;
  crescents: number;
}

interface FormDataType {
  prestigeLevel: number;
  castleLevel: number;
  heroes: {
    salah: HeroInfo;
    fatih: HeroInfo;
    mukhtar: HeroInfo;
    qutuz: HeroInfo;
    barquq: HeroInfo;
    malik: HeroInfo;
    qaitbay: HeroInfo;
    harun: HeroInfo;
    baron: HeroInfo;
    burak: HeroInfo;
    alexander: HeroInfo;
    halima: HeroInfo;
    [key: string]: HeroInfo; // إضافة هذا لدعم الوصول الديناميكي للأبطال
  };
  secondaryHeroesCount: number;
  heroStoryCount: number;
  equipmentType: number;
  goldSeals: number;
  reservesMillions: number;
  ignitionMillions: number;
  sciencePoints: number;
  hasAccelerators: boolean;
  hasResources: boolean;
  extraFeatures: string;
  linkType: number;
  legionInfantry: number;
  legionCavalry: number;
  legionArchers: number;
  legionChariots: number;
  rareSkins: number;
}

// إضافة دالة لتوليد رابط المشاركة
const generateShareText = (valuation: any, formData: FormDataType) => {
  return `قمت بتقييم قلعتي في الفاتحون 🏰\nالسعر المقدر: $${valuation.basePrice}\nمستوى الهيبة: ${formData.prestigeLevel}\nتقييم القلاع من متجر الفاتحون`;
};

export default function CastleValuationPage() {
  // حالة النموذج
  const [formData, setFormData] = useState<FormDataType>({
    prestigeLevel: 0,
    castleLevel: 30,
    heroes: {
      // الأبطال الأساسيين بمستوياتهم
      salah: { level: 5, crescents: 0 },
      fatih: { level: 4, crescents: 0 },
      mukhtar: { level: 4, crescents: 0 },
      qutuz: { level: 4, crescents: 0 },
      barquq: { level: 3, crescents: 0 },
      malik: { level: 3, crescents: 0 },
      qaitbay: { level: 0, crescents: 0 },
      harun: { level: 0, crescents: 0 },
      baron: { level: 0, crescents: 0 },
      burak: { level: 0, crescents: 0 },
      alexander: { level: 0, crescents: 0 },
      halima: { level: 3, crescents: 0 }
    },
    secondaryHeroesCount: 3, // عدد الأبطال الثانويين بمستوى 3 أو أعلى
    heroStoryCount: 0, // عدد سير الأبطال المكتملة
    equipmentType: 2, // نوع العتاد (بنفسجي افتراضيًا)
    goldSeals: 50, // عدد الأختام الذهبية
    reservesMillions: 5, // احتياطي الجنود بالمليون
    ignitionMillions: 2, // الإشعال بالمليون
    sciencePoints: 150, // نقاط العلوم بالمليون
    hasAccelerators: true, // هل يوجد تسريعات جيدة
    hasResources: true, // هل يوجد موارد جيدة
    extraFeatures: '', // ميزات إضافية (نص)
    linkType: 2, // نوع الربط (عادي افتراضيًا)
    legionInfantry: 0, // مستوى فيلق المشاة
    legionCavalry: 0, // مستوى فيلق الفرسان
    legionArchers: 0, // مستوى فيلق الرماة
    legionChariots: 0, // مستوى فيلق العجلات
    rareSkins: 0 // عدد المظاهر النادرة
  });

  // نتيجة التقييم
  const [valuation, setValuation] = useState({
    basePrice: 0,
    minPrice: 0,
    maxPrice: 0,
    quickSalePrice: 0,
    premiumPrice: 0,
    tierName: '',
    details: {} as any,
    report: '',
    submitted: false
  });

  // معالجة تغيير قيمة الحقل
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // التعامل مع الحقول المتداخلة مثل الأبطال
    if (name.includes('.')) {
      const [parent, child, property] = name.split('.');
      
      if (parent === 'heroes') {
        setFormData(prev => {
          // نسخة من حالة النموذج الحالية
          const newFormData = { ...prev };
          // نسخة من كائن الأبطال
          const newHeroes = { ...prev.heroes };
          // نسخة من بيانات البطل المحدد
          const newHeroInfo = { ...newHeroes[child] };
          
          // تحديث قيمة البطل
          if (property === 'level' || property === 'crescents') {
            newHeroInfo[property] = Number(value);
          }
          
          // تحديث البطل في قائمة الأبطال
          newHeroes[child] = newHeroInfo;
          // تحديث قائمة الأبطال في النموذج
          newFormData.heroes = newHeroes;
          
          return newFormData;
        });
      }
    } else {
      // التعامل مع الحقول العادية
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : type === 'number' || name === 'prestigeLevel' || name === 'castleLevel' || name === 'equipmentType' || name === 'secondaryHeroesCount'
            ? Number(value)
            : value
      }));
    }
  };

  // حساب سعر القلعة باستخدام النظام المحسن
  const calculateValuation = () => {
    // تحويل بيانات النموذج إلى الصيغة المناسبة للتقييم
    const preparedData = prepareDataForValuation(formData);
    
    // حساب تقييم القلعة باستخدام النموذج المحسن
    const result = calculateCastlePrice(preparedData);

    // تحديد فئة القلعة
    const tier = getCastleTier(result.basePrice);

    // إنشاء تقرير مفصل
    const report = generateValuationReport(result, preparedData);

    return {
      basePrice: result.basePrice,
      minPrice: result.minPrice,
      maxPrice: result.maxPrice,
      quickSalePrice: result.quickSalePrice,
      premiumPrice: result.premiumPrice,
      tierName: tier,
      details: result,
      report,
      submitted: true
    };
  };

  // معالجة تقديم النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateValuation();
    setValuation(result);
    
    // تمرير للنتيجة
    setTimeout(() => {
      const resultElement = document.getElementById('valuation-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // دالة المشاركة على وسائل التواصل الاجتماعي
  const shareResult = (platform: string) => {
    const shareText = generateShareText(valuation, formData);
    const shareUrl = window.location.href;
    
    let shareLink = '';
    
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
  };

  // دالة حفظ التقييم (تمثيلية فقط في هذه المرحلة)
  const saveValuation = () => {
    alert('تم حفظ التقييم في ملفك الشخصي!');
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">نظام تقييم قلاع الفاتحون المطوّر</h1>
        <p className="text-lg text-gray-600">أدخل مواصفات قلعتك واحصل على تقييم سعري دقيق وتوصيات للبيع</p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* معلومات القلعة الأساسية */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 border-b pb-2">معلومات القلعة الأساسية</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى الهيبة</label>
                <select
                  name="prestigeLevel"
                  value={formData.prestigeLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PRESTIGE_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى القلعة</label>
                <input
                  type="number"
                  name="castleLevel"
                  min="15"
                  max="35"
                  value={formData.castleLevel}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* الأبطال الأساسيين */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-green-800 border-b pb-2">الأبطال الأساسيين</h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">أبطال الفئة الأولى (الأهم)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MAIN_HEROES.filter(hero => hero.tier === 1).map(hero => (
                  <div key={hero.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{hero.name}</h3>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm mb-1">المستوى</label>
                        <select
                          name={`heroes.${hero.id}.level`}
                          value={formData.heroes[hero.id]?.level || 0}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value={0}>غير مفتوح</option>
                          <option value={1}>⭐</option>
                          <option value={2}>⭐⭐</option>
                          <option value={3}>⭐⭐⭐</option>
                          <option value={4}>⭐⭐⭐⭐</option>
                          <option value={5}>⭐⭐⭐⭐⭐</option>
                        </select>
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm mb-1">الهلال الأحمر</label>
                        <select
                          name={`heroes.${hero.id}.crescents`}
                          value={formData.heroes[hero.id]?.crescents || 0}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">أبطال الفئة الثانية</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MAIN_HEROES.filter(hero => hero.tier === 2).map(hero => (
                  <div key={hero.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{hero.name}</h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm mb-1">المستوى</label>
                      <select
                          name={`heroes.${hero.id}.level`}
                          value={formData.heroes[hero.id]?.level || 0}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value={0}>غير مفتوح</option>
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-gray-700 text-sm mb-1">الهلال الأحمر</label>
                      <select
                          name={`heroes.${hero.id}.crescents`}
                          value={formData.heroes[hero.id]?.crescents || 0}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-green-700 mb-2">أبطال الفئات الأخرى</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MAIN_HEROES.filter(hero => hero.tier > 2).map(hero => (
                  <div key={hero.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{hero.name}</h3>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm mb-1">المستوى</label>
                        <select
                          name={`heroes.${hero.id}.level`}
                          value={formData.heroes[hero.id]?.level || 0}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value={0}>غير مفتوح</option>
                          <option value={1}>⭐</option>
                          <option value={2}>⭐⭐</option>
                          <option value={3}>⭐⭐⭐</option>
                          <option value={4}>⭐⭐⭐⭐</option>
                          <option value={5}>⭐⭐⭐⭐⭐</option>
                        </select>
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm mb-1">الهلال الأحمر</label>
                        <select
                          name={`heroes.${hero.id}.crescents`}
                          value={formData.heroes[hero.id]?.crescents || 0}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* الأبطال الثانويين */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">عدد الأبطال الثانويين (مستوى 3 أو أعلى)</label>
              <input
                type="number"
                name="secondaryHeroesCount"
                min="0"
                max="20"
                value={formData.secondaryHeroesCount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* سيرة الأبطال */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">عدد سير الأبطال المكتملة</label>
              <input
                type="number"
                name="heroStoryCount"
                min="0"
                max="10"
                value={formData.heroStoryCount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">أدخل عدد سير الأبطال التي أكملتها (كل سيرة مكتملة تضيف قيمة للقلعة)</p>
            </div>
          </div>

          {/* العتاد والموارد */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-purple-800 border-b pb-2">العتاد والموارد</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">نوع العتاد</label>
                <select
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {EQUIPMENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">عدد الأختام الذهبية</label>
                <input
                  type="number"
                  name="goldSeals"
                  min="0"
                  value={formData.goldSeals}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">احتياطي الجنود (بالمليون)</label>
                <input
                  type="number"
                  name="reservesMillions"
                  min="0"
                  step="0.5"
                  value={formData.reservesMillions}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">الإشعال (بالمليون)</label>
                <input
                  type="number"
                  name="ignitionMillions"
                  min="0"
                  step="0.5"
                  value={formData.ignitionMillions}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">نقاط العلوم (بالمليون)</label>
                <input
                  type="number"
                  name="sciencePoints"
                  min="0"
                  step="1"
                  value={formData.sciencePoints}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* خيارات إضافية */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasAccelerators"
                  name="hasAccelerators"
                  checked={formData.hasAccelerators}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasAccelerators" className="mr-2 text-gray-700">تسريعات جيدة</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasResources"
                  name="hasResources"
                  checked={formData.hasResources}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hasResources" className="mr-2 text-gray-700">موارد جيدة</label>
              </div>
            </div>
          </div>

          {/* الفيالق ونوع الربط (إضافة جديدة) */}
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-purple-800 border-b pb-2">الفيالق ونوع الربط</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">نوع الربط</label>
                <select
                  name="linkType"
                  value={formData.linkType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LINK_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">عدد المظاهر النادرة</label>
                <input
                  type="number"
                  name="rareSkins"
                  min="0"
                  value={formData.rareSkins}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى فيلق المشاة</label>
                <select
                  name="legionInfantry"
                  value={formData.legionInfantry}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEGION_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى فيلق الفرسان</label>
                <select
                  name="legionCavalry"
                  value={formData.legionCavalry}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEGION_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى فيلق الرماة</label>
                <select
                  name="legionArchers"
                  value={formData.legionArchers}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEGION_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">مستوى فيلق العجلات</label>
                <select
                  name="legionChariots"
                  value={formData.legionChariots}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {LEGION_LEVELS.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">فيلق العجلات الحربية (الوحدة الرابعة)</p>
              </div>
            </div>
          </div>

          {/* ميزات إضافية */}
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-amber-800 border-b pb-2">ميزات إضافية</h2>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">أي ميزات إضافية للقلعة (اختياري)</label>
              <textarea
                name="extraFeatures"
                value={formData.extraFeatures}
                onChange={handleChange}
                placeholder="مثل: مظاهر نادرة، معدات ذهبية كاملة، حيوانات نادرة، الخ..."
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
              ></textarea>
            </div>
          </div>

          {/* زر التقييم */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-3 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg"
            >
              حساب قيمة القلعة
            </button>
          </div>
        </form>
      </div>

      {/* نتيجة التقييم */}
      {valuation.submitted && (
        <div id="valuation-result" className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg rounded-lg p-6 animate-fadeIn">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">نتيجة تقييم القلعة</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-1">السعر المقدر</h3>
              <p className="text-3xl font-bold text-green-600">${valuation.basePrice}</p>
              <p className="text-sm text-gray-500">فئة القلعة: {valuation.tierName}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-1">سعر البيع السريع</h3>
              <p className="text-2xl font-bold text-amber-600">${valuation.quickSalePrice}</p>
              <p className="text-sm text-gray-500">85% من السعر الأساسي</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-1/3 text-center">
              <h3 className="text-lg font-medium text-gray-600 mb-1">السعر الممتاز</h3>
              <p className="text-2xl font-bold text-blue-600">${valuation.premiumPrice}</p>
              <p className="text-sm text-gray-500">115% من السعر الأساسي</p>
            </div>
          </div>
          
          {/* التقرير المفصل */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6" dangerouslySetInnerHTML={{ __html: valuation.report }} />
          
          {/* أزرار المشاركة */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <button 
              onClick={() => shareResult('twitter')}
              className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#0d8bd9] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
              </svg>
              مشاركة على تويتر
            </button>
            
            <button 
              onClick={() => shareResult('facebook')}
              className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-md hover:bg-[#0d66d0] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              مشاركة على فيسبوك
            </button>
            
            <button 
              onClick={() => shareResult('whatsapp')}
              className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-md hover:bg-[#20bd5a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
              مشاركة على واتساب
            </button>
            
            <button 
              onClick={saveValuation}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
              </svg>
              حفظ التقييم
            </button>
          </div>
          
          {/* إضافة قسم الإحصائيات المفصلة */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-bold mb-3 text-gray-700 border-b pb-2">إحصائيات التقييم المفصلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة الهيبة الأساسية:</p>
                <p className="text-lg">${valuation.details.prestigeValue}</p>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة الأبطال:</p>
                <p className="text-lg">${valuation.details.heroesValue}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة العتاد:</p>
                <p className="text-lg">${valuation.details.equipmentValue}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة الإضافات:</p>
                <p className="text-lg">${valuation.details.extrasValue}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة الفيالق:</p>
                <p className="text-lg">${valuation.details.legionsValue}</p>
                <p className="text-xs text-gray-500">بما فيها العجلات الحربية</p>
              </div>
              <div className="bg-pink-50 p-3 rounded">
                <p className="font-bold text-gray-700">قيمة المظاهر النادرة:</p>
                <p className="text-lg">${valuation.details.rareSkins}</p>
              </div>
          </div>
          </div>
          
          {/* قسم القلاع المقترحة */}
          <div className="bg-blue-50 rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-bold mb-4 text-blue-800 border-b pb-2">اقتراحات قلاع مشابهة</h3>
            <p className="text-gray-700 mb-4">
              بناءً على القيمة المقدرة لقلعتك، يمكنك استعراض قلاع متاحة للبيع بقيمة مماثلة:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* اقتراح قلعة 1 */}
              <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏰</span>
                  <div>
                    <h4 className="font-bold">قلعة هيبة {formData.prestigeLevel}</h4>
                    <p className="text-sm text-gray-600">${Math.round(valuation.basePrice * 0.9)}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">قلعة جاهزة للقتال بمواصفات مشابهة لقلعتك</p>
                <Link href={`/castles?price=${Math.round(valuation.basePrice * 0.9)}&prestige=${formData.prestigeLevel}`} className="text-blue-600 text-sm font-medium hover:underline">
                  عرض التفاصيل &larr;
                </Link>
              </div>
              
              {/* اقتراح قلعة 2 */}
              <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏰</span>
                  <div>
                    <h4 className="font-bold">قلعة هيبة {Math.min(formData.prestigeLevel + 1, 5)}</h4>
                    <p className="text-sm text-gray-600">${Math.round(valuation.basePrice * 1.3)}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">قلعة ذات مستوى هيبة أعلى بقليل من قلعتك</p>
                <Link href={`/castles?price=${Math.round(valuation.basePrice * 1.3)}&prestige=${Math.min(formData.prestigeLevel + 1, 5)}`} className="text-blue-600 text-sm font-medium hover:underline">
                  عرض التفاصيل &larr;
                </Link>
              </div>
              
              {/* اقتراح قلعة 3 */}
              <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚔️</span>
                  <div>
                    <h4 className="font-bold">قلعة حربية متقدمة</h4>
                    <p className="text-sm text-gray-600">${Math.round(valuation.basePrice * 1.1)}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">قلعة مجهزة للحروب وذات إشعال قوي</p>
                <Link href="/castles" className="text-blue-600 text-sm font-medium hover:underline">
                  عرض التفاصيل &larr;
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                زيارة منتدى الفاتحون
              </Link>
              <Link href="/castles" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2">
                <span>استعراض القلاع المتاحة</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* إضافة قسم روابط الأدوات */}
      <div className="flex justify-center gap-4 mb-10">
        <a 
          href="/castle-valuation/data-collector" 
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          نظام جمع بيانات القلاع
        </a>
        
        <a 
          href="/castle-valuation/calibration" 
          className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          معايرة النظام والتحقق من الدقة
        </a>
      </div>
      
      {/* شرح نظام التقييم المطور */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">نظام تقييم القلاع المطور</h2>
        <p className="text-gray-700 mb-4">
          يستخدم نظام تقييم قلاع الفاتحون المطور نموذجًا متقدمًا يعتمد على تحليل بيانات حقيقية للقلاع في السوق. تم تحديث وضبط النظام ليقدم تقييمات أكثر دقة ومطابقة لأسعار السوق الحالية.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-blue-800">العوامل الرئيسية في التقييم المطور</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>مستوى الهيبة (أساس التقييم)</li>
              <li>الأبطال ومستوياتهم وأهلتهم</li>
              <li>العتاد ونوعه</li>
              <li>نقاط العلوم والاحتياطي والإشعال</li>
              <li>نوع الربط (IGG فقط، عادي، متعدد)</li>
              <li>مستويات الفيالق (المشاة، الفرسان، الرماة، العجلات)</li>
              <li>المظاهر النادرة والإطارات المميزة</li>
              <li>سير الأبطال المكتملة</li>
              <li>الموارد والتسريعات</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-green-800">مزايا النظام المطور</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>دقة عالية في تقدير الأسعار الواقعية للقلاع</li>
              <li>شرائح أسعار متعددة (سريع، عادل، ممتاز)</li>
              <li>تصنيف القلاع (اقتصادية، متوسطة، مميزة، فاخرة، ملكية)</li>
              <li>توصيات للبيع واقتراحات للتحسين</li>
              <li>ضبط أفضل للأسعار وفق معايير السوق الحالية</li>
              <li>مبني على تحليل +200 قلعة حقيقية من السوق</li>
              <li>دعم للأبطال الجدد مثل قايتباي وهارون وبارون</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2 text-amber-800">نصائح لزيادة قيمة قلعتك</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>ركز على ترقية الأبطال الأساسيين إلى المستوى 5</li>
              <li>احرص على الحصول على الهلال الأحمر للأبطال الرئيسيين</li>
              <li>طور العتاد إلى المستوى البنفسجي ثم الذهبي</li>
              <li>اجمع الأختام الذهبية (القيمة تزيد كثيرًا فوق 100 ختم)</li>
              <li>أكمل سير الأبطال لزيادة قيمة القلعة</li>
            </ul>
            <ul className="list-disc list-inside space-y-1">
              <li>زد من احتياطي الجنود (كل مليون يضيف قيمة)</li>
              <li>طور العلوم (خاصة فوق 150 مليون)</li>
              <li>طور فيالق متنوعة (المشاة، الفرسان، العجلات)</li>
              <li>حافظ على ربط IGG فقط للحصول على قيمة أعلى</li>
              <li>اجمع المظاهر النادرة والإطارات المميزة</li>
            </ul>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center italic mb-4">
          ملاحظة: يتم تحديث معادلات التقييم دوريًا بناءً على تغيرات السوق وأسعار القلاع في لعبة الفاتحون. آخر تحديث: يونيو 2025
        </p>
      </div>
      
      {/* أنماط CSS */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 