/**
 * نظام جمع وتحليل بيانات قلاع الفاتحون من مجموعات تلجرام
 * هذا النظام يسهل عملية جمع وتحليل إعلانات القلاع من المجموعات لتحسين دقة التقييم
 */

// نموذج بيانات القلعة
class CastleData {
  constructor() {
    this.prestigeLevel = 0;
    this.price = 0;
    this.heroes = {}; // قاموس للأبطال: {heroId: {level, crescents}}
    this.equipmentType = 0;
    this.goldSeals = 0;
    this.reservesMillions = 0;
    this.ignitionMillions = 0;
    this.sciencePoints = 0;
    this.accelerators = 0;
    this.resources = 0;
    this.linkType = 2; // افتراضي: ربط عادي
    this.legions = {}; // {infantry: 0, cavalry: 0, archers: 0, chariots: 0}
    this.heroStoryCount = 0;
    this.rareSkins = 0;
    this.source = ''; // مصدر البيانات (مثل: معرف الإعلان في تلجرام)
    this.collectionDate = new Date(); // تاريخ جمع البيانات
  }
}

// قاعدة بيانات جمع عينات القلاع
let castleDatabase = [];

/**
 * استخراج معلومات القلعة من نص الإعلان في تلجرام
 * @param {string} text - نص الإعلان
 * @param {string} source - معرف المصدر (مثل: رابط الرسالة)
 * @returns {CastleData|null} - بيانات القلعة المستخرجة أو null إذا فشلت العملية
 */
