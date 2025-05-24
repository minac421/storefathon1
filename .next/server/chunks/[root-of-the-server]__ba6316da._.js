module.exports = {

"[project]/.next-internal/server/app/api/socket/fallback/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/utils/chatStore.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "chatStore": (()=>chatStore),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockData.ts [app-route] (ecmascript)");
;
const chatStore = {
    // مصفوفة الرسائل
    messages: [],
    // معرف آخر رسالة
    lastMessageId: 1,
    // الحد الأقصى لعدد الرسائل المخزنة
    maxMessages: 100,
    // إضافة رسالة جديدة
    addMessage (message) {
        // إنشاء معرف جديد للرسالة
        const messageId = `server-${this.lastMessageId++}`;
        // إنشاء نسخة من الرسالة مع المعرف الجديد
        const savedMessage = {
            id: messageId,
            ...message,
            // ضمان وجود وقت وتفاعل
            timestamp: message.timestamp || new Date().toISOString(),
            interaction: message.interaction || {
                likes: [],
                isLiked: false
            }
        };
        // إضافة الرسالة إلى المصفوفة
        this.messages.push(savedMessage);
        // التحقق من عدم تجاوز الحد الأقصى
        if (this.messages.length > this.maxMessages) {
            // إزالة أقدم رسالة
            this.messages.shift();
        }
        return savedMessage;
    },
    // الحصول على الرسائل مع اختيار الحد الأقصى
    getMessages (limit = 20) {
        // ضمان أن الحد الأقصى عدد صحيح
        const count = Math.min(parseInt(limit) || 20, this.messages.length);
        // إذا لم تكن هناك رسائل، عودة مصفوفة فارغة
        if (this.messages.length === 0) {
            return this.createInitialMessages();
        }
        // إعادة آخر count رسائل
        return this.messages.slice(-count);
    },
    // تحديث تفاعل الرسالة
    updateMessageInteraction (messageId, userId, isLiked) {
        // البحث عن الرسالة
        const message = this.messages.find((msg)=>msg.id === messageId);
        if (!message) {
            return null;
        }
        // تحديث التفاعل
        if (isLiked) {
            // إضافة المستخدم إلى قائمة الإعجابات إذا لم يكن موجوداً
            if (!message.interaction.likes.includes(userId)) {
                message.interaction.likes.push(userId);
            }
        } else {
            // إزالة المستخدم من قائمة الإعجابات
            message.interaction.likes = message.interaction.likes.filter((id)=>id !== userId);
        }
        return message;
    },
    // إنشاء رسائل أولية إذا لم تكن هناك رسائل
    createInitialMessages () {
        // استخدام بيانات المستخدمين الوهمية لإنشاء رسائل أولية
        const mockUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createMockOnlineUsers"])();
        const initialMessages = [
            {
                message: 'مرحباً بالجميع في دردشة الفاتحون! هل يمكنني الحصول على نصائح لتطوير قلعتي؟',
                sender: mockUsers[0].name,
                senderAvatarId: mockUsers[0].avatarId,
                timestamp: new Date(Date.now() - 3600000).toISOString() // قبل ساعة
            },
            {
                message: 'أهلاً! أنصحك بالتركيز على تطوير الدفاعات أولاً وزيادة إنتاج الموارد',
                sender: mockUsers[1].name,
                senderAvatarId: mockUsers[1].avatarId,
                timestamp: new Date(Date.now() - 3300000).toISOString() // قبل 55 دقيقة
            },
            {
                message: 'البوتات الذكية للمزارع ستساعدك كثيراً في توفير الموارد والوقت',
                sender: mockUsers[2].name,
                senderAvatarId: mockUsers[2].avatarId,
                timestamp: new Date(Date.now() - 3000000).toISOString() // قبل 50 دقيقة
            },
            {
                message: 'كما يجب عليك الانضمام لتحالف قوي للحصول على المساعدة والحماية',
                sender: mockUsers[3].name,
                senderAvatarId: mockUsers[3].avatarId,
                timestamp: new Date(Date.now() - 2700000).toISOString() // قبل 45 دقيقة
            },
            {
                message: 'هل جربت استراتيجية الهجوم المتعدد المراحل؟ فعالة جداً!',
                sender: mockUsers[0].name,
                senderAvatarId: mockUsers[0].avatarId,
                timestamp: new Date(Date.now() - 1800000).toISOString() // قبل 30 دقيقة
            }
        ];
        // حفظ الرسائل المبدئية
        initialMessages.forEach((msg)=>this.addMessage(msg));
        return this.messages;
    }
};
// إنشاء رسائل أولية عند بدء التشغيل
if (chatStore.messages.length === 0) {
    chatStore.createInitialMessages();
}
const __TURBOPACK__default__export__ = chatStore;
}}),
"[project]/src/app/api/socket/fallback/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$chatStore$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/chatStore.js [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        // قراءة آخر الرسائل
        const messages = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$chatStore$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chatStore"].getMessages(20);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            messages,
            mode: 'fallback',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching fallback messages:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في جلب بيانات الدردشة الاحتياطية',
            mode: 'error'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        if (!body.message || !body.sender) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'بيانات غير مكتملة',
                mode: 'error'
            }, {
                status: 400
            });
        }
        // إضافة رسالة جديدة عبر المخزن المشترك
        const newMessage = {
            message: body.message,
            sender: body.sender,
            senderAvatarId: body.senderAvatarId || 1,
            timestamp: new Date().toISOString(),
            interaction: {
                likes: [],
                isLiked: false
            }
        };
        const savedMessage = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$chatStore$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chatStore"].addMessage(newMessage);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: savedMessage,
            mode: 'fallback'
        });
    } catch (error) {
        console.error('Error adding fallback message:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'فشل في إضافة الرسالة',
            mode: 'error'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ba6316da._.js.map