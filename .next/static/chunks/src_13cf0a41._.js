(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/mockData.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/chat/ChatWindow.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ChatWindow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/userSettings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ChatWindow({ locale }) {
    _s();
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        nickname: '',
        avatarId: 0
    });
    const [onlineUsers, setOnlineUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typingUsers, setTypingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isRTL = locale === 'ar';
    // إضافة حالة لتتبع حالة الاتصال ورسائل الخطأ
    const [connectionState, setConnectionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: 'connecting',
        errorCount: 0,
        lastError: null,
        retryCount: 0
    });
    // إعداد اتصال Socket.IO
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                let pollInterval;
                // تحديث حالة الاتصال
                setConnectionState({
                    "ChatWindow.useEffect": (prev)=>({
                            ...prev,
                            status: 'connecting'
                        })
                }["ChatWindow.useEffect"]);
                // استخدام طريقة استطلاع بدلاً من Socket.IO لتجنب الأخطاء
                async function setupChatConnection() {
                    try {
                        // جلب الرسائل الأولية
                        await fetchMessages();
                        // بدء استطلاع للرسائل الجديدة
                        startPolling();
                        // تعيين حالة الاتصال
                        setConnectionState({
                            "ChatWindow.useEffect.setupChatConnection": (prev)=>({
                                    ...prev,
                                    status: 'connected',
                                    errorCount: 0,
                                    lastError: null
                                })
                        }["ChatWindow.useEffect.setupChatConnection"]);
                        // إنشاء كائن وهمي لواجهة Socket.IO
                        const mockSocket = {
                            emit: {
                                "ChatWindow.useEffect.setupChatConnection": (event, data)=>{
                                    console.log(`[Mock Socket] Emitting ${event}:`, data);
                                    // إرسال الرسائل عبر API
                                    if (event === 'send-message' && data) {
                                        sendMessage(data);
                                    }
                                    // إرسال حالة الكتابة (لا حاجة للإرسال، فقط تحديث الحالة محلياً)
                                    if (event === 'user-typing' && data) {
                                    // لا شيء حالياً، يمكن تنفيذه مستقبلاً
                                    }
                                }
                            }["ChatWindow.useEffect.setupChatConnection"],
                            connected: true,
                            disconnected: false
                        };
                        setSocket(mockSocket);
                    } catch (error) {
                        console.error('Chat connection error:', error);
                        setConnectionState({
                            "ChatWindow.useEffect.setupChatConnection": (prev)=>({
                                    ...prev,
                                    status: 'error',
                                    errorCount: prev.errorCount + 1,
                                    lastError: error.message
                                })
                        }["ChatWindow.useEffect.setupChatConnection"]);
                    }
                }
                // جلب الرسائل
                async function fetchMessages() {
                    try {
                        setIsLoading(true);
                        const response = await fetch('/api/socket');
                        if (!response.ok) {
                            throw new Error(`HTTP error ${response.status}`);
                        }
                        const data = await response.json();
                        if (data.success) {
                            setMessages(data.messages || []);
                            // تحديث قائمة المستخدمين المتصلين
                            if (data.users) {
                                setOnlineUsers(data.users);
                            }
                            setIsLoading(false);
                        } else {
                            throw new Error(data.error || 'فشل في جلب الرسائل');
                        }
                    } catch (error) {
                        console.error('Error fetching messages:', error);
                        setError('فشل في تحميل رسائل الدردشة');
                        setMessages([]);
                    } finally{
                        setIsLoading(false);
                    }
                }
                // إرسال رسالة
                async function sendMessage(messageData) {
                    try {
                        const response = await fetch('/api/socket', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(messageData)
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error ${response.status}`);
                        }
                        const data = await response.json();
                        if (!data.success) {
                            throw new Error(data.error || 'فشل في إرسال الرسالة');
                        }
                        // إضافة الرسالة الجديدة إلى القائمة المحلية
                        if (data.message) {
                            setMessages({
                                "ChatWindow.useEffect.sendMessage": (prev)=>{
                                    // البحث عن رسالة محلية للاستبدال
                                    const localIndex = prev.findIndex({
                                        "ChatWindow.useEffect.sendMessage.localIndex": (msg)=>msg.id.startsWith('local-') && msg.message === data.message.message && msg.sender === data.message.sender
                                    }["ChatWindow.useEffect.sendMessage.localIndex"]);
                                    if (localIndex !== -1) {
                                        // استبدال الرسالة المحلية
                                        const updatedMessages = [
                                            ...prev
                                        ];
                                        updatedMessages[localIndex] = data.message;
                                        return updatedMessages;
                                    }
                                    // إضافة الرسالة الجديدة
                                    return [
                                        ...prev,
                                        data.message
                                    ];
                                }
                            }["ChatWindow.useEffect.sendMessage"]);
                        }
                    } catch (error) {
                        console.error('Error sending message:', error);
                    }
                }
                // بدء استطلاع للرسائل الجديدة
                function startPolling() {
                    if (pollInterval) {
                        clearInterval(pollInterval);
                    }
                    // استطلاع كل 5 ثوانٍ
                    pollInterval = setInterval({
                        "ChatWindow.useEffect.startPolling": async ()=>{
                            try {
                                const response = await fetch('/api/socket');
                                if (!response.ok) {
                                    throw new Error(`HTTP error ${response.status}`);
                                }
                                const data = await response.json();
                                if (data.success) {
                                    // تحديث الرسائل إذا كانت هناك رسائل جديدة
                                    const newMessages = data.messages || [];
                                    setMessages({
                                        "ChatWindow.useEffect.startPolling": (prevMessages)=>{
                                            // تجميع معرفات الرسائل الحالية
                                            const existingIds = new Set(prevMessages.map({
                                                "ChatWindow.useEffect.startPolling": (msg)=>msg.id
                                            }["ChatWindow.useEffect.startPolling"]));
                                            // فلترة الرسائل الجديدة فقط
                                            const newUniqueMessages = newMessages.filter({
                                                "ChatWindow.useEffect.startPolling.newUniqueMessages": (msg)=>!existingIds.has(msg.id)
                                            }["ChatWindow.useEffect.startPolling.newUniqueMessages"]);
                                            // إذا لم تكن هناك رسائل جديدة، لا تقم بتحديث الحالة
                                            if (newUniqueMessages.length === 0) {
                                                return prevMessages;
                                            }
                                            // إضافة الرسائل الجديدة
                                            return [
                                                ...prevMessages,
                                                ...newUniqueMessages
                                            ];
                                        }
                                    }["ChatWindow.useEffect.startPolling"]);
                                    // تحديث قائمة المستخدمين المتصلين
                                    if (data.users) {
                                        setOnlineUsers(data.users);
                                    }
                                }
                            } catch (error) {
                                console.error('Error during polling:', error);
                            // لا نقوم بتعيين حالة خطأ لتجنب تعطيل واجهة المستخدم
                            }
                        }
                    }["ChatWindow.useEffect.startPolling"], 5000);
                }
                // بدء الاتصال
                setupChatConnection();
                // تنظيف عند إلغاء تحميل المكون
                return ({
                    "ChatWindow.useEffect": ()=>{
                        if (pollInterval) {
                            clearInterval(pollInterval);
                        }
                    }
                })["ChatWindow.useEffect"];
            }
        }
    }["ChatWindow.useEffect"], [
        userProfile
    ]);
    // تحميل إعدادات المستخدم عند بدء المكون
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            // استدعاء API لجلب إعدادات المستخدم
            const fetchUserSettings = {
                "ChatWindow.useEffect.fetchUserSettings": async ()=>{
                    try {
                        // أولا، نحاول الحصول على الإعدادات من localStorage
                        const localSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserSettings"])();
                        if (localSettings) {
                            setUserProfile(localSettings);
                        }
                        // ثم نحاول الحصول على الإعدادات من API
                        const response = await fetch('/api/user/settings');
                        if (response.ok) {
                            const data = await response.json();
                            if (data.success && data.settings) {
                                setUserProfile(data.settings);
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching user settings:', error);
                    }
                }
            }["ChatWindow.useEffect.fetchUserSettings"];
            fetchUserSettings();
        }
    }["ChatWindow.useEffect"], []);
    // التمرير التلقائي لأسفل عند إضافة رسائل جديدة
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            // التمرير فقط داخل منطقة الرسائل
            const messagesContainer = messagesEndRef.current?.parentElement;
            if (messagesContainer && messagesEndRef.current) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }["ChatWindow.useEffect"], [
        messages
    ]);
    // الحصول على صورة المستخدم من معرف الأفاتار
    const getAvatarSrc = (avatarId)=>{
        // ضمان أن avatarId عدد
        const numericId = Number(avatarId) || 1;
        // البحث عن الأفاتار بالمعرف الصحيح
        const avatar = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_AVATARS"].find((a)=>a.id === numericId);
        if (avatar) {
            return avatar.src;
        }
        // إذا لم يتم العثور على الصورة، استخدم الصورة الافتراضية
        console.log('لم يتم العثور على الأفاتار بالمعرف:', numericId);
        return '/images/avatars/hero_icon_8_wake.png'; // صورة افتراضية
    };
    // إرسال حالة الكتابة للمستخدمين الآخرين
    const handleTyping = (e)=>{
        setMessage(e.target.value);
        if (socket && userProfile.nickname) {
            socket.emit('user-typing', {
                room: 'global',
                username: userProfile.nickname,
                isTyping: e.target.value.trim() !== ''
            });
        }
    };
    // إرسال رسالة جديدة
    const handleSend = async (e)=>{
        e.preventDefault();
        if (message.trim()) {
            // التحقق من وجود ملف شخصي للمستخدم
            if (!userProfile.nickname) {
                // توجيه المستخدم لإنشاء ملف شخصي
                alert('يجب إنشاء ملف شخصي قبل إرسال رسائل. سيتم توجيهك إلى صفحة الملف الشخصي.');
                window.location.href = '/blog/profile';
                return;
            }
            setIsTyping(false);
            if (socket) {
                socket.emit('user-typing', {
                    room: 'global',
                    username: userProfile.nickname,
                    isTyping: false
                });
            }
            try {
                const messageData = {
                    message: message.trim(),
                    sender: userProfile.nickname,
                    senderAvatarId: userProfile.avatarId
                };
                // إنشاء رسالة محلية للعرض الفوري
                const localMessage = {
                    id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    ...messageData,
                    timestamp: new Date().toISOString(),
                    interaction: {
                        likes: [],
                        isLiked: false
                    }
                };
                // إضافة الرسالة محليًا فوراً للتجربة المستخدم الأفضل
                setMessages((prev)=>[
                        ...prev,
                        localMessage
                    ]);
                setMessage('');
                try {
                    // محاولة إرسال الرسالة إلى API
                    const response = await fetch('/api/chat/messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(messageData)
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success) {
                            // إرسال الرسالة عبر socket.io لكل المتصلين
                            if (socket) {
                                socket.emit('send-message', {
                                    room: 'global',
                                    ...messageData
                                });
                            }
                        }
                    }
                } catch (apiError) {
                    console.warn('تعذر إرسال الرسالة إلى API:', apiError);
                // لا نحتاج إلى القيام بأي شيء هنا لأن الرسالة تم إضافتها بالفعل في واجهة المستخدم
                }
            // إزالة الردود التلقائية بناءً على طلب المستخدم
            } catch (error) {
                console.error('Error sending message:', error);
                alert(`فشل في إرسال الرسالة: ${error.message}`);
            }
        }
    };
    // إضافة وظيفة التعامل مع الإعجاب بالرسائل
    const handleLikeMessage = async (messageId)=>{
        // التحقق من وجود ملف شخصي للمستخدم
        if (!userProfile.nickname) {
            alert('يجب إنشاء ملف شخصي قبل الإعجاب بالرسائل');
            return;
        }
        try {
            // تحديث الإعجاب محليًا أولاً
            setMessages((prev)=>prev.map((msg)=>{
                    if (msg.id === messageId) {
                        const userLiked = msg.interaction.likes.includes('currentUserId');
                        return {
                            ...msg,
                            interaction: {
                                ...msg.interaction,
                                likes: userLiked ? msg.interaction.likes.filter((id)=>id !== 'currentUserId') : [
                                    ...msg.interaction.likes,
                                    'currentUserId'
                                ],
                                isLiked: !userLiked
                            }
                        };
                    }
                    return msg;
                }));
            try {
                // محاولة إرسال الإعجاب إلى API
                const response = await fetch('/api/chat/messages/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messageId,
                        userId: 'currentUserId' // في نظام حقيقي، سيتم استخدام معرف المستخدم الفعلي
                    })
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                    // في حالة نجاح API، يمكن تحديث الحالة بشكل دقيق
                    // لكن ليس ضروريًا لأننا قمنا بتحديث الواجهة مسبقًا
                    }
                }
            } catch (apiError) {
                console.warn('تعذر تحديث الإعجاب عبر API:', apiError);
            // لا نحتاج إلى القيام بأي شيء لأن التحديث المحلي تم بالفعل
            }
        } catch (error) {
            console.error('Error liking message:', error);
        // يمكن إضافة إشعار للمستخدم هنا
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-10 px-2 sm:px-4 max-w-6xl mx-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-2xl overflow-hidden border border-blue-500/30 transition-all duration-300 hover:shadow-blue-400/20 hover:shadow-2xl h-[600px] flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-blue-800 to-blue-900 p-3 sm:p-4 border-b border-blue-700 flex justify-between items-center flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600/50 mr-2 sm:mr-3 border border-blue-400/40",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "w-3 h-3 sm:w-4 sm:h-4 text-blue-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 445,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 446,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base sm:text-xl font-bold text-white",
                                    children: "دردشة الفاتحون المباشرة"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                            lineNumber: 442,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-blue-200 text-xs sm:text-sm flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 452,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        onlineUsers.length,
                                        " لاعب متصل حالياً"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 453,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                            lineNumber: 451,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                    lineNumber: 441,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:block w-64 bg-gradient-to-b from-blue-950 to-blue-900 border-l border-blue-700/50 py-4 px-3 overflow-y-auto flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-blue-200 font-bold mb-4 pb-2 border-b border-blue-700/70 flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "currentColor",
                                            className: "w-4 h-4 text-green-400 mr-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 462,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 463,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 461,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "اللاعبين المتصلين"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 465,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 460,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 p-2 rounded-lg border border-blue-700/50 bg-blue-900/30",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-blue-300 text-xs",
                                                    children: "حالة الاتصال:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 471,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center",
                                                    children: [
                                                        connectionState.status === 'connected' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 475,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-400 text-xs",
                                                                    children: "متصل"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 476,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        connectionState.status === 'connecting' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 482,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-yellow-400 text-xs",
                                                                    children: "جاري الاتصال..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        connectionState.status === 'fallback' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-orange-400 text-xs",
                                                                    children: "وضع محدود"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 490,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true),
                                                        connectionState.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 bg-red-400 rounded-full animate-pulse mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 496,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-400 text-xs",
                                                                    children: "خطأ في الاتصال"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 497,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 472,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 470,
                                            columnNumber: 15
                                        }, this),
                                        (connectionState.status === 'error' || connectionState.status === 'fallback') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "w-full mt-1 py-1 px-2 bg-blue-700 hover:bg-blue-600 text-white text-xs rounded transition-colors",
                                            onClick: ()=>window.location.reload(),
                                            children: "إعادة الاتصال"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 505,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 469,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        userProfile?.nickname && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center py-2 px-3 rounded-lg bg-blue-800/40 border border-blue-600/30 mb-4 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-9 h-9 rounded-full overflow-hidden mr-2 border-2 border-blue-400 shadow-md",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: getAvatarSrc(userProfile.avatarId),
                                                        alt: userProfile.nickname,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 519,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 518,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-white font-semibold",
                                                            children: userProfile.nickname
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 526,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-300 text-xs",
                                                            children: "أنت - متصل الآن"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 527,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 525,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: onlineUsers.map((user, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center py-2 px-3 rounded-lg hover:bg-blue-800/20 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 rounded-full overflow-hidden border border-blue-400/50",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: getAvatarSrc(user.avatarId),
                                                                        alt: user.name,
                                                                        className: "w-full h-full object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                        lineNumber: 538,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 537,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-blue-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 536,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-100 mr-2",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 546,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, user.name || `user-${index}`, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 535,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 533,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 514,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                            lineNumber: 459,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full md:flex-1 flex flex-col bg-gradient-to-b from-gray-900/80 to-blue-950/80 overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden bg-blue-900/60 p-2 border-b border-blue-700/30 overflow-x-auto flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-2 rtl:space-x-reverse",
                                        children: [
                                            userProfile?.nickname && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 flex flex-col items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full overflow-hidden border-2 border-blue-400/40",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: getAvatarSrc(userProfile.avatarId),
                                                            alt: userProfile.nickname,
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 560,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-200 text-xs mt-1",
                                                        children: "أنت"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 567,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 559,
                                                columnNumber: 19
                                            }, this),
                                            onlineUsers.map((user, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-shrink-0 flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-8 h-8 rounded-full overflow-hidden border border-blue-400/30",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: getAvatarSrc(user.avatarId),
                                                                        alt: user.name,
                                                                        className: "w-full h-full object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                        lineNumber: 575,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 574,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-blue-900"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 581,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 573,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-blue-200 text-xs mt-1 whitespace-nowrap max-w-[4rem] truncate",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 583,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, user.name || `mobile-user-${index}`, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                        lineNumber: 557,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 556,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4 flex flex-col-reverse",
                                    children: [
                                        typingUsers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-blue-300 text-xs sm:text-sm mb-2 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex space-x-1 rtl:space-x-reverse items-center mr-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce",
                                                            style: {
                                                                animationDelay: "0ms"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 594,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce",
                                                            style: {
                                                                animationDelay: "150ms"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 595,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce",
                                                            style: {
                                                                animationDelay: "300ms"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 596,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 593,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: typingUsers.length === 1 ? `${typingUsers[0]} يكتب الآن...` : `${typingUsers.length} لاعبين يكتبون الآن...`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 598,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 592,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 606,
                                            columnNumber: 15
                                        }, this),
                                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center justify-center h-full opacity-80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 610,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-blue-300",
                                                    children: "جاري تحميل المحادثات..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 611,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 609,
                                            columnNumber: 17
                                        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center justify-center h-full opacity-80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    viewBox: "0 0 24 24",
                                                    fill: "currentColor",
                                                    className: "w-12 h-12 text-red-400 mb-3 opacity-70",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 616,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 615,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-red-300 text-center max-w-xs",
                                                    children: [
                                                        "فشل في تحميل المحادثات: ",
                                                        error
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 618,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
                                                    onClick: ()=>window.location.reload(),
                                                    children: "إعادة المحاولة"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 619,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 614,
                                            columnNumber: 17
                                        }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center justify-center h-full opacity-80",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    viewBox: "0 0 24 24",
                                                    fill: "currentColor",
                                                    className: "w-12 h-12 text-blue-400 mb-3 opacity-70",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 629,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 628,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-blue-300 text-center max-w-xs",
                                                    children: "لا توجد رسائل بعد. كن أول من يبدأ المحادثة!"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 631,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, this) : [
                                            ...messages
                                        ].reverse().map((msg, index)=>{
                                            const formattedDate = new Date(msg.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            });
                                            const isCurrentUser = userProfile.nickname && msg.sender === userProfile.nickname;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `mb-3 max-w-[90%] sm:max-w-[85%] ${isCurrentUser ? 'self-end ml-auto' : 'self-start'} animate-fade-in`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-1 sm:gap-2",
                                                    children: [
                                                        !isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/40 overflow-hidden shadow-md",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: getAvatarSrc(msg.senderAvatarId),
                                                                    alt: msg.sender,
                                                                    className: "w-full h-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 647,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 646,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 645,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `${isCurrentUser ? 'order-1' : 'order-2'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-baseline mb-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-bold text-blue-200 text-sm sm:text-base mr-2",
                                                                            children: msg.sender
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                            lineNumber: 657,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs text-blue-400",
                                                                            children: formattedDate
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                            lineNumber: 658,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 656,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `rounded-lg p-2 sm:p-3 shadow-lg ${isCurrentUser ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none' : 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 rounded-tl-none'}`,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "whitespace-pre-wrap break-words text-sm sm:text-base",
                                                                            children: msg.message
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                            lineNumber: 666,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center justify-end mt-1.5 text-xs",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                className: "flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity",
                                                                                onClick: ()=>handleLikeMessage(msg.id),
                                                                                children: [
                                                                                    msg.interaction?.isLiked || msg.interaction?.likes && msg.interaction.likes.includes('currentUserId') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        viewBox: "0 0 24 24",
                                                                                        fill: "currentColor",
                                                                                        className: "w-4 h-4 text-red-400",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                            lineNumber: 674,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                        lineNumber: 673,
                                                                                        columnNumber: 35
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                                        fill: "none",
                                                                                        viewBox: "0 0 24 24",
                                                                                        strokeWidth: 1.5,
                                                                                        stroke: "currentColor",
                                                                                        className: "w-4 h-4",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            strokeLinecap: "round",
                                                                                            strokeLinejoin: "round",
                                                                                            d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                            lineNumber: 678,
                                                                                            columnNumber: 37
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                        lineNumber: 677,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "mr-1",
                                                                                        children: msg.interaction?.likes?.length || 0
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                        lineNumber: 681,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                                lineNumber: 668,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                            lineNumber: 667,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 660,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 655,
                                                            columnNumber: 27
                                                        }, this),
                                                        isCurrentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/40 overflow-hidden shadow-md",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: getAvatarSrc(msg.senderAvatarId),
                                                                    alt: msg.sender,
                                                                    className: "w-full h-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 689,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 688,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 687,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 643,
                                                    columnNumber: 23
                                                }, this)
                                            }, msg.id || `message-${index}-${msg.timestamp}`, false, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 639,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 590,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 sm:p-4 border-t border-blue-800/40 bg-gradient-to-r from-blue-900/40 to-blue-950/40 flex-shrink-0",
                                    children: [
                                        connectionState.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 p-2 rounded-lg bg-red-900/30 border border-red-700/50 text-xs text-red-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            className: "w-4 h-4 mr-1 text-red-400",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                fillRule: "evenodd",
                                                                d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z",
                                                                clipRule: "evenodd"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 711,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 710,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "يوجد مشكلة في الاتصال"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 713,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 709,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "بعض ميزات الدردشة قد لا تعمل. يمكنك إرسال رسائل ولكن قد لا تظهر الردود فورًا."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 715,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "mt-1 py-1 px-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors",
                                                    onClick: ()=>window.location.reload(),
                                                    children: "إعادة تحميل الصفحة"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 716,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 708,
                                            columnNumber: 17
                                        }, this),
                                        connectionState.status === 'fallback' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 p-2 rounded-lg bg-yellow-900/20 border border-yellow-700/30 text-xs text-yellow-200",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className: "w-4 h-4 mr-1 text-yellow-400",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            fillRule: "evenodd",
                                                            d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                                                            clipRule: "evenodd"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 730,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 729,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "الدردشة تعمل في الوضع المحدود"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 732,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 728,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: handleSend,
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: message,
                                                            onChange: handleTyping,
                                                            placeholder: "اكتب رسالتك هنا...",
                                                            className: "w-full p-2 sm:p-3 pr-10 sm:pr-12 rounded-xl bg-blue-900/30 text-white border border-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner placeholder-blue-400/70 text-sm sm:text-base"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 739,
                                                            columnNumber: 19
                                                        }, this),
                                                        userProfile?.nickname ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute right-2 sm:right-3 bottom-1 sm:bottom-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-blue-600/40",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: getAvatarSrc(userProfile.avatarId),
                                                                alt: userProfile.nickname,
                                                                className: "w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 748,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 747,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute right-2 sm:right-3 bottom-1.5 sm:bottom-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 24 24",
                                                                fill: "currentColor",
                                                                className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-400/70",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                                                    clipRule: "evenodd"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 757,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 756,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 755,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 738,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "p-2 sm:p-3 px-3 sm:px-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 group text-sm sm:text-base",
                                                    disabled: !message.trim() || !userProfile?.nickname,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            viewBox: "0 0 24 24",
                                                            fill: "currentColor",
                                                            className: "w-4 h-4 sm:w-5 sm:h-5 transform rotate-180 transition-transform group-hover:translate-x-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 768,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 767,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "إرسال"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                            lineNumber: 770,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 762,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 737,
                                            columnNumber: 15
                                        }, this),
                                        !userProfile?.nickname && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 text-center p-2 bg-blue-900/20 rounded-lg border border-blue-800/30 text-blue-300 text-xs sm:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "يجب إنشاء ملف شخصي قبل المشاركة في الدردشة. "
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 776,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "/blog/profile",
                                                    className: "text-blue-400 hover:text-blue-300 underline",
                                                    children: "انقر هنا لإنشاء ملفك الشخصي"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                    lineNumber: 777,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                            lineNumber: 775,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 705,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-2 sm:p-3 bg-blue-900 border-t border-blue-700 flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:justify-between sm:items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-blue-200 text-xs sm:text-sm mb-2 sm:mb-0",
                                                children: "للتواصل المباشر:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 785,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap gap-3 justify-around sm:space-x-4 sm:rtl:space-x-reverse",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://t.me/storefathon1",
                                                        target: "_blank",
                                                        className: "flex items-center text-blue-200 hover:text-white text-xs sm:text-sm",
                                                        rel: "noopener noreferrer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 24 24",
                                                                fill: "currentColor",
                                                                className: "w-4 h-4 sm:w-5 sm:h-5 me-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.24-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.67-.4-.68-.23-1.21-.35-1.16-.74.02-.2.3-.4.81-.6 3.17-1.35 5.29-2.24 6.39-2.68 3.05-1.24 3.69-1.46 4.1-1.47.09 0 .29.02.42.16.11.1.14.26.16.37.01.09.02.28 0 .38z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 794,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 793,
                                                                columnNumber: 21
                                                            }, this),
                                                            "تلجرام"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 787,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://wa.me/201062047932",
                                                        target: "_blank",
                                                        className: "flex items-center text-blue-200 hover:text-white text-xs sm:text-sm",
                                                        rel: "noopener noreferrer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 24 24",
                                                                fill: "currentColor",
                                                                className: "w-4 h-4 sm:w-5 sm:h-5 me-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M17.6 6.32C16.16 4.91 14.13 4 12 4s-4.16.91-5.6 2.32C5.01 7.76 4 9.83 4 12c0 1.56.45 3.06 1.3 4.3L4.11 20.1l3.89-1.19c1.2.75 2.6 1.19 4 1.19 2.14 0 4.16-.91 5.6-2.32C18.99 16.24 20 14.17 20 12c0-2.17-1.01-4.24-2.4-5.68zM12 18.5c-1.29 0-2.5-.37-3.56-1.03l-.26-.15-2.79.86.87-2.71-.17-.29c-.71-1.21-1.08-2.63-1.08-4.18 0-4.55 3.7-8.25 8.25-8.25S21.5 7.45 21.5 12s-3.7 8.25-8.25 8.25zm2.25-6.15c.15.08.29.17.42.25.34.19.45.39.53.64.07.25.07.5.05.6-.02.11-.05.26-.22.41-.16.15-.34.2-.47.24-.7.22-1.62.38-2.31-.44-.17-.2-.28-.45-.35-.79-.06-.33-.03-.67.08-.98.11-.29.32-.51.56-.65.25-.15.51-.23.73-.29.54-.15 1.08.17.64.77-.44.59.21.73.34.85z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 805,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 804,
                                                                columnNumber: 21
                                                            }, this),
                                                            "واتساب"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 798,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "tel:+201062047932",
                                                        className: "flex items-center text-blue-200 hover:text-white text-xs sm:text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 24 24",
                                                                fill: "currentColor",
                                                                className: "w-4 h-4 sm:w-5 sm:h-5 me-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 814,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 813,
                                                                columnNumber: 21
                                                            }, this),
                                                            "اتصل بنا"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 809,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://t.me/Moon_ClawoaN",
                                                        target: "_blank",
                                                        className: "flex items-center text-blue-200 hover:text-white text-xs sm:text-sm",
                                                        rel: "noopener noreferrer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 24 24",
                                                                fill: "currentColor",
                                                                className: "w-4 h-4 sm:w-5 sm:h-5 me-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.24-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.67-.4-.68-.23-1.21-.35-1.16-.74.02-.2.3-.4.81-.6 3.17-1.35 5.29-2.24 6.39-2.68 3.05-1.24 3.69-1.46 4.1-1.47.09 0 .29.02.42.16.11.1.14.26.16.37.01.09.02.28 0 .38z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                    lineNumber: 825,
                                                                    columnNumber: 23
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                                lineNumber: 824,
                                                                columnNumber: 21
                                                            }, this),
                                                            "تلجرام ٢"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                        lineNumber: 818,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                                lineNumber: 786,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                        lineNumber: 784,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                                    lineNumber: 783,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/chat/ChatWindow.jsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/chat/ChatWindow.jsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/chat/ChatWindow.jsx",
            lineNumber: 439,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/chat/ChatWindow.jsx",
        lineNumber: 438,
        columnNumber: 5
    }, this);
}
_s(ChatWindow, "xiob8hyM+W+RtjK8zox0F4HaFPA=");
_c = ChatWindow;
var _c;
__turbopack_context__.k.register(_c, "ChatWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/chat/ChatWindow.jsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/chat/ChatWindow.jsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_13cf0a41._.js.map