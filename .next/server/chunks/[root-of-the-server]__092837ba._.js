module.exports = {

"[project]/.next-internal/server/app/api/chat/messages/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/api/chat/messages/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockData.ts [app-route] (ecmascript)");
;
;
// تخزين مؤقت للرسائل (في نظام حقيقي، سيتم استخدام قاعدة بيانات)
let chatMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMockMessages"])();
async function GET(req) {
    try {
        const url = new URL(req.url);
        const limit = parseInt(url.searchParams.get('limit') || '50');
        // استرجاع الرسائل، مرتبة من الأحدث إلى الأقدم ثم عكسها
        const messages = [
            ...chatMessages
        ].sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit).reverse();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            messages
        });
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في جلب رسائل الدردشة'
        }, {
            status: 500
        });
    }
}
async function POST(req) {
    try {
        const { message, sender, senderAvatarId } = await req.json();
        // التحقق من بيانات الرسالة
        if (!message || typeof message !== 'string' || !message.trim()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'محتوى الرسالة مطلوب'
            }, {
                status: 400
            });
        }
        if (!sender || typeof sender !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'اسم المرسل مطلوب'
            }, {
                status: 400
            });
        }
        // إنشاء رسالة جديدة
        const newMessage = {
            id: Date.now().toString(),
            sender,
            senderAvatarId,
            message: message.trim(),
            timestamp: new Date().toISOString(),
            interaction: {
                likes: [],
                isLiked: false
            }
        };
        // إضافة الرسالة إلى المجموعة
        chatMessages.push(newMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: newMessage
        });
    } catch (error) {
        console.error('Error sending chat message:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في إرسال رسالة الدردشة'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__092837ba._.js.map