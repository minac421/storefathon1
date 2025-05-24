module.exports = {

"[project]/.next-internal/server/app/api/blog/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/types/blog.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// تعريف فئات المقال المتاحة
__turbopack_context__.s({
    "BlogCategory": (()=>BlogCategory),
    "ReactionType": (()=>ReactionType)
});
var BlogCategory = /*#__PURE__*/ function(BlogCategory) {
    BlogCategory["GUIDE"] = "guide";
    BlogCategory["NEWS"] = "news";
    BlogCategory["TIPS"] = "tips";
    BlogCategory["ANALYSIS"] = "analysis";
    BlogCategory["MARKET"] = "market";
    BlogCategory["MEMES"] = "memes";
    BlogCategory["EXPERIENCE"] = "experience";
    return BlogCategory;
}({});
var ReactionType = /*#__PURE__*/ function(ReactionType) {
    ReactionType["SWORD"] = "sword";
    ReactionType["FIRE"] = "fire";
    ReactionType["SHIELD"] = "shield";
    ReactionType["CROWN"] = "crown";
    ReactionType["CASTLE"] = "castle";
    ReactionType["LAUGH"] = "laugh"; // ضحك للمحتوى المسلي أو الطريف
    return ReactionType;
}({});
}}),
"[project]/src/models/BlogPost.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/blog.ts [app-route] (ecmascript)");
;
;
// استيراد تعريف فئات المقال من ملف الأنواع
// نموذج بيانات التعليق
const CommentSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    author: {
        userId: {
            type: String,
            default: null
        },
        name: {
            type: String,
            required: [
                true,
                'الرجاء إدخال اسم المعلق'
            ]
        },
        avatar: {
            type: String,
            default: null
        } // الصورة الرمزية للمعلق
    },
    content: {
        type: String,
        required: [
            true,
            'الرجاء إدخال نص التعليق'
        ],
        trim: true,
        maxlength: [
            500,
            'يجب ألا يزيد التعليق عن 500 حرف'
        ]
    },
    likes: [
        {
            type: String
        } // قائمة معرفات المستخدمين الذين أعجبوا بالتعليق
    ],
    replies: [
        {
            author: {
                userId: {
                    type: String,
                    default: null
                },
                name: {
                    type: String,
                    required: true
                },
                avatar: {
                    type: String,
                    default: null
                }
            },
            content: {
                type: String,
                required: true,
                trim: true,
                maxlength: [
                    300,
                    'يجب ألا يزيد الرد عن 300 حرف'
                ]
            },
            likes: [
                {
                    type: String
                }
            ],
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isApproved: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
// تعريف نموذج معلومات الكاتب
const AuthorInfoSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    userId: {
        type: String,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: ''
    },
    contactInfo: {
        type: String,
        default: null
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    } // هل الكاتب موثق؟
});
// تعريف مخطط بيانات المقال
const BlogPostSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    title: {
        type: String,
        required: [
            true,
            'الرجاء إدخال عنوان المقال'
        ],
        trim: true,
        maxlength: [
            100,
            'يجب ألا يزيد العنوان عن 100 حرف'
        ]
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    content: {
        type: String,
        required: [
            true,
            'الرجاء إدخال محتوى المقال'
        ]
    },
    summary: {
        type: String,
        required: [
            true,
            'الرجاء إدخال ملخص المقال'
        ],
        maxlength: [
            300,
            'يجب ألا يزيد الملخص عن 300 حرف'
        ]
    },
    category: {
        type: String,
        required: [
            true,
            'الرجاء اختيار فئة المقال'
        ],
        enum: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlogCategory"]),
        default: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlogCategory"].NEWS
    },
    // معلومات الكاتب المفصلة
    author: AuthorInfoSchema,
    // صور ووسائط المقال
    featuredImage: {
        type: String,
        default: null
    },
    media: {
        images: [
            {
                type: String
            }
        ],
        videos: [
            {
                url: {
                    type: String
                },
                thumbnail: {
                    type: String,
                    default: null
                },
                title: {
                    type: String,
                    default: ''
                },
                duration: {
                    type: Number,
                    default: 0
                } // مدة الفيديو بالثواني
            }
        ]
    },
    // التفاعل مع المقال
    interaction: {
        likes: [
            {
                type: String
            }
        ],
        shares: {
            type: Number,
            default: 0
        },
        bookmarks: [
            {
                type: String
            }
        ],
        views: {
            type: Number,
            default: 0
        },
        // إضافة قسم التفاعلات المتعددة
        reactions: {
            fire: [
                {
                    type: String
                }
            ],
            shield: [
                {
                    type: String
                }
            ],
            crown: [
                {
                    type: String
                }
            ],
            castle: [
                {
                    type: String
                }
            ],
            laugh: [
                {
                    type: String
                }
            ] // تفاعل ضحك - معرفات المستخدمين
        }
    },
    // التعليقات على المقال
    comments: [
        CommentSchema
    ],
    // كلمات مفتاحية ووسوم
    tags: [
        {
            type: String,
            trim: true
        }
    ],
    // تمييز المقال
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    needsReview: {
        type: Boolean,
        default: true
    },
    // تواريخ
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    publishedAt: {
        type: Date,
        default: null
    } // تاريخ النشر الفعلي
}, {
    timestamps: true
});
// إنشاء فهرس للبحث النصي
BlogPostSchema.index({
    title: 'text',
    content: 'text',
    tags: 'text'
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.BlogPost || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('BlogPost', BlogPostSchema);
}}),
"[project]/src/lib/mongoHelpers.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addClientIds": (()=>addClientIds),
    "countDocs": (()=>countDocs),
    "deleteDoc": (()=>deleteDoc),
    "findDocById": (()=>findDocById),
    "findDocs": (()=>findDocs),
    "findOnDoc": (()=>findOnDoc),
    "updateDoc": (()=>updateDoc)
});
async function findDocById(model, id) {
    // استخدام mongoose.model لتجنب أخطاء TypeScript مع findById
    return await model.findById(id).lean().exec();
}
async function findOnDoc(model, query) {
    // استخدام lean() وexec() لتجنب أخطاء TypeScript
    return await model.findOne(query).lean().exec();
}
async function findDocs(model, query = {}, options = {}) {
    // المعاملات الافتراضية
    const { sort = {
        createdAt: -1
    }, limit = 100, skip = 0 } = options;
    // استخدام Model.find ثم lean() ثم exec() 
    return await model.find(query).sort(sort).skip(skip).limit(limit).lean().exec();
}
async function updateDoc(model, query, update, options = {}) {
    return await model.updateOne(query, update, options).exec();
}
async function deleteDoc(model, query) {
    return await model.deleteOne(query).exec();
}
async function countDocs(model, query = {}) {
    return await model.countDocuments(query).exec();
}
function addClientIds(docs) {
    if (!docs) return docs;
    // إذا كان المستند مصفوفة
    if (Array.isArray(docs)) {
        return docs.map((doc)=>addClientIds(doc));
    }
    // إذا كان المستند كائنًا واحدًا
    const docCopy = {
        ...docs
    };
    // إضافة حقل id إذا كان المستند يحتوي على _id
    if (docCopy._id) {
        // تحويل _id إلى سلسلة نصية إذا كان كائنًا
        const idStr = typeof docCopy._id === 'object' && docCopy._id.toString ? docCopy._id.toString() : docCopy._id;
        // إضافة حقل id فقط إذا لم يكن موجودًا بالفعل
        if (!docCopy.id) {
            docCopy.id = idStr;
        }
    }
    return docCopy;
}
}}),
"[project]/src/app/api/blog/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/BlogPost.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongoHelpers.ts [app-route] (ecmascript)");
;
;
;
;
;
/**
 * تحويل العنوان إلى slug صديق للـ URL
 * @param text النص المراد تحويله
 * @returns slug منسق
 */ function slugify(text) {
    return text.toString().normalize('NFD') // تطبيع النص
    .replace(/[\u0300-\u036f]/g, '') // إزالة علامات التشكيل
    .toLowerCase() // تحويل إلى أحرف صغيرة
    .trim() // إزالة المسافات الزائدة
    .replace(/\s+/g, '-') // استبدال المسافات بشرطات
    .replace(/[^\w\-]+/g, '') // إزالة جميع الأحرف غير الكلمات
    .replace(/\-\-+/g, '-') // استبدال الشرطات المتعددة بشرطة واحدة
    .replace(/^-+/, '') // إزالة الشرطات من البداية
    .replace(/-+$/, ''); // إزالة الشرطات من النهاية
}
async function GET(request) {
    // أقصى عدد لمحاولات الاتصال بقاعدة البيانات
    const MAX_RETRIES = 2;
    let retryCount = 0;
    while(retryCount <= MAX_RETRIES){
        try {
            console.log(`محاولة الاتصال بقاعدة البيانات (${retryCount + 1}/${MAX_RETRIES + 1})`);
            // الاتصال بقاعدة البيانات
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
            // استخراج المعلمات من الـ URL
            const url = new URL(request.url);
            const slug = url.searchParams.get('slug');
            const id = url.searchParams.get('id');
            // إذا تم تقديم معرف أو slug، قم بإرجاع المقال المحدد
            if (slug) {
                // استخدام الوظيفة المساعدة findOnDoc لتجنب أخطاء TypeScript
                const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOnDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
                    slug: slug,
                    isPublished: true
                });
                if (!post) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'المقال غير موجود'
                    }, {
                        status: 404
                    });
                }
                // زيادة عدد المشاهدات باستخدام updateDoc
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
                    slug: slug
                }, {
                    $inc: {
                        "interaction.views": 1
                    }
                });
                // تحويل معرفات MongoDB إلى id للواجهة
                const clientPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addClientIds"])(post);
                // طباعة معلومات التصحيح
                console.log(`استجابة API للمقال الفردي (${slug}): صورة: ${clientPost.featuredImage ? 'موجودة' : 'غير موجودة'}`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    post: clientPost
                });
            }
            if (id) {
                // استخدام الوظيفة المساعدة findDocById لتجنب أخطاء TypeScript
                const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findDocById"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], id);
                if (!post) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'المقال غير موجود'
                    }, {
                        status: 404
                    });
                }
                // تحويل معرفات MongoDB إلى id للواجهة
                const clientPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addClientIds"])(post);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    post: clientPost
                });
            }
            // إرجاع جميع المقالات المنشورة مع دعم التصنيف والترتيب
            const page = parseInt(url.searchParams.get('page') || '1');
            const limit = parseInt(url.searchParams.get('limit') || '10');
            const sort = url.searchParams.get('sort') || 'recent';
            const category = url.searchParams.get('category');
            // إنشاء شروط البحث
            const query = {};
            // إذا لم يتم طلب عرض المنشورات غير المنشورة، نعرض فقط المنشورات المنشورة
            const includeUnpublished = url.searchParams.get('includeUnpublished') === 'true';
            if (!includeUnpublished) {
                query.isPublished = true;
            }
            if (category) {
                query.category = category;
            }
            // تحديد طريقة الترتيب
            let sortOption = {
                createdAt: -1
            }; // الافتراضي: الأحدث أولاً
            if (sort === 'popular') {
                sortOption = {
                    "interaction.views": -1
                }; // الأكثر مشاهدة
            } else if (sort === 'comments') {
                sortOption = {
                    "comments.length": -1
                }; // الأكثر تعليقات
            }
            // حساب التخطي للصفحات
            const skip = (page - 1) * limit;
            console.log('Query:', JSON.stringify(query));
            console.log('Sort:', JSON.stringify(sortOption));
            // تنفيذ الاستعلام مع الترتيب والتقسيم إلى صفحات
            // استخدام الوظيفة المساعدة findDocs لتجنب أخطاء TypeScript
            const posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findDocs"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], query, {
                sort: sortOption,
                skip: skip,
                limit: limit
            });
            console.log(`تم استرجاع ${posts.length} منشورات`);
            // الحصول على إجمالي عدد المقالات للترقيم
            const total = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["countDocs"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], query);
            const totalPages = Math.ceil(total / limit);
            // تحويل معرفات المنشورات من MongoDB إلى id للواجهة
            const clientPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addClientIds"])(posts);
            // الطباعة للتصحيح
            console.log('تحويل منشورات MongoDB إلى منشورات لواجهة المستخدم مع الصور:');
            clientPosts.forEach((post)=>{
                console.log(`المنشور: ${post.title} - صورة: ${post.featuredImage ? 'موجودة' : 'غير موجودة'}`);
            });
            // إرجاع النتائج مع معلومات الترقيم
            const pagination = {
                total,
                page,
                limit,
                totalPages
            };
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                posts: clientPosts,
                pagination
            });
        } catch (error) {
            retryCount++;
            if (retryCount > MAX_RETRIES) {
                console.error('Error fetching posts after maximum retries:', error);
                // تفاصيل إضافية للخطأ
                let errorMessage = 'حدث خطأ أثناء جلب المقالات';
                let errorDetails = '';
                if (error instanceof Error) {
                    errorDetails = error.message;
                    // تحسين رسائل الخطأ
                    if (error.message.includes('MongoServerSelectionError')) {
                        errorMessage = 'تعذر الاتصال بخادم قاعدة البيانات';
                    } else if (error.message.includes('Authentication failed')) {
                        errorMessage = 'فشل المصادقة مع قاعدة البيانات';
                    } else if (error.message.includes('Operation')) {
                        errorMessage = 'انتهت مهلة عملية قاعدة البيانات';
                    }
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: errorMessage,
                    details: errorDetails,
                    code: 'DB_ERROR'
                }, {
                    status: 500
                });
            }
            // انتظار قبل المحاولة مرة أخرى - تزداد المدة مع كل محاولة
            const delay = 1000 * retryCount; // 1 ثانية، ثم 2 ثانية
            console.log(`فشل الاتصال بقاعدة البيانات، إعادة المحاولة بعد ${delay}ms...`);
            await new Promise((resolve)=>setTimeout(resolve, delay));
        }
    }
    // لن يتم الوصول إلى هذه النقطة أبدًا بسبب حلقة المحاولة أعلاه
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'خطأ غير متوقع'
    }, {
        status: 500
    });
}
async function POST(request) {
    try {
        // الاتصال بقاعدة البيانات
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // التحقق من نوع المحتوى
        const contentType = request.headers.get('content-type') || '';
        let title = '';
        let content = '';
        let summary = '';
        let category = '';
        let tags = [];
        let featuredImage = null;
        let author = null;
        // التعامل مع FormData (في حالة تحميل ملفات)
        if (contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            title = formData.get('title') || '';
            content = formData.get('content') || '';
            category = formData.get('category') || 'news';
            const authorName = formData.get('authorName') || 'مستخدم جديد';
            const authorAvatar = formData.get('authorAvatar') || '/images/avatars/default.png';
            // معالجة الصورة المرفقة
            const imageFile = formData.get('image');
            if (imageFile && imageFile.size > 0) {
                console.log('تم استلام ملف صورة:', imageFile.name, 'حجم:', imageFile.size);
                try {
                    // تحويل الصورة إلى Data URL للعرض مباشرة
                    const arrayBuffer = await imageFile.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const base64 = buffer.toString('base64');
                    const contentType = imageFile.type || 'image/jpeg';
                    featuredImage = `data:${contentType};base64,${base64}`;
                    console.log('تم معالجة الصورة بنجاح وتحويلها إلى صيغة قابلة للعرض');
                } catch (error) {
                    console.error('خطأ في معالجة ملف الصورة:', error);
                }
            } else {
                console.log('لم يتم العثور على ملف الصورة في FormData أو أن الملف فارغ');
            }
            // إنشاء ملخص من المحتوى إذا لم يكن موجودًا
            summary = content.substring(0, 150) + (content.length > 150 ? '...' : '');
            // معلومات المؤلف
            author = {
                name: authorName,
                avatar: authorAvatar,
                isVerified: false
            };
        } else {
            const body = await request.json();
            title = body.title || '';
            content = body.content || '';
            summary = body.summary || '';
            category = body.category || '';
            tags = body.tags || [];
            featuredImage = body.featuredImage || null;
            author = body.author || null;
        }
        // التحقق من وجود محتوى
        if (!content) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'محتوى المنشور مطلوب'
            }, {
                status: 400
            });
        }
        // التأكد من وجود عنوان مناسب
        if (!title || title.trim() === '') {
            title = content.substring(0, 50) + (content.length > 50 ? '...' : '');
        }
        // التأكد من وجود ملخص
        if (!summary || summary.trim() === '') {
            summary = content.substring(0, 150) + (content.length > 150 ? '...' : '');
        }
        // التأكد من وجود فئة
        if (!category) {
            category = 'news';
        }
        // إنشاء slug فريد من العنوان
        let slug = slugify(title);
        if (!slug) {
            slug = 'post-' + Date.now().toString();
        }
        // التحقق مما إذا كان الـ slug موجودًا بالفعل
        const existingPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOnDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
            slug: slug
        });
        if (existingPost) {
            // إضافة رقم عشوائي لتجنب تكرار الـ slug
            slug = `${slug}-${Date.now().toString().slice(-6)}`;
        }
        // إنشاء مقال جديد
        const newPost = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.BlogPost({
            title,
            slug,
            content,
            summary,
            category,
            tags: tags || [],
            featuredImage: featuredImage || null,
            author: {
                name: author?.name || 'فريق الفاتحون',
                avatar: author?.avatar || '/images/avatars/team.png',
                isVerified: author?.isVerified || false
            },
            interaction: {
                likes: [],
                shares: 0,
                views: 0,
                bookmarks: []
            },
            isPublished: true,
            isApproved: true // تغيير ليكون موافقًا عليه بشكل افتراضي
        });
        // حفظ المقال في قاعدة البيانات
        await newPost.save();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            post: newPost
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ أثناء إنشاء المقال'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        // الاتصال بقاعدة البيانات
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await request.json();
        console.log('Request body:', JSON.stringify(body, null, 2));
        const { id, title, content, summary, category, tags, isPublished, isApproved, featuredImage } = body;
        if (!id) {
            console.error('خطأ: معرف المقال غير موجود في الطلب');
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'معرف المقال مطلوب'
            }, {
                status: 400
            });
        }
        // تحديث المقال مباشرة في قاعدة البيانات
        const updateData = {
            updatedAt: new Date()
        };
        if (title) {
            updateData.title = title;
            // تحديث الـ slug إذا تغير العنوان
            let newSlug = slugify(title);
            if (!newSlug) {
                newSlug = 'post-' + Date.now().toString();
            }
            const existingPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOnDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
                slug: newSlug,
                _id: {
                    $ne: id
                }
            });
            if (existingPost) {
                // إضافة تاريخ للـ slug لتجنب التكرار
                newSlug = `${newSlug}-${Date.now().toString().slice(-6)}`;
            }
            updateData.slug = newSlug;
        }
        if (content) updateData.content = content;
        if (summary) updateData.summary = summary;
        if (category) updateData.category = category;
        if (tags) updateData.tags = tags;
        if (isPublished !== undefined) {
            updateData.isPublished = isPublished;
        }
        if (isApproved !== undefined) {
            updateData.isApproved = isApproved;
        }
        // إضافة معالجة لحقل الصورة المميزة
        if (featuredImage !== undefined) {
            updateData.featuredImage = featuredImage;
            console.log('تحديث الصورة المميزة:', featuredImage);
        }
        try {
            // استخدام updateDoc مع التحقق من النوع
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Types.ObjectId.isValid(id)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'معرف المقال غير صالح'
                }, {
                    status: 400
                });
            }
            // تحديث المقال مع التحقق من النجاح
            const updateResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
                _id: id
            }, updateData);
            if (!updateResult) {
                throw new Error('فشل في تحديث المقال');
            }
            // جلب المقال المحدث مع التحقق من وجوده
            const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findDocById"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], id);
            if (!post) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'حدث خطأ أثناء جلب المقال المحدث'
                }, {
                    status: 500
                });
            }
            // نظرًا لأن findDocById يستخدم lean()، فالنتيجة هي كائن JavaScript عادي وليس وثيقة Mongoose
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                post: {
                    ...post,
                    _id: post._id.toString(),
                    createdAt: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
                    updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined
                }
            });
        } catch (error) {
            console.error('Error updating post:', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'حدث خطأ أثناء تحديث المقال'
            }, {
                status: 500
            });
        }
    } catch (error) {
        console.error('Error updating post:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ أثناء تحديث المقال'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        // الاتصال بقاعدة البيانات
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'معرف المقال مطلوب'
            }, {
                status: 400
            });
        }
        // التحقق من وجود المقال قبل الحذف
        const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findDocById"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], id);
        if (!exists) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'المقال غير موجود'
            }, {
                status: 404
            });
        }
        // حذف المقال
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongoHelpers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteDoc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$BlogPost$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"], {
            _id: id
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'تم حذف المقال بنجاح'
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ أثناء حذف المقال'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__43f98790._.js.map