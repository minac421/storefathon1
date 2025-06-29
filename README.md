# موقع الفاتحون - Conquerors Website

هذا المشروع هو موقع ويب لـ "الفاتحون" مبني باستخدام [Next.js](https://nextjs.org) مع تكامل مع قاعدة بيانات MongoDB.

## الميزات

- **واجهة المستخدم متعددة اللغات**: دعم اللغة العربية (RTL) والإنجليزية والتركية.
- **إدارة القلاع**: إضافة وتعديل وحذف القلاع مع بيانات مفصلة.
- **سلة التسوق**: نظام سلة تسوق كامل لشراء المنتجات والخدمات.
- **تصميم متجاوب**: يعمل على جميع أحجام الشاشات (الجوال، التابلت، سطح المكتب).
- **تكامل MongoDB**: تخزين البيانات في قاعدة بيانات MongoDB Atlas.

## متطلبات التشغيل

- Node.js نسخة 18 أو أعلى
- NPM أو Yarn
- حساب MongoDB Atlas (للتطوير والإنتاج)

## البدء

### 1. تثبيت الاعتماديات

```bash
npm install
# أو
yarn install
```

### 2. إعداد متغيرات البيئة

قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع وأضف متغيرات البيئة التالية:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### 3. تشغيل الخادم المحلي

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في متصفحك لمشاهدة الموقع.

## تكامل MongoDB

### نماذج البيانات

- **Castle**: نموذج لبيانات القلاع مع حقول للاسم والوصف والمستوى والقوة والسعر والميزات.

### API

- **GET /api/castles**: جلب جميع القلاع
- **POST /api/castles**: إضافة قلعة جديدة
- **PUT /api/castles**: تحديث قلعة موجودة
- **DELETE /api/castles**: حذف قلعة

## النشر على Netlify

### 1. ربط المستودع بـ Netlify

1. انتقل إلى [Netlify](https://www.netlify.com/) وقم بتسجيل الدخول
2. انقر على "New site from Git"
3. حدد مستودع GitHub الخاص بك

### 2. إعداد متغيرات البيئة

أضف متغيرات البيئة التالية في إعدادات Netlify:

- **MONGODB_URI**: رابط الاتصال بقاعدة بيانات MongoDB Atlas الخاصة بك

### 3. النشر

بعد ربط المستودع، سيتم نشر التطبيق تلقائيًا عند كل دفع لفرع `main`.

## تخصيص المشروع

يمكنك تعديل المشروع بإضافة المزيد من الميزات مثل:

- **نظام المستخدمين**: تسجيل الدخول ووظائف إدارة الحسابات
- **نظام المدفوعات**: إضافة بوابة دفع لإتمام عمليات الشراء
- **إحصائيات وتحليلات**: لتتبع مبيعات القلاع والخدمات