function extractCastleDataFromText(text, source) {
  if (!text) return null;
  
  const castle = new CastleData();
  castle.source = source;
  
  try {
    // استخراج السعر (بالدولار)
    const priceMatch = text.match(/(?:سعر|يطلب|المطلوب)\s*:?\s*\$?(\d+)/i) || 
                       text.match(/(\d+)\s*\$/) ||
                       text.match(/ب\s*(\d+)\s*دولار/);
    if (priceMatch && priceMatch[1]) {
      castle.price = parseInt(priceMatch[1], 10);
    }
    
    // استخراج مستوى الهيبة
    const prestigeMatch = text.match(/هيبة?\s*(\d+)/i) || 
                         text.match(/قلعة (\d+)/i) ||
                         text.match(/جنود (\d+)/i);
    if (prestigeMatch && prestigeMatch[1]) {
      // تحويل رقم الهيبة/القلعة/الجنود إلى مستوى الهيبة المناسب
      const level = parseInt(prestigeMatch[1], 10);
      if (text.includes('هيبة')) {
        castle.prestigeLevel = Math.min(Math.max(level, 0), 5);
      } else if (text.includes('قلعة')) {
        castle.prestigeLevel = 0; // قلعة عادية
      } else if (text.includes('جنود')) {
        castle.prestigeLevel = 1; // جنود 1
      }
    }
    
    // استخراج معلومات الأبطال
    const heroes = ['صلاح', 'فاتح', 'مختار', 'قطز', 'برقوق', 'مالك', 'حليمة',
                   'قايتباي', 'هارون', 'بارون', 'بوراك', 'اسكندر'];
    const heroIds = ['salah', 'fatih', 'mukhtar', 'qutuz', 'barquq', 'malik', 'halima',
                    'qaitbay', 'harun', 'baron', 'burak', 'alexander'];
                    
    heroes.forEach((heroName, index) => {
      const heroId = heroIds[index];
      const levelMatch = new RegExp(heroName + '\\s*(\\d+)', 'i').exec(text);
      if (levelMatch && levelMatch[1]) {
        const level = parseInt(levelMatch[1], 10);
        if (level > 0 && level <= 5) {
          if (!castle.heroes[heroId]) {
            castle.heroes[heroId] = { level: 0, crescents: 0 };
          }
          castle.heroes[heroId].level = level;
        }
      }
      
      // البحث عن الأهلة
      const crescentMatch = new RegExp(heroName + '[^\\d]+(\\d+)\\s*هلال', 'i').exec(text) ||
                           new RegExp(heroName + '[^\\d]+(\\d+)\\s*اهله', 'i').exec(text);
      if (crescentMatch && crescentMatch[1]) {
        const crescents = parseInt(crescentMatch[1], 10);
        if (crescents > 0 && crescents <= 3) {
          if (!castle.heroes[heroId]) {
            castle.heroes[heroId] = { level: 5, crescents: 0 }; // افتراضي مستوى 5 إذا تم ذكر الأهلة فقط
          }
          castle.heroes[heroId].crescents = crescents;
        }
      }
    });
    
    // استخراج معلومات العتاد
    if (text.includes('ذهبي كامل') || text.includes('كامل ذهبي')) {
      castle.equipmentType = 6; // ذهبي كامل
    } else if (text.includes('معظمه ذهبي') || text.includes('أغلبه ذهبي')) {
      castle.equipmentType = 5; // معظمه ذهبي
    } else if (text.includes('2-3 ذهبي') || text.includes('3 قطع ذهبية')) {
      castle.equipmentType = 4; // 2-3 قطع ذهبية
    } else if (text.includes('قطعة ذهبية') || text.includes('ذهبي واحد')) {
      castle.equipmentType = 3; // بنفسجي + قطعة ذهبية
    } else if (text.includes('بنفسجي')) {
      castle.equipmentType = 2; // بنفسجي
    } else if (text.includes('أزرق')) {
      castle.equipmentType = 1; // أزرق
    }
    
    // استخراج معلومات الفيالق
    const legionTypes = ['مشاة', 'فرسان', 'رماة', 'عجلات'];
    const legionKeys = ['infantry', 'cavalry', 'archers', 'chariots'];
    
    legionTypes.forEach((legionType, index) => {
      const legionKey = legionKeys[index];
      const legionMatch = new RegExp('فيلق\\s*' + legionType + '\\s*(\\d+)', 'i').exec(text) ||
                         new RegExp(legionType + '\\s*(\\d+)', 'i').exec(text);
      if (legionMatch && legionMatch[1]) {
        const level = parseInt(legionMatch[1], 10);
        if (level > 0 && level <= 5) {
          if (!castle.legions[legionKey]) {
            castle.legions[legionKey] = 0;
          }
          castle.legions[legionKey] = level;
        }
      }
    });
    
    // استخراج معلومات الربط
    if (text.includes('IGG فقط') || text.includes('ربط IGG')) {
      castle.linkType = 1; // IGG فقط
    } else if (text.includes('ربط متعدد') || text.includes('متعدد الربط')) {
      castle.linkType = 3; // ربط متعدد
    }
    
    // استخراج معلومات المظاهر النادرة
    const rareSkinMatch = text.match(/(\d+)\s*مظهر/) || 
                         text.match(/مظهر\s*(\d+)/) ||
                         text.match(/(\d+)\s*إطار/) ||
                         text.match(/إطار\s*(\d+)/);
    if (rareSkinMatch && rareSkinMatch[1]) {
      castle.rareSkins = parseInt(rareSkinMatch[1], 10);
    } else if (text.includes('مظهر نادر') || text.includes('إطار نادر')) {
      castle.rareSkins = 1; // على الأقل مظهر واحد
    }
    
    // معلومات إضافية
    // الاحتياطي
    const reservesMatch = text.match(/احتياط\s*(\d+(\.\d+)?)/i) || 
                         text.match(/احتياطي\s*(\d+(\.\d+)?)/i);
    if (reservesMatch && reservesMatch[1]) {
      castle.reservesMillions = parseFloat(reservesMatch[1]);
    }
    
    // الإشعال
    const ignitionMatch = text.match(/اشعال\s*(\d+(\.\d+)?)/i) || 
                         text.match(/إشعال\s*(\d+(\.\d+)?)/i);
    if (ignitionMatch && ignitionMatch[1]) {
      castle.ignitionMillions = parseFloat(ignitionMatch[1]);
    }
    
    // العلوم
    const scienceMatch = text.match(/علوم\s*(\d+(\.\d+)?)/i) || 
                         text.match(/علم\s*(\d+(\.\d+)?)/i);
    if (scienceMatch && scienceMatch[1]) {
      castle.sciencePoints = parseFloat(scienceMatch[1]);
    }
    
    // عدد سير الأبطال
    const storyMatch = text.match(/(\d+)\s*سيرة/) || 
                      text.match(/سيرة\s*(\d+)/);
    if (storyMatch && storyMatch[1]) {
      castle.heroStoryCount = parseInt(storyMatch[1], 10);
    }
    
    return castle;
  } catch (error) {
    console.error('Error extracting castle data:', error);
    return null;
  }
}

