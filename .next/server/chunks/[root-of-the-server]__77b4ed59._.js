module.exports = {

"[project]/.next-internal/server/app/api/chat/messages/like/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/utils/mockData.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// نموذج بيانات رسائل الدردشة
__turbopack_context__.s({
    "createMockMessages": (()=>createMockMessages),
    "createMockOnlineUsers": (()=>createMockOnlineUsers)
});
function createMockMessages() {
    return [
        {
            id: '1',
            sender: 'فاطمة',
            senderAvatarId: 3,
            message: 'مرحباً بالجميع في دردشة الفاتحون! هل يمكنني الحصول على نصائح لتطوير قلعتي؟',
            timestamp: '2025-05-16T01:00:00.000Z',
            interaction: {
                likes: [],
                isLiked: false
            }
        },
        {
            id: '2',
            sender: 'عمر',
            senderAvatarId: 1,
            message: 'أهلاً فاطمة! أنصحك بالتركيز على تطوير الدفاعات أولاً وزيادة إنتاج الموارد',
            timestamp: '2025-05-16T01:01:30.000Z',
            interaction: {
                likes: [],
                isLiked: false
            }
        },
        {
            id: '3',
            sender: 'خالد',
            senderAvatarId: 5,
            message: 'البوتات الذكية للمزارع ستساعدك كثيراً في توفير الموارد والوقت',
            timestamp: '2025-05-16T01:03:00.000Z',
            interaction: {
                likes: [],
                isLiked: false
            }
        }
    ];
}
function createMockOnlineUsers() {
    return [
        {
            name: 'عمر',
            avatarId: 1
        },
        {
            name: 'خالد',
            avatarId: 5
        },
        {
            name: 'فاطمة',
            avatarId: 3
        },
        {
            name: 'محمد',
            avatarId: 2
        },
        {
            name: 'سارة',
            avatarId: 6
        },
        {
            name: 'أحمد',
            avatarId: 8
        },
        {
            name: 'نورا',
            avatarId: 4
        }
    ];
}
}}),
"[project]/src/app/api/chat/messages/like/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockData.ts [app-route] (ecmascript)");
;
;
// استخدام نفس مصدر البيانات للرسائل المستخدم في API الرسائل
// في بيئة حقيقية، سيتم استخدام قاعدة بيانات
// نحن نستخدم المتغير المستورد من ملف آخر، لذا فإن التغييرات ستكون محلية وستُفقد عند إعادة تشغيل الخادم
// ولكن هذه نسخة تجريبية
let chatMessages = [];
// استدعاء الدالة المعدة مسبقًا إذا كانت المصفوفة فارغة
if (chatMessages.length === 0) {
    chatMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMockMessages"])();
}
async function POST(req) {
    try {
        const { messageId, userId } = await req.json();
        // التحقق من البيانات المدخلة
        if (!messageId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'معرف الرسالة مطلوب'
            }, {
                status: 400
            });
        }
        // البحث عن الرسالة
        const messageIndex = chatMessages.findIndex((m)=>m.id === messageId);
        if (messageIndex === -1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'الرسالة غير موجودة'
            }, {
                status: 404
            });
        }
        // تحديث الإعجاب
        const message = chatMessages[messageIndex];
        // التحقق مما إذا كان المستخدم قد أعجب بالفعل بالرسالة
        const userLiked = message.interaction.likes.includes(userId);
        if (userLiked) {
            // إزالة الإعجاب
            message.interaction.likes = message.interaction.likes.filter((id)=>id !== userId);
        } else {
            // إضافة الإعجاب
            message.interaction.likes.push(userId);
        }
        // تحديث الرسالة
        chatMessages[messageIndex] = message;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: {
                ...message,
                interaction: {
                    ...message.interaction,
                    isLiked: !userLiked
                }
            }
        });
    } catch (error) {
        console.error('Error liking message:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في تحديث الإعجاب بالرسالة'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__77b4ed59._.js.map