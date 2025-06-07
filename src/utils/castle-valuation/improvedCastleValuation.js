/**
 * نظام تقييم قلاع الفاتحون المحسّن
 * النسخة المطورة التي تشمل المزيد من العوامل مثل نوع الربط والفيالق والمظاهر النادرة
 * تم تحديثه بناءً على بيانات حقيقية من السوق عبر تحليل 200+ قلعة
 */

import { calculateHeroValue, HEROES_RANKING } from './heroesRanking';
import { analyzeMarketPrices } from './telegramDataCollector';

/**
 * حساب سعر القلعة بناءً على المواصفات
 * @param {Object} castleData - بيانات القلعة
 * @returns {Object} نتيجة التقييم
 */
function calculateCastlePrice(castleData) {
  // الحصول على إحصائيات السوق الحالية (إذا كانت متاحة)
  let marketStats = null;
  try {
    marketStats = analyzeMarketPrices();
  } catch (error) {
    console.log('تعذر الحصول على إحصائيات السوق، سيتم استخدام القيم الافتراضية');
  }
  
  // مستوى الهيبة - الوزن الأساسي (تم ضبطه بناءً على البيانات الحقيقية)
  // تعديل قيم الأساس لتكون أكثر واقعية
  const prestigeWeights = [
    80,   // قلعة 30
    120,  // جنود 1
    200,  // هيبة 2
    350,  // هيبة 3
    600,  // هيبة 4
    1000  // هيبة 5
  ];
  
  // ضبط القيم بناءً على إحصائيات السوق إذا كانت متاحة
  if (marketStats && marketStats.priceByPrestige) {
    for (let i = 0; i < 6; i++) {
      if (marketStats.priceByPrestige[i].count > 0) {
        // استخدام وسيط الأسعار كأساس للتقييم (أكثر استقرارًا من المتوسط)
        const medianPrice = marketStats.priceByPrestige[i].median;
        if (medianPrice > 0) {
          // تعديل الوزن الأساسي مع الحفاظ على نسبة من القيمة الافتراضية
          prestigeWeights[i] = Math.round(medianPrice * 0.5); // زيادة النسبة من 40% إلى 50%
        }
      }
    }
  }
  
  const basePrice = prestigeWeights[castleData.prestigeLevel || 0];
  
  // حساب قيمة الأبطال باستخدام النموذج المحدث
  let heroesScore = 0;
  
  // الأبطال الرئيسيين بأسمائهم الكاملة
  const heroData = {
    salah: { level: castleData.salahLevel || 0, crescents: castleData.salahCrescents || 0 },
    fatih: { level: castleData.fatihLevel || 0, crescents: castleData.fatihCrescents || 0 },
    mukhtar: { level: castleData.mukhtarLevel || 0, crescents: castleData.mukhtarCrescents || 0 },
    qutuz: { level: castleData.qutuzLevel || 0, crescents: castleData.qutuzCrescents || 0 },
    barquq: { level: castleData.barquqLevel || 0, crescents: castleData.barquqCrescents || 0 },
    malik: { level: castleData.malikLevel || 0, crescents: castleData.malikCrescents || 0 },
    halima: { level: castleData.halimaLevel || 0, crescents: castleData.halimaCrescents || 0 },
    qaitbay: { level: castleData.qaitbayLevel || 0, crescents: castleData.qaitbayCrescents || 0 },
    harun: { level: castleData.harunLevel || 0, crescents: castleData.harunCrescents || 0 },
    baron: { level: castleData.baronLevel || 0, crescents: castleData.baronCrescents || 0 },
    burak: { level: castleData.burakLevel || 0, crescents: castleData.burakCrescents || 0 },
    alexander: { level: castleData.alexanderLevel || 0, crescents: castleData.alexanderCrescents || 0 }
  };
  
  // حساب قيمة كل بطل باستخدام دالة التقييم من ملف ترتيب الأبطال
  Object.entries(heroData).forEach(([heroId, hero]) => {
    heroesScore += calculateHeroValue(heroId, hero.level, hero.crescents);
  });
  
  // إضافة قيمة الأبطال الثانويين
  heroesScore += ((castleData.secondaryHeroes || 0) * 4); // تخفيض من 5 إلى 4
  
  // إضافة قيمة سير الأبطال
  heroesScore += ((castleData.heroStoryCount || 0) * 6); // زيادة من 5 إلى 6
  
  // العتاد (تعديل الأوزان)
  const equipmentWeights = [0, 12, 25, 40, 70, 100, 140]; // تعديل القيم
  const equipmentPrice = equipmentWeights[Math.min(castleData.equipmentType || 0, 6)];
  
  // الإضافات الأخرى
  const extrasPrice = (
    // الأختام الذهبية (زيادة القيمة)
    ((castleData.goldSeals || 0) * 0.6) + // زيادة من 0.5 إلى 0.6
    // بونص للأختام الكثيرة
    (castleData.goldSeals > 100 ? 20 : 0) + // بونص إضافي للأختام الكثيرة
    // الاحتياطي (تخفيض القيمة)
    ((castleData.reservesMillions || 0) * 3.5) + // تخفيض من 4 إلى 3.5
    // الإشعال (قيمة ثابتة)
    ((castleData.ignitionMillions || 0) * 5) +
    // العلوم - تطبيق منحنى متزايد
    (Math.min(castleData.sciencePoints || 0, 100) * 0.2) +
    (Math.max(0, Math.min((castleData.sciencePoints || 0) - 100, 50)) * 0.3) +
    (Math.max(0, Math.min((castleData.sciencePoints || 0) - 150, 50)) * 0.4) +
    (Math.max(0, (castleData.sciencePoints || 0) - 200) * 0.6) +
    // التسريعات والموارد (تخفيض القيمة)
    ((castleData.accelerators || 0) * 8) + // تخفيض من 10 إلى 8
    ((castleData.resources || 0) * 8) // تخفيض من 10 إلى 8
  );
  
  // إضافات الفيالق (تعديل الأوزان ليكون أكثر دقة)
  const legionWeights = [0, 15, 35, 60, 90, 130]; // تعديل القيم
  const legionsPrice = (
    // فيلق المشاة (الأكثر قيمة)
    legionWeights[Math.min(castleData.legionInfantry || 0, 5)] +
    // فيلق الفرسان
    legionWeights[Math.min(castleData.legionCavalry || 0, 5)] * 0.85 + // زيادة من 0.8 إلى 0.85
    // فيلق الرماة
    legionWeights[Math.min(castleData.legionArchers || 0, 5)] * 0.75 + // زيادة من 0.7 إلى 0.75
    // فيلق العجلات
    legionWeights[Math.min(castleData.legionChariots || 0, 5)] * 0.95 // زيادة من 0.9 إلى 0.95
  );
  
  // عامل نوع الربط (تعديل التأثير)
  // 1 = IGG فقط (أفضل)، 2 = ربط عادي، 3 = ربط متعدد (أقل قيمة)
  let linkTypeFactor = 1.0;
  if (castleData.linkType === 1) { // IGG فقط
    linkTypeFactor = 1.08; // زيادة من 1.05 إلى 1.08
  } else if (castleData.linkType === 3) { // ربط متعدد
    linkTypeFactor = 0.92; // تخفيض من 0.95 إلى 0.92
  }
  
  // عامل المظاهر النادرة (زيادة القيمة)
  const rareSkins = (castleData.rareSkins || 0) * 35; // زيادة من 30 إلى 35
  
  // حساب السعر النهائي
  let subtotal = basePrice + heroesScore + equipmentPrice + extrasPrice + legionsPrice + rareSkins;
  
  // تطبيق عامل نوع الربط
  let totalPrice = subtotal * linkTypeFactor;
  
  // تصحيح للقلاع الغالية (تعديل الحد والمعامل)
  if (totalPrice > 1200) { // تخفيض من 1500 إلى 1200
    totalPrice = 1200 + (totalPrice - 1200) * 0.85; // تعديل من 0.8 إلى 0.85
  }
  
  // حساب نطاق السعر (±10%)
  const minPrice = Math.floor(totalPrice * 0.9);
  const maxPrice = Math.floor(totalPrice * 1.1);
  
  // حساب سعر البيع السريع (85% من السعر الأساسي)
  const quickSalePrice = Math.floor(totalPrice * 0.85);
  
  // حساب سعر البيع الممتاز (115% من السعر الأساسي)
  const premiumPrice = Math.floor(totalPrice * 1.15);
  
  return {
    basePrice: Math.floor(totalPrice),
    minPrice,
    maxPrice,
    quickSalePrice,
    premiumPrice,
    prestigeValue: basePrice,
    heroesValue: Math.floor(heroesScore),
    equipmentValue: equipmentPrice,
    extrasValue: Math.floor(extrasPrice),
    legionsValue: Math.floor(legionsPrice),
    rareSkins: Math.floor(rareSkins),
    linkTypeFactor
  };
}

