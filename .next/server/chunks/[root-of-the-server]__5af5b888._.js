module.exports = {

"[project]/.next-internal/server/app/api/socket/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/models/ChatMessage.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
// تعريف سكيما الرسالة
const ChatMessageSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["Schema"]({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    senderAvatarId: {
        type: Number,
        required: true,
        default: 1
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: String,
        required: true,
        default: ()=>new Date().toISOString()
    },
    interaction: {
        likes: {
            type: [
                String
            ],
            default: []
        },
        isLiked: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true,
    versionKey: false
});
// تعريف النموذج
let ChatMessageModel;
try {
    // محاولة الحصول على النموذج إذا كان موجوداً بالفعل
    ChatMessageModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('ChatMessage');
} catch  {
    // إنشاء النموذج إذا لم يكن موجوداً
    ChatMessageModel = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('ChatMessage', ChatMessageSchema);
}
const __TURBOPACK__default__export__ = ChatMessageModel;
}}),
"[project]/src/app/api/socket/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dbConnect.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$ChatMessage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/ChatMessage.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        // الاتصال بقاعدة البيانات
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // قراءة آخر الرسائل - افتراضياً 20 رسالة
        const messages = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$ChatMessage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            timestamp: -1
        }).limit(20).lean();
        // ترتيب الرسائل من الأقدم إلى الأحدث للعرض
        const sortedMessages = [
            ...messages
        ].sort((a, b)=>new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        // إنشاء قائمة المستخدمين المتصلين من الرسائل الفعلية فقط
        const users = Array.from(new Set(sortedMessages.map((msg)=>msg.sender))).filter((username)=>username) // تأكد من أن اسم المستخدم موجود
        .map((username)=>{
            const matchingMsg = sortedMessages.find((msg)=>msg.sender === username);
            return {
                name: username,
                avatarId: matchingMsg?.senderAvatarId || 1,
                status: 'online'
            };
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            messages: sortedMessages,
            users,
            mode: 'api',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في جلب بيانات الدردشة',
            mode: 'error',
            message: error.message
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        // الاتصال بقاعدة البيانات
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dbConnect$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        const body = await request.json();
        // التحقق من وجود البيانات المطلوبة
        if (!body.message || !body.sender) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'بيانات غير مكتملة',
                mode: 'error'
            }, {
                status: 400
            });
        }
        // إضافة رسالة جديدة إلى قاعدة البيانات
        const newMessage = {
            sender: body.sender,
            senderAvatarId: body.senderAvatarId || 1,
            message: body.message,
            timestamp: new Date().toISOString(),
            interaction: {
                likes: [],
                isLiked: false
            }
        };
        const savedMessage = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$ChatMessage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create(newMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: savedMessage,
            mode: 'api'
        });
    } catch (error) {
        console.error('Error adding message:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في إضافة الرسالة',
            mode: 'error',
            message: error.message
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__5af5b888._.js.map