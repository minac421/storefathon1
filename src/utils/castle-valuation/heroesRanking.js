/**
 * ترتيب أبطال الفاتحون حسب الأفضلية والقيمة في السوق
 * تم تحديث هذا الترتيب بناءً على البيانات الحقيقية من مجموعات التلجرام
 */

// ترتيب الأبطال حسب الأهمية والقيمة السوقية
const HEROES_RANKING = [
  {
    id: 'salah',
    name: 'صلاح الدين',
    tier: 1, // الفئة الأولى
    baseValue: 20, // القيمة الأساسية لكل مستوى
    crescentValue: 30, // قيمة الهلال الواحد
    maxLevel: 5
  },
  {
    id: 'fatih',
    name: 'الفاتح',
    tier: 1,
    baseValue: 18,
    crescentValue: 25,
    maxLevel: 5
  },
  {
    id: 'mukhtar',
    name: 'مختار',
    tier: 1,
    baseValue: 16,
    crescentValue: 22,
    maxLevel: 5
  },
  {
    id: 'qutuz',
    name: 'قطز',
    tier: 2, // الفئة الثانية
    baseValue: 14,
    crescentValue: 20,
    maxLevel: 5
  },
  {
    id: 'malik',
    name: 'مالك',
    tier: 2,
    baseValue: 12,
    crescentValue: 18,
    maxLevel: 5
  },
  {
    id: 'barquq',
    name: 'برقوق',
    tier: 2,
    baseValue: 11,
    crescentValue: 16,
    maxLevel: 5
  },
  {
    id: 'qaitbay',
    name: 'قايتباي',
    tier: 3, // الفئة الثالثة
    baseValue: 10,
    crescentValue: 15,
    maxLevel: 5
  },
  {
    id: 'harun',
    name: 'هارون',
    tier: 3,
    baseValue: 9,
    crescentValue: 14,
    maxLevel: 5
  },
  {
    id: 'baron',
    name: 'بارون',
    tier: 3,
    baseValue: 8,
    crescentValue: 12,
    maxLevel: 5
  },
  {
    id: 'burak',
    name: 'بوراك',
    tier: 4, // الفئة الرابعة
    baseValue: 7,
    crescentValue: 10,
    maxLevel: 5
  },
  {
    id: 'alexander',
    name: 'الإسكندر الأكبر',
    tier: 4,
    baseValue: 7,
    crescentValue: 10,
    maxLevel: 5
  },
  // يمكن إضافة المزيد من الأبطال هنا
  {
    id: 'halima',
    name: 'حليمة',
    tier: 4,
    baseValue: 6,
    crescentValue: 9,
    maxLevel: 5
  }
];

// الحصول على قيمة البطل بناءً على المستوى وعدد الأهلة
function calculateHeroValue(heroId, level, crescents) {
  // البحث عن البطل في القائمة
  const hero = HEROES_RANKING.find(h => h.id === heroId);
  if (!hero) return 0;
  
  // حساب القيمة الأساسية
  const baseValue = level * hero.baseValue;
  
  // إضافة قيمة الأهلة
  const crescentValue = crescents * hero.crescentValue;
  
  return baseValue + crescentValue;
}

// الحصول على قائمة الأبطال مرتبة حسب الأهمية
function getHeroesRanking() {
  return HEROES_RANKING;
}

// استخراج قائمة الأبطال حسب الفئة
function getHeroesByTier(tier) {
  return HEROES_RANKING.filter(hero => hero.tier === tier);
}

// تصدير الدوال للاستخدام
export {
  HEROES_RANKING,
  calculateHeroValue,
  getHeroesRanking,
  getHeroesByTier
}; 