/**
 * تحديد فئة القلعة بناء على سعرها
 * @param {Number} price - سعر القلعة المقدر
 * @returns {String} فئة القلعة
 */
function getCastleTier(price) {
  // تعديل فئات القلاع لتكون أكثر واقعية
  if (price < 150) {
    return "اقتصادية";
  } else if (price < 350) {
    return "متوسطة";
  } else if (price < 700) {
    return "مميزة";
  } else if (price < 1200) {
    return "فاخرة";
  } else {
    return "ملكية";
  }
}

/**
 * تقديم توصيات للبيع أو التحسين
 * @param {Object} castleData - بيانات القلعة
 * @param {Object} valuationResult - نتائج التقييم
 * @returns {Object} توصيات للبيع أو التحسين
 */
function getSaleRecommendation(castleData, valuationResult) {
  const prestigeLevel = castleData.prestigeLevel || 0;
  const price = valuationResult.basePrice;
  
  const recommendations = [];
  const improvements = [];
  
  // تحليل الفيالق
  if ((castleData.legionInfantry || 0) < 4 && prestigeLevel >= 2) {
    improvements.push("تطوير فيلق المشاة لمستوى 4 أو أعلى (+90$)");
  }
  
  if ((castleData.legionCavalry || 0) < 3 && prestigeLevel >= 3) {
    improvements.push("تطوير فيلق الفرسان لمستوى 3 أو أعلى (+60$)");
  }
  
  if ((castleData.legionChariots || 0) < 2 && prestigeLevel >= 3) {
    improvements.push("تطوير فيلق العجلات لمستوى 2 أو أعلى (+35$)");
  }
  
  // تحليل العتاد
  if ((castleData.equipmentType || 0) < 3 && prestigeLevel >= 2) {
    improvements.push("تحسين العتاد بإضافة قطع ذهبية (+40-70$)");
  }
  
  // تحليل الأبطال
  // صلاح الدين (الأهم)
  if ((castleData.salahLevel === 5 && (castleData.salahCrescents || 0) < 1) || 
      (castleData.salahLevel < 5 && castleData.salahLevel >= 3)) {
    improvements.push("تطوير صلاح الدين إلى المستوى 5 (+30$)");
  }
  
  // الفاتح (ثاني أهم بطل)
  if ((castleData.fatihLevel === 5 && (castleData.fatihCrescents || 0) < 1) || 
      (castleData.fatihLevel < 5 && castleData.fatihLevel >= 3)) {
    improvements.push("تطوير الفاتح إلى المستوى 5 (+25$)");
  }
  
  // تحليل سيرة الأبطال
  if ((castleData.heroStoryCount || 0) < 3 && prestigeLevel >= 2) {
    improvements.push("إكمال المزيد من سير الأبطال (+6$ لكل سيرة مكتملة)");
  }
  
  // توصيات البيع
  if (castleData.linkType === 1) { // IGG فقط
    recommendations.push("الربط نوع IGG فقط (ميزة للبيع، أبرزها في الإعلان)");
  }
  
  if ((castleData.rareSkins || 0) >= 2) {
    recommendations.push("المظاهر النادرة تزيد من قيمة القلعة (+35$ لكل مظهر)");
  }
  
  if (valuationResult.legionsValue > 180) {
    recommendations.push("الفيالق المتقدمة تزيد من قيمة القلعة بشكل كبير");
  }
  
  if ((castleData.heroStoryCount || 0) >= 5) {
    recommendations.push("سير الأبطال المكتملة تعطي ميزة إضافية للقلعة");
  }
  
  // توصيات خاصة بالأبطال الجدد
  if ((castleData.qaitbayLevel || 0) >= 4 || (castleData.harunLevel || 0) >= 4) {
    recommendations.push("وجود قايتباي أو هارون بمستوى متقدم يزيد من قيمة القلعة");
  }
  
  // توصية الأختام الذهبية
  if ((castleData.goldSeals || 0) > 100) {
    recommendations.push("الأختام الذهبية العديدة تعتبر ميزة جذابة للمشترين");
  }
  
  // سعر البيع المقترح
  let salePrice = price;
  if (improvements.length <= 1) {
    salePrice = valuationResult.premiumPrice;
    recommendations.push(`يمكن عرض القلعة بسعر ${salePrice}$ (سعر ممتاز)`);
  } else {
    recommendations.push(`عرض بالسعر العادل ${price}$ أو تطبيق التحسينات المقترحة أولاً`);
  }
  
  return {
    priceRecommendation: salePrice,
    saleTips: recommendations,
    improvementSuggestions: improvements
  };
}

