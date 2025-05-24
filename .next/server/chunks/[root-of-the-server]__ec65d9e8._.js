module.exports = {

"[project]/.next-internal/server/app/api/services/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/lib/dbConnect.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// الرابط الخاص بقاعدة البيانات MongoDB Atlas - استخدم المتغير البيئي أولاً
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://minaadelc4:cHjkStQnKuh91sNt@storefathone.a42qbk5.mongodb.net/storefathon?retryWrites=true&w=majority&appName=storefathone';
/**
 * تعريف حالات الاتصال لقاعدة البيانات
 */ // يجب استخدام نفس القيم العددية التي يستخدمها Mongoose
const MONGOOSE_STATES = {
    disconnected: 0,
    connected: 1,
    connecting: 2,
    disconnecting: 3
};
// ترجمة حالات الاتصال إلى العربية
const CONNECTION_STATE_NAMES = [
    'منفصل',
    'متصل',
    'جاري الاتصال',
    'جاري الانفصال' // 3
];
/**
 * الاتصال العمومي بقاعدة البيانات
 * سيتم استخدامه في جميع أنحاء التطبيق
 * 
 * ملاحظة هامة: يجب التأكد من أن الإعدادات الأمنية في MongoDB Atlas تسمح باتصال من IP الخادم
 * تأكد من إضافة IP الخادم في Network Access في MongoDB Atlas
 * وإذا كنت تستخدم Vercel، فتأكد من إضافة 0.0.0.0/0 للسماح بالوصول من جميع عناوين IP
 */ if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
// تهيئة الكاش العمومي
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
        errorCount: 0,
        lastErrorTime: null
    };
}
/**
 * دالة الاتصال بقاعدة البيانات
 * تعيد اتصال قاعدة البيانات أو ترمي خطأ إذا فشل الاتصال بعد عدة محاولات
 */ async function dbConnect() {
    // التحقق إذا كان الاتصال موجودًا بالفعل
    if (cached.conn) {
        // اختبار الاتصال القائم
        try {
            const currentState = cached.conn.readyState;
            if (currentState === MONGOOSE_STATES.connected) {
                return cached.conn;
            } else {
                console.log(`⚠️ حالة الاتصال بقاعدة البيانات غير صالحة (readyState=${currentState})، إعادة الاتصال...`);
                cached.conn = null;
                cached.promise = null;
            }
        } catch (connError) {
            console.error('❌ خطأ عند فحص حالة الاتصال الحالي:', connError);
            cached.conn = null;
            cached.promise = null;
        }
    }
    // التحقق من وقت حدوث آخر خطأ - إعادة ضبط عداد الأخطاء إذا مر وقت كافٍ
    if (cached.lastErrorTime && Date.now() - cached.lastErrorTime > 60000) {
        console.log('🔄 إعادة ضبط عداد الأخطاء بعد مرور دقيقة');
        cached.errorCount = 0;
        cached.lastErrorTime = null;
    }
    // التحقق من عدد المحاولات المتكررة
    if (cached.errorCount > 5) {
        const timeSinceLastError = cached.lastErrorTime ? Math.floor((Date.now() - cached.lastErrorTime) / 1000) : 0;
        console.error(`⛔ تجاوز الحد الأقصى لمحاولات الاتصال (${cached.errorCount}). آخر محاولة منذ ${timeSinceLastError} ثانية.`);
        // إعادة تعيين العداد بعد 1 دقيقة
        if (timeSinceLastError > 60) {
            console.log('🔄 إعادة ضبط عداد محاولات الاتصال بعد فترة انتظار');
            cached.errorCount = 0;
        } else {
            throw new Error(`تجاوز الحد الأقصى لمحاولات الاتصال بقاعدة البيانات. حاول مرة أخرى لاحقًا (${Math.max(0, 60 - timeSinceLastError)} ثانية متبقية)`);
        }
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 60000,
            family: 4,
            maxPoolSize: 10,
            retryWrites: true,
            retryReads: true
        };
        // طباعة الرابط للتحقق منه (مع إخفاء كلمة المرور للأمان)
        const sanitizedUri = MONGODB_URI.replace(/(mongodb\+srv:\/\/[^:]+):[^@]+@/, '$1:****@');
        console.log('🔍 محاولة الاتصال بـ:', sanitizedUri);
        // معالجة الاتصال بشكل أفضل
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            const connection = mongoose.connection;
            console.log(`🌿 تم الاتصال بقاعدة البيانات MongoDB بنجاح! (${connection.name})`);
            // إضافة مستمع لأحداث الخطأ
            connection.on('error', (err)=>{
                console.error('❌ خطأ في اتصال قاعدة البيانات خلال التشغيل:', err);
            });
            connection.on('disconnected', ()=>{
                console.warn('⚠️ انقطع الاتصال بقاعدة البيانات');
                cached.conn = null;
            });
            // إعادة تعيين عداد الأخطاء عند نجاح الاتصال
            cached.errorCount = 0;
            cached.lastErrorTime = null;
            return connection;
        }).catch((error)=>{
            // زيادة عداد الأخطاء وتسجيل وقت آخر خطأ
            cached.errorCount++;
            cached.lastErrorTime = Date.now();
            console.error('❌ خطأ في الاتصال بقاعدة البيانات MongoDB:', error.message);
            // تحقق من نوع الخطأ وتقديم رسائل مفيدة
            if (error.name === 'MongoServerSelectionError') {
                console.error('⚠️ خطأ اختيار السيرفر: تأكد من أن عنوان IP الخاص بك مسموح به في إعدادات الأمان لـ MongoDB Atlas');
                console.error('💡 اقتراح: اضبط Network Access في MongoDB Atlas للسماح لـ 0.0.0.0/0 للاختبار');
            }
            if (error.message.includes('Authentication failed')) {
                console.error('🔑 فشل المصادقة: تأكد من صحة اسم المستخدم وكلمة المرور');
            }
            if (error.message.includes('getaddrinfo')) {
                console.error('🌐 خطأ DNS: تأكد من اسم النطاق الصحيح وتوفر اتصال الإنترنت');
            }
            // إعادة تعيين الوعد للسماح بالمحاولة التالية
            cached.promise = null;
            throw error;
        });
    } else {
        console.log('♻️ استخدام وعد اتصال موجود');
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        // إعادة ضبط الوعد في حالة حدوث خطأ
        cached.promise = null;
        throw e;
    }
    // التحقق من حالة الاتصال
    const connectionState = cached.conn.readyState;
    if (connectionState !== MONGOOSE_STATES.connected) {
        console.warn(`⚠️ حالة الاتصال غير متوقعة: ${connectionState}`);
        // عرض اسم حالة الاتصال
        const stateName = CONNECTION_STATE_NAMES[connectionState] || 'غير معروفة';
        console.warn(`📊 حالة الاتصال: ${stateName}`);
        // إذا كانت الحالة "جاري الاتصال"، انتظر قليلاً
        if (connectionState === MONGOOSE_STATES.connecting) {
            console.log('⏳ جاري الاتصال، الانتظار...');
            await new Promise((resolve)=>setTimeout(resolve, 1000));
            // التحقق مرة أخرى بعد الانتظار
            const newState = cached.conn.readyState;
            if (newState === MONGOOSE_STATES.connected) {
                console.log('✅ تم الاتصال بنجاح بعد الانتظار');
            } else {
                const newStateName = CONNECTION_STATE_NAMES[newState] || 'غير معروفة';
                console.warn(`⚠️ لا يزال الاتصال في حالة غير متوقعة: ${newState} (${newStateName})`);
            }
        }
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = dbConnect;
}}),
"[project]/src/models/Service.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// مخطط الخدمة
const ServiceSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    id: {
        type: String,
        required: [
            true,
            'يجب تحديد معرف الخدمة'
        ],
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: [
            true,
            'يجب تحديد فئة الخدمة'
        ],
        enum: [
            'resources',
            'bots',
            'castle',
            'events'
        ]
    },
    name: {
        ar: {
            type: String,
            required: [
                true,
                'يجب تحديد الاسم بالعربية'
            ]
        },
        en: {
            type: String,
            required: [
                true,
                'يجب تحديد الاسم بالإنجليزية'
            ]
        },
        tr: {
            type: String,
            required: [
                true,
                'يجب تحديد الاسم بالتركية'
            ]
        }
    },
    description: {
        ar: {
            type: String
        },
        en: {
            type: String
        },
        tr: {
            type: String
        }
    },
    price: {
        type: Number,
        required: [
            true,
            'يجب تحديد سعر الخدمة'
        ],
        min: [
            0,
            'يجب أن يكون السعر موجبًا'
        ]
    },
    icon: {
        type: String,
        required: [
            true,
            'يجب تحديد رمز الخدمة'
        ]
    },
    iconAlt: {
        type: String
    },
    popular: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Service || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Service', ServiceSchema);
}}),
"[project]/src/app/api/services/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET),
    "POST": (()=>POST),
    "PUT": (()=>PUT)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dbConnect.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Service.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        console.log('🔍 جاري محاولة الاتصال بقاعدة البيانات للخدمات...');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const url = new URL(request.url);
        // استخراج معلمات التصفية والترتيب
        const category = url.searchParams.get('category');
        const sortBy = url.searchParams.get('sortBy') || 'createdAt';
        const sortOrder = url.searchParams.get('sortOrder') || 'desc';
        // بناء استعلام البحث
        const query = {};
        if (category) {
            query.category = category;
        }
        // بناء خيارات الترتيب
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        // الحصول على إجمالي العدد للإحصائيات
        const totalServices = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].countDocuments(query);
        const distinctCategories = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].distinct('category');
        // استرداد جميع الخدمات 
        const services = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find(query).sort(sort).limit(500); // حد أقصى للحماية من التحميل الزائد
        // تحويل النتائج
        const results = services.map((doc)=>{
            const service = doc.toObject();
            return {
                id: service.id,
                category: service.category,
                name: service.name,
                description: service.description,
                price: service.price,
                icon: service.icon,
                iconAlt: service.iconAlt,
                popular: service.popular || false,
                createdAt: service.createdAt,
                updatedAt: service.updatedAt
            };
        });
        // تنظيم النتائج حسب الفئة
        const categorizedResults = {
            resources: results.filter((service)=>service.category === 'resources'),
            castle: results.filter((service)=>service.category === 'castle'),
            bots: results.filter((service)=>service.category === 'bots'),
            events: results.filter((service)=>service.category === 'events')
        };
        // إرجاع جميع الخدمات في مصفوفة واحدة مع تحديد ترميز UTF-8
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            services: categorizedResults,
            stats: {
                totalServices,
                distinctCategories
            }
        }), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    } catch (error) {
        console.error('خطأ في جلب الخدمات:', error);
        // في حالة الفشل، إرجاع البيانات الوهمية المعرفة سابقًا
        // حتى لا تنعطل واجهة المستخدم
        const mockServices = {
            resources: [
                {
                    id: 'wood',
                    name: {
                        ar: 'الخشب',
                        en: 'Wood',
                        tr: 'Ahşap'
                    },
                    price: 150,
                    icon: '/images/resources/wood.svg',
                    iconAlt: '🌲'
                },
                {
                    id: 'iron',
                    name: {
                        ar: 'الحديد',
                        en: 'Iron',
                        tr: 'Demir'
                    },
                    price: 200,
                    icon: '/images/resources/iron.svg',
                    iconAlt: '⛏️'
                },
                {
                    id: 'wheat',
                    name: {
                        ar: 'القمح',
                        en: 'Wheat',
                        tr: 'Buğday'
                    },
                    price: 100,
                    icon: '/images/resources/wheat.svg',
                    iconAlt: '🌾'
                },
                {
                    id: 'silver',
                    name: {
                        ar: 'الفضة',
                        en: 'Silver',
                        tr: 'Gümüş'
                    },
                    price: 250,
                    icon: '/images/resources/silver.svg',
                    iconAlt: '🔷'
                }
            ],
            castle: [
                {
                    id: 'castle1',
                    name: {
                        ar: 'قلعة صغيرة',
                        en: 'Small Castle',
                        tr: 'Küçük Kale'
                    },
                    price: 500,
                    icon: '/images/castles/small_castle.svg',
                    iconAlt: '🏰'
                },
                {
                    id: 'castle2',
                    name: {
                        ar: 'قلعة متوسطة',
                        en: 'Medium Castle',
                        tr: 'Orta Kale'
                    },
                    price: 1000,
                    icon: '/images/castles/medium_castle.svg',
                    iconAlt: '🏯'
                },
                {
                    id: 'castle3',
                    name: {
                        ar: 'قلعة كبيرة',
                        en: 'Large Castle',
                        tr: 'Büyük Kale'
                    },
                    price: 1500,
                    icon: '/images/castles/large_castle.svg',
                    iconAlt: '🏡️'
                }
            ],
            bots: [
                {
                    id: 'bot1',
                    name: {
                        ar: 'بوت المزارع',
                        en: 'Farmer Bot',
                        tr: 'Çiftçi Bot'
                    },
                    price: 300,
                    icon: '/images/bots/farmer_bot.svg',
                    iconAlt: '🤖'
                },
                {
                    id: 'bot2',
                    name: {
                        ar: 'بوت المحارب',
                        en: 'Warrior Bot',
                        tr: 'Savaşçı Bot'
                    },
                    price: 450,
                    icon: '/images/bots/warrior_bot.svg',
                    iconAlt: '👾'
                },
                {
                    id: 'bot3',
                    name: {
                        ar: 'بوت التاجر',
                        en: 'Trader Bot',
                        tr: 'Tüccar Bot'
                    },
                    price: 400,
                    icon: '/images/bots/trader_bot.svg',
                    iconAlt: '🎮'
                }
            ],
            events: [
                {
                    id: 'starter',
                    name: {
                        ar: 'حزمة المبتدئ',
                        en: 'Starter Package',
                        tr: 'Başlangıç Paketi'
                    },
                    description: {
                        ar: 'مثالية للاعبين الجدد، تتضمن موارد أساسية للبدء',
                        en: 'Perfect for new players, includes basic resources to get started',
                        tr: 'Yeni oyuncular için mükemmel, başlamak için temel kaynaklar içerir'
                    },
                    price: 499,
                    icon: '🎁',
                    popular: false
                },
                {
                    id: 'premium',
                    name: {
                        ar: 'حزمة بريميوم',
                        en: 'Premium Package',
                        tr: 'Premium Paket'
                    },
                    description: {
                        ar: 'تضم مجموعة متنوعة من الموارد والمزايا للاعبين المتقدمين',
                        en: 'Includes a diverse set of resources and perks for advanced players',
                        tr: 'Gelişmiş oyuncular için çeşitli kaynaklar ve avantajlar içerir'
                    },
                    price: 999,
                    icon: '💎',
                    popular: true
                },
                {
                    id: 'ultimate',
                    name: {
                        ar: 'الحزمة النهائية',
                        en: 'Ultimate Package',
                        tr: 'Ultimate Paket'
                    },
                    description: {
                        ar: 'كل ما تحتاجه لتصبح قوة لا يستهان بها في اللعبة',
                        en: 'Everything you need to become a formidable power in the game',
                        tr: 'Oyunda korkunç bir güç olmak için ihtiyacınız olan her şey'
                    },
                    price: 1499,
                    icon: '👑',
                    popular: false
                }
            ]
        };
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            services: mockServices,
            stats: {
                totalServices: Object.values(mockServices).flat().length,
                distinctCategories: Object.keys(mockServices)
            }
        }), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
}
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const serviceData = await request.json();
        // التحقق من وجود معرف الخدمة
        const existingService = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            id: serviceData.id
        });
        if (existingService) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                error: 'معرف الخدمة مستخدم بالفعل، الرجاء استخدام معرف آخر'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }
        // إنشاء خدمة جديدة
        const newService = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create(serviceData);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            id: newService.id,
            success: true
        }), {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    } catch (error) {
        console.error('خطأ في إضافة خدمة جديدة:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            error: 'حدث خطأ أثناء إضافة الخدمة الجديدة'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
}
async function PUT(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const serviceData = await request.json();
        const { id, ...updateData } = serviceData;
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOneAndUpdate({
            id: id
        }, {
            ...updateData,
            updatedAt: new Date()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('خطأ في تحديث الخدمة:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            error: 'حدث خطأ أثناء تحديث الخدمة'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
}
async function DELETE(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
                error: 'معرف الخدمة مطلوب'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOneAndDelete({
            id: id
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('خطأ في حذف الخدمة:', error);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](JSON.stringify({
            error: 'حدث خطأ أثناء حذف الخدمة'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ec65d9e8._.js.map