// مجموعة من الصور المتاحة للاختيار - من لعبة فاتحون
export const AVAILABLE_AVATARS = [
  { id: 8, src: '/images/avatars/hero_icon_8_wake.png', alt: 'المحارب الأحمر' },
  { id: 6, src: '/images/avatars/hero_icon_6_wake.png', alt: 'قائد الجيش' },
  { id: 3, src: '/images/avatars/hero_icon_3_wake.png', alt: 'الفارس الأزرق' },
  { id: 32, src: '/images/avatars/hero_icon_32_wake.png', alt: 'الساحر' },
  { id: 33, src: '/images/avatars/hero_icon_33_wake.png', alt: 'القناص' },
  { id: 34, src: '/images/avatars/hero_icon_34_wake.png', alt: 'المقاتل الأسود' },
  { id: 35, src: '/images/avatars/hero_icon_35_wake.png', alt: 'الكاهن' },
  { id: 36, src: '/images/avatars/hero_icon_36_wake.png', alt: 'بطل الحرب' },
  { id: 37, src: '/images/avatars/hero_icon_37_wake.png', alt: 'المحارب الأسطوري' },
  { id: 38, src: '/images/avatars/hero_icon_38_wake.png', alt: 'فارس الظلام' },
  { id: 39, src: '/images/avatars/hero_icon_39_wake.png', alt: 'المدافع الذهبي' },
  { id: 40, src: '/images/avatars/hero_icon_40_wake.png', alt: 'صانع النار' },
  { id: 41, src: '/images/avatars/hero_icon_41_wake.png', alt: 'الملكة' },
  { id: 42, src: '/images/avatars/hero_icon_42_wake.png', alt: 'المتصيد' },
  { id: 43, src: '/images/avatars/hero_icon_43_wake.png', alt: 'سيد البحار' },
  { id: 44, src: '/images/avatars/hero_icon_44_wake.png', alt: 'الحارس الأمين' }
];

// واجهة لبيانات المستخدم
export interface UserSettings {
  nickname: string;
  avatarId: number;
}

// استخدام LocalStorage لتخزين إعدادات المستخدم
export const saveUserSettings = (nickname: string, avatarId: number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userSettings', JSON.stringify({ nickname, avatarId }));
  }
};

// استرجاع بيانات المستخدم
export const getUserSettings = (): UserSettings | null => {
  if (typeof window !== 'undefined') {
    const settings = localStorage.getItem('userSettings');
    if (settings) {
      return JSON.parse(settings);
    }
  }
  return null;
};

// الحصول على مسار الصورة الشخصية للمستخدم
export const getUserAvatarSrc = (avatarId: number | undefined): string => {
  if (!avatarId) return '';
  
  // البحث عن الأفاتار باستخدام رقم المعرف
  const avatar = AVAILABLE_AVATARS.find(a => a.id === avatarId);
  
  if (avatar) {
    // إرجاع مسار الصورة من المصفوفة
    return avatar.src;
  }
  
  // طباعة رسالة تصحيح للمطورين
  console.log('لم يتم العثور على صورة بالمعرف:', avatarId);
  
  // الصورة الافتراضية الأولى
  return '/images/avatars/hero_icon_8_wake.png';
};

// الحصول على الحرف الأول من اسم المستخدم أو بديل إذا لم يكن متاحًا
export const getUserInitial = (nickname: string | undefined): string => {
  if (!nickname) return '؟';
  return nickname.charAt(0);
};

// الحصول على الاسم المستعار كاملاً أو بديل إذا لم يكن متاحًا
export const getUserDisplayName = (nickname: string | undefined): string => {
  if (!nickname) return 'زائر';
  return nickname;
};

// التحقق مما إذا كان المستخدم قد قام بإعداد ملفه الشخصي
export const hasUserProfile = (): boolean => {
  const settings = getUserSettings();
  return !!settings && !!settings.nickname;
};