/**
 * تحويل بيانات النموذج إلى الصيغة المطلوبة للتقييم
 * @param {Object} formData - بيانات النموذج
 * @returns {Object} بيانات معدة للتقييم
 */
function prepareDataForValuation(formData) {
  // تحويل بيانات النموذج إلى الصيغة المطلوبة للتقييم
  const data = {
    prestigeLevel: formData.prestigeLevel,
    equipmentType: formData.equipmentType || 0,
    goldSeals: formData.goldSeals || 0,
    reservesMillions: formData.reservesMillions || 0,
    ignitionMillions: formData.ignitionMillions || 0,
    sciencePoints: formData.sciencePoints || 0,
    accelerators: formData.hasAccelerators ? 1 : 0,
    resources: formData.hasResources ? 1 : 0,
    linkType: formData.linkType || 2,
    legionInfantry: formData.legionInfantry || 0,
    legionCavalry: formData.legionCavalry || 0,
    legionArchers: formData.legionArchers || 0,
    legionChariots: formData.legionChariots || 0,
    rareSkins: formData.rareSkins || 0,
    secondaryHeroes: formData.secondaryHeroesCount || 0,
    heroStoryCount: formData.heroStoryCount || 0
  };
  
  // إضافة بيانات الأبطال
  if (formData.heroes) {
    // الأبطال الأساسيين
    const heroIds = ['salah', 'fatih', 'mukhtar', 'qutuz', 'barquq', 'malik', 'halima',
                     'qaitbay', 'harun', 'baron', 'burak', 'alexander'];
    
    heroIds.forEach(heroId => {
      if (formData.heroes[heroId]) {
        data[`${heroId}Level`] = formData.heroes[heroId].level || 0;
        data[`${heroId}Crescents`] = formData.heroes[heroId].crescents || 0;
      }
    });
  }
  
  return data;
}