/**
 * إضافة بيانات قلعة إلى قاعدة البيانات
 * @param {CastleData} castleData - بيانات القلعة
 */
function addCastleToDatabase(castleData) {
  if (!castleData) return;
  
  // التحقق من أن القلعة لديها معلومات كافية
  if (castleData.price <= 0) return; // يجب أن يكون هناك سعر
  
  // إضافة القلعة إلى قاعدة البيانات
  castleDatabase.push(castleData);
  
  // حفظ قاعدة البيانات (يمكن تنفيذ هذا بطريقة أفضل في التطبيق الحقيقي)
  saveCastleDatabase();
}

/**
 * استيراد مجموعة من الإعلانات دفعة واحدة
 * @param {Array<{text: string, source: string}>} advertisements - قائمة الإعلانات
 * @returns {number} - عدد الإعلانات التي تمت إضافتها بنجاح
 */
function importBulkAdvertisements(advertisements) {
  if (!Array.isArray(advertisements)) return 0;
  
  let successCount = 0;
  
  advertisements.forEach(ad => {
    const castleData = extractCastleDataFromText(ad.text, ad.source);
    if (castleData) {
      addCastleToDatabase(castleData);
      successCount++;
    }
  });
  
  return successCount;
}

/**
 * تحليل قاعدة البيانات لاستخراج متوسط الأسعار حسب مستوى الهيبة
 * @returns {Object} - إحصائيات الأسعار حسب مستوى الهيبة
 */
function analyzeMarketPrices() {
  const stats = {
    priceByPrestige: [
      { level: 0, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }, // قلعة 30
      { level: 1, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }, // جنود 1
      { level: 2, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }, // هيبة 2
      { level: 3, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }, // هيبة 3
      { level: 4, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }, // هيبة 4
      { level: 5, count: 0, min: Infinity, max: 0, avg: 0, median: 0 }  // هيبة 5
    ],
    totalCastles: castleDatabase.length,
    lastUpdate: new Date()
  };
  
  // جمع الأسعار حسب مستوى الهيبة
  const pricesByPrestige = [[], [], [], [], [], []];
  
  castleDatabase.forEach(castle => {
    const level = castle.prestigeLevel;
    const price = castle.price;
    
    if (level >= 0 && level <= 5 && price > 0) {
      pricesByPrestige[level].push(price);
    }
  });
  
  // حساب الإحصائيات
  pricesByPrestige.forEach((prices, level) => {
    if (prices.length === 0) return;
    
    // ترتيب الأسعار تصاعديًا لحساب الوسيط
    prices.sort((a, b) => a - b);
    
    const count = prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((sum, price) => sum + price, 0) / count;
    
    // حساب الوسيط
    let median;
    if (count % 2 === 0) {
      // عدد زوجي، متوسط القيمتين الوسطيتين
      median = (prices[count / 2 - 1] + prices[count / 2]) / 2;
    } else {
      // عدد فردي، القيمة الوسطى
      median = prices[Math.floor(count / 2)];
    }
    
    stats.priceByPrestige[level] = {
      level,
      count,
      min,
      max,
      avg: Math.round(avg),
      median: Math.round(median)
    };
  });
  
  return stats;
}

/**
 * حفظ قاعدة البيانات (يمكن استبدالها بطريقة الحفظ المناسبة للتطبيق)
 */
function saveCastleDatabase() {
  // في التطبيق الحقيقي، يمكن حفظ البيانات في قاعدة بيانات أو ملف
  // هنا نستخدم localStorage كمثال بسيط
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem('castleDatabase', JSON.stringify(castleDatabase));
    } catch (error) {
      console.error('Error saving castle database:', error);
    }
  }
}

/**
 * تحميل قاعدة البيانات
 */
function loadCastleDatabase() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const data = localStorage.getItem('castleDatabase');
      if (data) {
        castleDatabase = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading castle database:', error);
    }
  }
}

// تحميل قاعدة البيانات عند استيراد الملف
loadCastleDatabase();

// تصدير الدوال للاستخدام
export {
  CastleData,
  extractCastleDataFromText,
  addCastleToDatabase,
  importBulkAdvertisements,
  analyzeMarketPrices,
  loadCastleDatabase
}; 