/**
 * يقوم بإنشاء تقرير مفصل عن تقييم القلعة
 * @param {Object} valuationResult - نتيجة التقييم
 * @param {Object} castleData - بيانات القلعة
 * @returns {String} التقرير المفصل
 */
function generateValuationReport(valuationResult, castleData) {
  const prestigeNames = ["قلعة 30", "جنود 1", "هيبة 2", "هيبة 3", "هيبة 4", "هيبة 5"];
  const equipmentTypes = ["لا يوجد", "أزرق", "بنفسجي", "بنفسجي+ذهبي", "2-3 ذهبي", "معظمه ذهبي", "ذهبي كامل"];
  const linkTypes = ["غير معروف", "IGG فقط", "ربط عادي", "ربط متعدد"];
  const castleTier = getCastleTier(valuationResult.basePrice);
  
  // الحصول على توصيات البيع
  const recommendations = getSaleRecommendation(castleData, valuationResult);
  
  const report = `
    <div class="valuation-report">
      <h3 class="text-xl font-bold mb-4">تقرير تقييم القلعة</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">معلومات أساسية</h4>
          <p>المستوى: ${prestigeNames[castleData.prestigeLevel]}</p>
          <p>نوع العتاد: ${equipmentTypes[castleData.equipmentType]}</p>
          <p>نوع الربط: ${linkTypes[castleData.linkType]}</p>
          <p>مستوى فيلق المشاة: ${castleData.legionInfantry || 0}</p>
          <p>مستوى فيلق الفرسان: ${castleData.legionCavalry || 0}</p>
          <p>مستوى فيلق العجلات: ${castleData.legionChariots || 0}</p>
          <p>سير الأبطال المكتملة: ${castleData.heroStoryCount || 0}</p>
          <p>أختام ذهبية: ${castleData.goldSeals}</p>
          <p>مظاهر نادرة: ${castleData.rareSkins || 0}</p>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-semibold mb-2">تفاصيل التقييم</h4>
          <p>قيمة المستوى الأساسية: $${valuationResult.prestigeValue}</p>
          <p>قيمة الأبطال: $${valuationResult.heroesValue}</p>
          <p>قيمة العتاد: $${valuationResult.equipmentValue}</p>
          <p>قيمة الإضافات: $${valuationResult.extrasValue}</p>
          <p>قيمة الفيالق: $${valuationResult.legionsValue}</p>
          <p>قيمة المظاهر النادرة: $${valuationResult.rareSkins}</p>
          <p>عامل نوع الربط: ${valuationResult.linkTypeFactor.toFixed(2)}x</p>
        </div>
      </div>
      
      <div class="bg-yellow-50 p-4 rounded-lg mb-4">
        <h4 class="font-semibold mb-2">النتيجة النهائية</h4>
        <p class="text-lg">السعر المقدر: <span class="font-bold text-green-700">$${valuationResult.basePrice}</span></p>
        <p>النطاق السعري: $${valuationResult.minPrice} - $${valuationResult.maxPrice}</p>
        <p>سعر البيع السريع: <span class="text-red-500">$${valuationResult.quickSalePrice}</span></p>
        <p>سعر البيع الممتاز: <span class="text-green-600">$${valuationResult.premiumPrice}</span></p>
        <p class="mt-2">فئة القلعة: <span class="font-bold">${castleTier}</span></p>
      </div>
      
      <div class="bg-indigo-50 p-4 rounded-lg mb-4">
        <h4 class="font-semibold mb-2">توصيات البيع</h4>
        <ul class="list-disc list-inside space-y-1">
          ${recommendations.saleTips.map(tip => `<li class="text-gray-700">${tip}</li>`).join('')}
        </ul>
        
        ${recommendations.improvementSuggestions.length > 0 ? `
          <h4 class="font-semibold mt-4 mb-2">اقتراحات لتحسين القيمة</h4>
          <ul class="list-disc list-inside space-y-1">
            ${recommendations.improvementSuggestions.map(suggestion => `<li class="text-gray-700">${suggestion}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
      
      <p class="text-sm text-gray-600 mt-2">* هذا التقييم تقديري ويعتمد على أسعار السوق الحالية</p>
    </div>
  `;
  
  return report;
}

/**
 * وظيفة معايرة واختبار للتحقق من دقة النظام
 * @returns {Array} نتائج المعايرة
 */
function calibrateSystem() {
  // قلاع نموذجية للمعايرة
  const testCastles = [
    {
      name: "قلعة بسيطة (150$)",
      data: {
        prestigeLevel: 0, // قلعة 30
        salahLevel: 4,
        salahCrescents: 0,
        fatihLevel: 3,
        fatihCrescents: 0,
        mukhtarLevel: 3,
        mukhtarCrescents: 0,
        qutuzLevel: 0,
        barquqLevel: 0,
        equipmentType: 1, // أزرق
        secondaryHeroes: 0,
        heroStoryCount: 0,
        legionInfantry: 0,
        reservesMillions: 2,
        ignitionMillions: 0,
        sciencePoints: 0,
        linkType: 2 // عادي
      },
      expectedPrice: 150, // سعر متوقع تقريبي
    },
    {
      name: "قلعة متوسطة (350$)",
      data: {
        prestigeLevel: 2, // هيبة 2
        salahLevel: 5,
        salahCrescents: 0,
        fatihLevel: 5,
        fatihCrescents: 0,
        mukhtarLevel: 4,
        mukhtarCrescents: 0,
        qutuzLevel: 4,
        barquqLevel: 0,
        equipmentType: 2, // بنفسجي
        secondaryHeroes: 3,
        heroStoryCount: 0,
        legionInfantry: 0,
        reservesMillions: 5,
        ignitionMillions: 2,
        sciencePoints: 150,
        linkType: 2 // عادي
      },
      expectedPrice: 350, // سعر متوقع تقريبي
    },
    {
      name: "قلعة مميزة (700$)",
      data: {
        prestigeLevel: 3, // هيبة 3
        salahLevel: 5,
        salahCrescents: 0,
        fatihLevel: 5,
        fatihCrescents: 0,
        mukhtarLevel: 5,
        mukhtarCrescents: 0,
        qutuzLevel: 5,
        barquqLevel: 4,
        equipmentType: 3, // بنفسجي + ذهبي
        secondaryHeroes: 4,
        heroStoryCount: 2,
        legionInfantry: 3,
        legionCavalry: 2,
        reservesMillions: 8,
        ignitionMillions: 5,
        sciencePoints: 180,
        linkType: 2 // عادي
      },
      expectedPrice: 700, // سعر متوقع تقريبي
    },
    {
      name: "قلعة فاخرة (1100$)",
      data: {
        prestigeLevel: 4, // هيبة 4
        salahLevel: 5,
        salahCrescents: 1,
        fatihLevel: 5,
        fatihCrescents: 0,
        mukhtarLevel: 5,
        mukhtarCrescents: 0,
        qutuzLevel: 5,
        barquqLevel: 5,
        malikLevel: 5,
        equipmentType: 4, // 2-3 ذهبي
        secondaryHeroes: 6,
        heroStoryCount: 3,
        legionInfantry: 4,
        legionCavalry: 3,
        legionArchers: 2,
        rareSkins: 2,
        reservesMillions: 10,
        ignitionMillions: 8,
        sciencePoints: 200,
        linkType: 1 // IGG فقط
      },
      expectedPrice: 1100, // سعر متوقع تقريبي
    }
  ];
  
  // اختبار وتصحيح
  const results = testCastles.map(castle => {
    const valuation = calculateCastlePrice(castle.data);
    return {
      name: castle.name,
      expectedPrice: castle.expectedPrice,
      calculatedPrice: valuation.basePrice,
      difference: valuation.basePrice - castle.expectedPrice,
      differencePercent: ((valuation.basePrice - castle.expectedPrice) / castle.expectedPrice * 100).toFixed(1) + '%'
    };
  });
  
  return results;
}

// تصدير الدوال للاستخدام
export { 
  calculateCastlePrice, 
  prepareDataForValuation, 
  generateValuationReport, 
  getCastleTier, 
  getSaleRecommendation,
  calibrateSystem
}; 