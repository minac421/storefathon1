(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/types/blog.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/blog/components/PostCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PostCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/userSettings.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function PostCard({ id, slug, title, summary, category, featuredImage, author, createdAt, commentsCount, likesCount, isLiked = false, ...otherProps }) {
    _s();
    // استخدام معرف المنشور الفعلي (مع معالجة القيم الفارغة)
    const postId = id || "";
    // قم بإنشاء ID ثابت للمنشور في حالة عدم وجوده، لتجنب مشاكل التولد العشوائي مع Date.now()
    const stablePostId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "PostCard.useMemo[stablePostId]": ()=>{
            // محاولة استخدام id أولاً ثم _id إذا كان متاحًا
            let idToUse = postId;
            // البحث عن _id في حالة كان هناك (في بعض الأحيان تصل البيانات من الخادم بتنسيق مختلف)
            if ((!idToUse || idToUse.length === 0) && otherProps._id) {
                console.info('استخدام _id بدلاً من id الفارغ');
                idToUse = otherProps._id;
            }
            // يجب أن يكون idToUse معرفًا صالحًا من MongoDB أو نقوم بإرجاع قيمة فارغة
            // معرفات MongoDB تتكون من 24 حرفًا سداسي عشري أو تكون رقمًا أو سلسلة أحرف معينة
            if (idToUse && (idToUse.length === 24 || /^[0-9a-fA-F]{24}$/.test(idToUse))) {
                return idToUse;
            }
            // لا ننشئ معرفًا عشوائيًا بل نعيد قيمة فارغة لتجنب أخطاء التحقق في الخادم
            return "";
        }
    }["PostCard.useMemo[stablePostId]"], [
        postId,
        otherProps
    ]);
    // التأكد من أن معرف المنشور متوفر دائمًا
    const [liked, setLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isLiked);
    const [likes, setLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(likesCount);
    const [showReactions, setShowReactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedReaction, setSelectedReaction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comment, setComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmittingComment, setIsSubmittingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingComments, setIsLoadingComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [commentError, setCommentError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ملاحظة: نستخدم معرف المنشور الفعلي مباشرة
    // تحميل بيانات المستخدم من التخزين المحلي
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PostCard.useEffect": ()=>{
            setUserProfile((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserSettings"])());
        }
    }["PostCard.useEffect"], []);
    // عرض صورة المستخدم اعتمادًا على الإعدادات
    const getUserAvatar = ()=>{
        const userSettings = userProfile;
        if (userSettings && userSettings.avatarId) {
            const avatar = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AVAILABLE_AVATARS"].find((a)=>a.id === userSettings.avatarId);
            if (avatar) {
                // إذا كانت الصور موجودة فعليًا، استخدم مكون Image
                // return (
                //   <Image
                //     src={avatar.src}
                //     alt={avatar.alt}
                //     width={32}
                //     height={32}
                //     className="w-full h-full object-cover"
                //   />
                // );
                // بديل مؤقت حتى تتوفر الصور
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full h-full flex items-center justify-center bg-amber-100 text-amber-800",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserInitial"])(userSettings.nickname)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 104,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this);
            }
        }
        // صورة افتراضية إذا لم تكن هناك إعدادات
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center bg-gray-300 text-gray-600",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-4 h-4",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 113,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/blog/components/PostCard.tsx",
            lineNumber: 112,
            columnNumber: 7
        }, this);
    };
    // تحويل التصنيف إلى نص عربي
    const getCategoryName = (category)=>{
        switch(category){
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].NEWS:
                return 'أخبار';
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].GUIDE:
                return 'دليل';
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].TIPS:
                return 'نصائح';
            default:
                return 'عام';
        }
    };
    // تنسيق التاريخ
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };
    // تحويل رمز التفاعل إلى اسمه بالعربية
    const getReactionName = (reaction)=>{
        switch(reaction){
            case '⚔️':
                return 'سيف';
            case '👑':
                return 'تاج';
            case '🏰':
                return 'قلعة';
            case '🔥':
                return 'نار';
            case '🛡️':
                return 'درع';
            case '🏹':
                return 'قوس';
            case '❤️':
                return 'قلب';
            case '😂':
                return 'ضحك';
            default:
                return 'تفاعل';
        }
    };
    // وظيفة لتحميل التعليقات
    const loadComments = async ()=>{
        // إذا لم يكن هناك معرف منشور صالح، لا تحاول تحميل التعليقات
        if (!stablePostId) {
            console.info('تخطي تحميل التعليقات: لا يوجد معرف منشور صالح');
            return;
        }
        setIsLoadingComments(true);
        setCommentError(null); // مسح أي أخطاء سابقة
        try {
            // محاولة واحدة فقط لجلب التعليقات مع معالجة الأخطاء
            console.log('جاري تحميل تعليقات المنشور:', stablePostId);
            // معالجة وتصحيح معرف المنشور
            // 1. يمكننا استخدام slug بدلاً من id إذا كان موجودًا
            // 2. تصحيح معرف المنشور إذا كان بصيغة غير صالحة
            const postIdentifier = slug && slug.length > 0 ? slug : stablePostId;
            console.log('سيتم استخدام معرف:', {
                postIdentifier,
                originalId: stablePostId,
                slug
            });
            // استخدام AbortController للتحكم في طلب الشبكة
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 15000); // زيادة المهلة إلى 15 ثانية
            // إضافة محاولات متعددة للحصول على التعليقات بأساليب مختلفة
            let fetchSuccess = false;
            let responseData = null;
            let fetchError = null;
            try {
                // محاولة 1: استخدام postIdentifier (slug أو id)
                console.log('جاري محاولة الحصول على التعليقات باستخدام:', postIdentifier);
                // تنفيذ استدعاء API للحصول على التعليقات
                const response = await fetch(`/api/blog/comments?postId=${encodeURIComponent(postIdentifier)}`, {
                    signal: controller.signal,
                    cache: 'no-store',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                clearTimeout(timeoutId);
                if (response.ok) {
                    responseData = await response.json();
                    fetchSuccess = true;
                    console.log('تم استلام التعليقات بنجاح باستخدام:', postIdentifier);
                } else {
                    // حفظ رسالة الخطأ للمحاولة التالية
                    fetchError = `${response.status} ${response.statusText}`;
                    console.warn(`فشل الحصول على التعليقات باستخدام ${postIdentifier}، الخطأ:`, fetchError);
                    // محاولة 2: استخدام معرف المنشور مباشرة إذا كان مختلفًا عن postIdentifier
                    if (stablePostId !== postIdentifier) {
                        console.log('محاولة ثانية باستخدام معرف المنشور الأصلي:', stablePostId);
                        const response2 = await fetch(`/api/blog/comments?postId=${encodeURIComponent(stablePostId)}`, {
                            cache: 'no-store',
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if (response2.ok) {
                            responseData = await response2.json();
                            fetchSuccess = true;
                            console.log('تم استلام التعليقات بنجاح في المحاولة الثانية');
                        } else {
                            fetchError = `${response2.status} ${response2.statusText}`;
                            console.warn('فشل الحصول على التعليقات في المحاولة الثانية، الخطأ:', fetchError);
                            // محاولة 3: استخدام واجهة API تفاعلات المنشور إذا كانت متاحة
                            try {
                                console.log('محاولة ثالثة باستخدام API التفاعلات:', stablePostId);
                                const response3 = await fetch(`/api/blog/interactions?postId=${encodeURIComponent(stablePostId)}&type=comments`, {
                                    cache: 'no-store',
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                if (response3.ok) {
                                    const interactionsData = await response3.json();
                                    if (interactionsData.success && interactionsData.comments) {
                                        responseData = {
                                            success: true,
                                            comments: interactionsData.comments
                                        };
                                        fetchSuccess = true;
                                        console.log('تم استلام التعليقات بنجاح من API التفاعلات');
                                    }
                                }
                            } catch (interactionsError) {
                                console.warn('فشل الحصول على التعليقات من API التفاعلات:', interactionsError);
                            }
                        }
                    }
                }
                if (!fetchSuccess) {
                    throw new Error(`فشل في جلب التعليقات: ${fetchError}`);
                }
                // معالجة البيانات المستلمة
                if (responseData && responseData.success) {
                    console.log('تم استلام بيانات التعليقات بنجاح:', {
                        success: responseData.success,
                        commentCount: responseData.comments?.length || 0
                    });
                    // تحويل التعليقات من الصيغة الجديدة إلى الصيغة المستخدمة في المكون
                    const transformedComments = (responseData.comments || []).map((comment)=>({
                            id: comment.id || comment._id || `local-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                            text: comment.text || comment.content,
                            author: typeof comment.author === 'object' ? comment.author.name : comment.author,
                            authorAvatarId: comment.authorAvatarId || (comment.author && typeof comment.author === 'object' && comment.author.avatar ? parseInt(comment.author.avatar.replace(/[^\d]/g, '')) || 1 : 1),
                            createdAt: comment.createdAt || new Date().toISOString(),
                            postId: comment.postId || stablePostId
                        }));
                    // ترتيب التعليقات من الأحدث إلى الأقدم
                    transformedComments.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setComments(transformedComments);
                    console.log('تم تعيين التعليقات بنجاح:', {
                        count: transformedComments.length
                    });
                } else {
                    throw new Error('فشل في تحميل التعليقات: استجابة غير متوقعة');
                }
            } catch (fetchError) {
                if (fetchError.name === 'AbortError') {
                    console.warn('تم إلغاء طلب التعليقات بسبب تجاوز المهلة', {
                        postId: stablePostId
                    });
                    throw new Error('تم تجاوز مهلة تحميل التعليقات');
                }
                throw fetchError;
            }
        } catch (error) {
            console.error('خطأ في تحميل التعليقات:', error, {
                postId: stablePostId
            });
            // التعامل مع أنواع مختلفة من الأخطاء
            if (error.message.includes('500')) {
                setCommentError('حدث خطأ في الخادم. سنحاول مرة أخرى لاحقًا.');
            } else if (error.message.includes('404')) {
                // لا داعي لعرض خطأ 404 للمستخدم، فقط استخدم قائمة فارغة
                setComments([]);
                return;
            } else if (error.message.includes('timeout') || error.message.includes('مهلة')) {
                setCommentError('استغرق تحميل التعليقات وقتاً طويلاً. حاول مرة أخرى لاحقاً.');
            } else {
                // عرض رسالة خطأ للمستخدم إذا كانت مفيدة
                setCommentError(error.message || 'تعذر تحميل التعليقات. حاول مرة أخرى لاحقًا.');
            }
            // رجوع قائمة فارغة
            setComments([]);
        } finally{
            setIsLoadingComments(false);
        }
    };
    // وظيفة لإضافة تعليق عبر API التعليقات المباشرة
    const addCommentViaCommentsAPI = async (content, author, authorAvatarId, postId)=>{
        try {
            const response = await fetch(`/api/blog/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: content,
                    author: author,
                    authorAvatarId: authorAvatarId,
                    postId: postId
                })
            });
            return await response.json();
        } catch (error) {
            console.error('خطأ في استخدام API التعليقات:', error);
            throw error;
        }
    };
    // وظيفة لإضافة تعليق عبر API التفاعلات
    const addCommentViaInteractionsAPI = async (content, userId, displayName, postId)=>{
        try {
            const response = await fetch(`/api/blog/interactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'comment',
                    postId: postId,
                    userId: userId,
                    content: content,
                    displayName: displayName
                })
            });
            return await response.json();
        } catch (error) {
            console.error('خطأ في استخدام API التفاعلات:', error);
            throw error;
        }
    };
    // وظيفة لإضافة تعليق جديد
    const handleAddComment = async (e)=>{
        e.preventDefault();
        if (!comment.trim() || isSubmittingComment) return;
        // التحقق من وجود معرف المنشور
        if (!stablePostId) {
            setCommentError('عذراً، لا يمكن إضافة تعليق لهذا المنشور بسبب عدم توفر معرف المنشور');
            console.error('خطأ: محاولة إضافة تعليق بدون معرف منشور صالح', {
                providedId: id,
                stableId: stablePostId
            });
            return;
        }
        // التحقق من وجود ملف شخصي للمستخدم
        if (!userProfile || !userProfile.nickname) {
            alert('يجب إنشاء ملف شخصي قبل التعليق. سيتم توجيهك إلى صفحة الملف الشخصي.');
            window.location.href = '/blog/profile';
            return;
        }
        setIsSubmittingComment(true);
        setCommentError(null); // مسح أي أخطاء سابقة
        // طباعة معلومات التشخيص
        console.log('إرسال تعليق للمنشور:', {
            postId: stablePostId,
            commentText: comment,
            author: userProfile.nickname
        });
        try {
            // محاولة استخدام API التفاعلات أولا
            let data;
            let success = false;
            try {
                // محاولة استخدام API التفاعلات
                data = await addCommentViaInteractionsAPI(comment, userProfile.nickname, userProfile.nickname, stablePostId);
                success = data.success;
                console.log("نجاح في إضافة التعليق عبر API التفاعلات:", success);
            } catch (interactionsError) {
                console.warn("فشل استخدام API التفاعلات، محاولة استخدام API التعليقات بدلاً من ذلك");
                // إذا فشلت محاولة واجهة التفاعلات، نحاول استخدام واجهة التعليقات
                try {
                    data = await addCommentViaCommentsAPI(comment, userProfile.nickname, userProfile.avatarId || 1, stablePostId);
                    success = data.success;
                    console.log("نجاح في إضافة التعليق عبر API التعليقات:", success);
                } catch (commentsError) {
                    console.error("فشلت جميع محاولات إضافة التعليق");
                    throw new Error("فشلت جميع المحاولات لإضافة التعليق");
                }
            }
            // تحقق من نجاح العملية
            if (!success) {
                throw new Error(data.error || 'فشل في إضافة التعليق لسبب غير معروف');
            }
            // نجاح عملية إضافة التعليق
            console.log("استجابة إضافة التعليق:", data);
            // إذا كان هناك تعليق في البيانات المستلمة، نستخدمه
            if (data.comment) {
                const newComment = {
                    id: data.comment._id || data.comment.id || `local-${Date.now()}`,
                    text: data.comment.content || data.comment.text || comment,
                    author: typeof data.comment.author === 'object' ? data.comment.author.name || userProfile.nickname : data.comment.author || userProfile.nickname,
                    authorAvatarId: userProfile.avatarId,
                    createdAt: data.comment.createdAt || new Date().toISOString(),
                    postId: stablePostId
                };
                setComments((prev)=>[
                        ...prev,
                        newComment
                    ]);
            } else {
                // إضافة تعليق محلي في حالة عدم وجود تعليق في البيانات المستلمة
                const newComment = {
                    id: `local-${Date.now()}`,
                    text: comment,
                    author: userProfile.nickname,
                    authorAvatarId: userProfile.avatarId,
                    createdAt: new Date().toISOString(),
                    postId: stablePostId
                };
                setComments((prev)=>[
                        ...prev,
                        newComment
                    ]);
            }
            // مسح حقل التعليق
            setComment('');
        } catch (error) {
            console.error('خطأ في إضافة التعليق:', error);
            // تحليل نوع الخطأ وعرض رسالة مناسبة
            if (error instanceof Error) {
                if (error.message.includes('fetch') || error.message.includes('network')) {
                    setCommentError('حدث خطأ في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
                } else if (error.message.includes('JSON')) {
                    setCommentError('حدث خطأ في معالجة البيانات. يرجى المحاولة مرة أخرى.');
                } else {
                    setCommentError(error.message || 'حدث خطأ أثناء إضافة التعليق');
                }
            } else {
                setCommentError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
            }
        } finally{
            setIsSubmittingComment(false);
        }
    };
    // دالة لتحويل الإيموجي إلى نوع التفاعل المقابل
    const getReactionType = (emoji)=>{
        switch(emoji){
            case '⚔️':
                return 'sword';
            case '🔥':
                return 'fire';
            case '🛡️':
                return 'shield';
            case '👑':
                return 'crown';
            case '🏰':
                return 'castle';
            case '😂':
                return 'laugh';
            default:
                return 'sword'; // استخدام قيمة افتراضية مقبولة في API
        }
    };
    // وظيفة التفاعل مع البوست
    const handleReaction = async (reactionEmoji)=>{
        console.log('handleReaction called with post ID:', stablePostId);
        if (!stablePostId) {
            console.error('خطأ: لم يتم توفير معرف المنشور');
            return;
        }
        try {
            // استخدام معرف المنشور الثابت
            console.log('استخدام معرف المنشور للتفاعل:', stablePostId);
            // التحقق من وجود ملف شخصي للمستخدم
            if (!userProfile || !userProfile.nickname) {
                alert('الرجاء إنشاء ملف شخصي قبل التفاعل مع المنشورات');
                window.location.href = '/blog/profile';
                return;
            }
            // إنشاء معرف جلسة فريد إذا لم يكن موجودًا
            let sessionId = localStorage.getItem('userSessionId');
            if (!sessionId) {
                sessionId = 'session-' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('userSessionId', sessionId);
            }
            // تحويل الإيموجي إلى نوع التفاعل
            const reactionType = getReactionType(reactionEmoji);
            // إعداد بيانات الطلب - استخدام المعرف الثابت
            console.log('Using post ID for API call:', stablePostId);
            const requestData = {
                postId: stablePostId,
                type: reactionType,
                sessionId,
                nickname: userProfile.nickname.trim()
            };
            console.log('Sending reaction request:', requestData);
            // إرسال طلب API للتفاعل - استخدام نقطة النهاية الصحيحة
            const apiUrl = `/api/blog/reactions`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                console.error('API Error:', errorData);
                throw new Error(errorData.error || 'فشل في تحديث التفاعل');
            }
            const data = await response.json();
            console.log('API Response:', data);
            // تحديث حالة التفاعل محليًا
            if (data.added) {
                setSelectedReaction(reactionEmoji);
                setLikes((prevLikes)=>prevLikes + 1);
            } else {
                setSelectedReaction(null);
                setLikes((prevLikes)=>Math.max(0, prevLikes - 1));
            }
            // إخفاء قائمة التفاعلات
            setShowReactions(false);
        } catch (error) {
            console.error('Error reacting to post:', error);
            alert(error instanceof Error ? error.message : 'حدث خطأ أثناء التفاعل مع المنشور');
        }
    };
    // وظيفة الإعجاب بالبوست
    const handleLike = async ()=>{
        if (selectedReaction) {
            // إذا كان هناك تفاعل سابق، نزيله
            handleReaction(selectedReaction);
        } else {
            // إظهار أو إخفاء قائمة التفاعلات
            setShowReactions(!showReactions);
        }
    };
    // وظيفة المشاركة
    const handleShare = ()=>{
        if (navigator.share) {
            navigator.share({
                title,
                text: summary,
                url: `/blog/${slug}`
            }).catch((err)=>console.error('Error sharing:', err));
        } else {
            // نسخ الرابط إلى الحافظة إذا كانت واجهة المشاركة غير متوفرة
            navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`).then(()=>alert('تم نسخ الرابط!')).catch((err)=>console.error('Error copying link:', err));
        }
    };
    // هذه الدالة ستتحقق من صحة رابط الصورة
    const getImageUrl = (url)=>{
        if (!url) return '';
        // تحقق مما إذا كان الرابط data URL (base64)
        if (url.startsWith('data:')) {
            return url;
        }
        // إذا كان الرابط مطلقاً (يبدأ بـ http أو https)
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // إذا كان رابطاً نسبياً
        if (url.startsWith('/')) {
            return url;
        }
        // افتراضي: إضافة '/' إذا لم يكن موجوداً
        return `/${url}`;
    };
    // طباعة معلومات التشخيص
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PostCard.useEffect": ()=>{
            if (featuredImage) {
                console.log(`PostCard: صورة المقال "${title}"`, featuredImage);
            } else {
                console.log(`PostCard: المقال "${title}" ليس له صورة`);
            }
        }
    }["PostCard.useEffect"], [
        title,
        featuredImage
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative bg-[#f8f0d8] rounded-lg shadow-lg overflow-hidden border-4 border-[#d9b77e] mb-6 transition-all duration-300 hover:-translate-y-1 transform rotate-[0.3deg] hover:shadow-xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-2 -right-2 -left-2 h-6 bg-[#f8f0d8] rounded-b-3xl shadow-inner"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 655,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-2 -right-2 -left-2 h-6 bg-[#f8f0d8] rounded-t-3xl shadow-inner"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 656,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -left-2 -top-2 -bottom-2 w-6 bg-[#f8f0d8] rounded-r-3xl shadow-inner"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 657,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -right-2 -top-2 -bottom-2 w-6 bg-[#f8f0d8] rounded-l-3xl shadow-inner"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 658,
                columnNumber: 7
            }, this),
            featuredImage && featuredImage.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-44 max-h-44 w-full overflow-hidden border-b-2 border-amber-800/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: getImageUrl(featuredImage),
                        alt: title,
                        width: 600,
                        height: 300,
                        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
                        className: "object-contain md:object-contain object-center w-full h-full hover:scale-105 transition-all duration-500 opacity-90",
                        priority: true,
                        onError: ()=>console.error(`خطأ في تحميل الصورة: ${featuredImage}`)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 663,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-t from-[#f8f0d8]/80 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 673,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 662,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/blog/${slug}`,
                className: "block p-5 py-6 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium bg-amber-800/10 text-amber-800 rounded-full px-3 py-1 border border-amber-800/20 font-serif",
                            children: getCategoryName(category)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 680,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 679,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-0 top-0 bottom-0 w-1 bg-amber-800"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold mb-3 text-amber-900 dark:text-amber-700 pr-4 font-serif",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 688,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 686,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-amber-950 dark:text-amber-800 text-sm mb-4 font-serif",
                        children: summary
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 693,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block ml-1.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-4 w-4 text-amber-700",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 1.5,
                                                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 1.5,
                                                            d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 701,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-amber-700 font-serif",
                                                children: commentsCount * 5 + likesCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 707,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 700,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block ml-1.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-4 w-4 text-amber-700",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 1.5,
                                                        d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 712,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 711,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 710,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-amber-700 font-serif",
                                                children: commentsCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 715,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 709,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center ml-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-block ml-1",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-4 w-4 text-amber-700",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 1.5,
                                                        d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 720,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 718,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-amber-700 font-serif",
                                                children: likesCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 723,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 717,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 699,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-amber-700 ml-2 font-serif",
                                        children: formatDate(createdAt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 727,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-4 w-4 text-amber-700",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 1.5,
                                            d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 729,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 728,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 726,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center text-amber-800 hover:text-amber-900 font-semibold transition-colors font-serif text-sm",
                                children: [
                                    "قراءة المزيد",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-4 w-4 mr-1 rtl:rotate-180",
                                        viewBox: "0 0 20 20",
                                        fill: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fillRule: "evenodd",
                                            d: "M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z",
                                            clipRule: "evenodd"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 739,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 736,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setShowReactions(!showReactions);
                                            },
                                            className: `flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border shadow-sm transition-all ${selectedReaction ? 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300 text-amber-700 font-semibold' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 text-gray-600 hover:bg-gray-100'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-base",
                                                    children: selectedReaction || '⚔️'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 758,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-xs",
                                                    children: selectedReaction ? 'تفاعلت' : 'تفاعل'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 746,
                                            columnNumber: 15
                                        }, this),
                                        showReactions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-full right-0 mb-2 p-2 bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 rounded-xl border border-amber-200 shadow-lg z-50",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('⚔️');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-blue-100/80 border border-blue-300 text-blue-700 hover:bg-blue-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "⚔️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 775,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "سيف"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 776,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('🔥');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-red-100/80 border border-red-300 text-red-700 hover:bg-red-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "🔥"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 787,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "نار"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 788,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('🛡️');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-green-100/80 border border-green-300 text-green-700 hover:bg-green-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "🛡️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 799,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "درع"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 800,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 790,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('👑');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-yellow-100/80 border border-yellow-300 text-yellow-700 hover:bg-yellow-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "👑"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 811,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "تاج"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 812,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('🏰');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-purple-100/80 border border-purple-300 text-purple-700 hover:bg-purple-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "🏰"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "قلعة"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 824,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleReaction('😂');
                                                            setShowReactions(false);
                                                        },
                                                        className: "reaction-btn flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-orange-100/80 border border-orange-300 text-orange-700 hover:bg-orange-200 transition-all hover:scale-110 hover:shadow-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-lg",
                                                                children: "😂"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 835,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-medium",
                                                                children: "ضحك"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                                lineNumber: 836,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 826,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 765,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 764,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 745,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 744,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 735,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                handleShare();
                            },
                            className: "bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-100 px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-3.5 w-3.5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 856,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 855,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-xs",
                                    children: "مشاركة"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 858,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 847,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 846,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 677,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pt-0 pb-4 -mt-2 relative z-10",
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-amber-800/20 pt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-xs font-bold text-amber-800 font-serif flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-3.5 w-3.5 ml-1",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                lineNumber: 869,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 868,
                                            columnNumber: 15
                                        }, this),
                                        "التعليقات",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-block mr-1 text-[10px] bg-amber-100 text-amber-800 rounded-full px-1.5 py-0 border border-amber-800/20",
                                            children: commentsCount
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 872,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 867,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/blog/${slug}`,
                                    className: "text-[10px] text-amber-600 hover:text-amber-800 transition-colors font-serif",
                                    children: "عرض الكل"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 876,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 866,
                            columnNumber: 11
                        }, this),
                        isLoadingComments ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-block animate-spin rounded-full h-3.5 w-3.5 border-t-2 border-b-2 border-amber-600 mb-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 884,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-amber-700",
                                    children: "جاري تحميل التعليقات..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 885,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 883,
                            columnNumber: 13
                        }, this) : commentError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-red-600",
                                children: commentError
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 889,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 888,
                            columnNumber: 13
                        }, this) : comments.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5 mb-2",
                            children: comments.slice(-2).map((comment, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-amber-50 rounded-md p-1.5 border border-amber-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-5 h-5 rounded-full overflow-hidden bg-amber-200 flex items-center justify-center mr-1 text-[8px] text-amber-800 font-bold border border-amber-300",
                                                    children: comment.authorAvatarId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserAvatarSrc"])(comment.authorAvatarId),
                                                        alt: comment.author,
                                                        width: 20,
                                                        height: 20,
                                                        className: "w-full h-full object-cover",
                                                        onError: (e)=>{
                                                            // في حالة فشل تحميل الصورة، نعرض الحرف الأول من الاسم
                                                            const target = e.target;
                                                            target.style.display = 'none';
                                                            target.parentElement.innerText = comment.author ? comment.author.charAt(0).toUpperCase() : "؟";
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                        lineNumber: 898,
                                                        columnNumber: 25
                                                    }, this) : comment.author ? comment.author.charAt(0).toUpperCase() : "؟"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-medium text-amber-800",
                                                    children: comment.author
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 915,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mr-auto text-[8px] text-amber-600",
                                                    children: formatDate(comment.createdAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 916,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 895,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-amber-900 leading-relaxed pr-1.5 border-r border-amber-300",
                                            children: comment.text
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 920,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, comment.id || index, true, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 894,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 892,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-1.5 mb-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-amber-700",
                                children: "لا توجد تعليقات. كن أول من يعلق!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                lineNumber: 928,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 927,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleAddComment,
                            className: "relative flex gap-1.5",
                            children: [
                                userProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-6 h-6 rounded-full overflow-hidden bg-amber-200 flex-shrink-0 border border-amber-300",
                                    children: userProfile.avatarId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserAvatarSrc"])(userProfile.avatarId),
                                        alt: userProfile.nickname,
                                        width: 24,
                                        height: 24,
                                        className: "w-full h-full object-cover",
                                        onError: (e)=>{
                                            const target = e.target;
                                            target.style.display = 'none';
                                            target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-amber-800 text-[10px] font-bold">${userProfile.nickname.charAt(0).toUpperCase()}</div>`;
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 937,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full flex items-center justify-center text-amber-800 text-[10px] font-bold",
                                        children: userProfile.nickname.charAt(0).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 950,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 935,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: userProfile ? "اكتب تعليقك السريع هنا..." : "قم بإنشاء ملف شخصي للتعليق",
                                            value: comment,
                                            onChange: (e)=>setComment(e.target.value),
                                            className: "w-full rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-2 py-1 text-[10px] placeholder-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500",
                                            disabled: isSubmittingComment || !userProfile
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 957,
                                            columnNumber: 15
                                        }, this),
                                        !userProfile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "absolute text-[8px] text-amber-600 mt-0.5 right-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/blog/profile",
                                                    className: "underline hover:text-amber-800",
                                                    children: "قم بإنشاء ملف شخصي"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                                    lineNumber: 967,
                                                    columnNumber: 19
                                                }, this),
                                                " للتعليق"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                            lineNumber: 966,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 956,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isSubmittingComment || !comment.trim() || !userProfile,
                                    className: `rounded-md px-2 py-1 text-[10px] flex items-center justify-center min-w-[40px] ${isSubmittingComment ? "bg-gray-200 text-gray-500 cursor-not-allowed" : comment.trim() && userProfile ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`,
                                    children: isSubmittingComment ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                        lineNumber: 983,
                                        columnNumber: 17
                                    }, this) : "تعليق"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                                    lineNumber: 971,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/components/PostCard.tsx",
                            lineNumber: 933,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                    lineNumber: 865,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 864,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full flex justify-center mt-2 mb-6 opacity-60 relative z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "150",
                    height: "20",
                    viewBox: "0 0 200 30",
                    fill: "#8B4513",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0,15 C50,5 150,25 200,15 L200,20 C150,30 50,10 0,20 L0,15 Z"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/components/PostCard.tsx",
                        lineNumber: 995,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/components/PostCard.tsx",
                    lineNumber: 994,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/components/PostCard.tsx",
                lineNumber: 993,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/blog/components/PostCard.tsx",
        lineNumber: 653,
        columnNumber: 5
    }, this);
}
_s(PostCard, "4g8fly6Ez+iXBklkYGSq7HnKlCw=");
_c = PostCard;
var _c;
__turbopack_context__.k.register(_c, "PostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/ScrollToTop.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const ScrollToTop = ()=>{
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // التحقق من موضع التمرير لإظهار/إخفاء الزر
    const toggleVisibility = ()=>{
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    // التمرير لأعلى الصفحة
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrollToTop.useEffect": ()=>{
            window.addEventListener('scroll', toggleVisibility);
            // إزالة المستمع عند فك المكون
            return ({
                "ScrollToTop.useEffect": ()=>{
                    window.removeEventListener('scroll', toggleVisibility);
                }
            })["ScrollToTop.useEffect"];
        }
    }["ScrollToTop.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: scrollToTop,
            className: "fixed bottom-6 left-6 bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 z-50 transform hover:scale-110",
            "aria-label": "العودة لأعلى الصفحة",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 10l7-7m0 0l7 7m-7-7v18"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/ScrollToTop.tsx",
                    lineNumber: 49,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/ScrollToTop.tsx",
                lineNumber: 42,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/ScrollToTop.tsx",
            lineNumber: 37,
            columnNumber: 9
        }, this)
    }, void 0, false);
};
_s(ScrollToTop, "J3yJOyGdBT4L7hs1p1XQYVGMdrY=");
_c = ScrollToTop;
const __TURBOPACK__default__export__ = ScrollToTop;
var _c;
__turbopack_context__.k.register(_c, "ScrollToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/blog/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "categoryColors": (()=>categoryColors),
    "categoryTranslations": (()=>categoryTranslations),
    "default": (()=>BlogPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/blog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$blog$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/blog/components/PostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/userSettings.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/ScrollToTop.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const categoryTranslations = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].GUIDE]: 'دليل اللاعبين',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].NEWS]: 'أخبار اللعبة',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].TIPS]: 'نصائح وحيل',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].ANALYSIS]: 'تحليلات وتقييمات',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].MARKET]: 'أخبار السوق',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].MEMES]: 'ميمز وطرائف',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].EXPERIENCE]: 'تجارب اللاعبين'
};
const categoryColors = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].GUIDE]: 'bg-blue-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].NEWS]: 'bg-amber-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].TIPS]: 'bg-green-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].ANALYSIS]: 'bg-purple-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].MARKET]: 'bg-teal-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].MEMES]: 'bg-pink-600',
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].EXPERIENCE]: 'bg-cyan-700'
};
function BlogPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort') || 'recent';
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(categoryParam);
    const [activeSort, setActiveSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(sortParam);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(6); // عدد المقالات المعروضة مبدئياً
    const [userSettings, setUserSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // للتحقق من الرؤية عند التمرير
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // تأثير لرصد موضع التمرير
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogPage.useEffect": ()=>{
            const handleScroll = {
                "BlogPage.useEffect.handleScroll": ()=>{
                    setScrollY(window.scrollY);
                }
            }["BlogPage.useEffect.handleScroll"];
            // إضافة مستمع للتمرير
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            // إزالة المستمع عند فك المكون
            return ({
                "BlogPage.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                }
            })["BlogPage.useEffect"];
        }
    }["BlogPage.useEffect"], []);
    // جلب بيانات المستخدم المحلية
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogPage.useEffect": ()=>{
            setUserSettings((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userSettings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserSettings"])());
        }
    }["BlogPage.useEffect"], []);
    // تحميل المقالات من API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogPage.useEffect": ()=>{
            if (categoryParam && categoryParam !== activeCategory) {
                setActiveCategory(categoryParam);
            }
            const loadPosts = {
                "BlogPage.useEffect.loadPosts": async ()=>{
                    try {
                        setIsLoading(true);
                        setError(null); // مسح الأخطاء السابقة
                        let url = `/api/blog?page=${pagination.page}&limit=${pagination.limit}&sort=${activeSort}`;
                        if (activeCategory) {
                            url += `&category=${activeCategory}`;
                        }
                        console.log('Fetching posts from:', url);
                        // استخدام AbortController للتحكم في طلب الشبكة
                        const controller = new AbortController();
                        const timeoutId = setTimeout({
                            "BlogPage.useEffect.loadPosts.timeoutId": ()=>controller.abort()
                        }["BlogPage.useEffect.loadPosts.timeoutId"], 15000); // إلغاء الطلب بعد 15 ثانية
                        const response = await fetch(url, {
                            signal: controller.signal,
                            method: 'GET',
                            headers: {
                                'Cache-Control': 'no-cache'
                            }
                        }).catch({
                            "BlogPage.useEffect.loadPosts": (error)=>{
                                if (error.name === 'AbortError') {
                                    console.warn('تم إلغاء طلب تحميل المنشورات بسبب تجاوز المهلة');
                                    throw new Error('تم تجاوز مهلة تحميل المنشورات');
                                }
                                throw error;
                            }
                        }["BlogPage.useEffect.loadPosts"]);
                        clearTimeout(timeoutId);
                        if (!response.ok) {
                            const errorText = await response.text().catch({
                                "BlogPage.useEffect.loadPosts": ()=>'خطأ غير معروف'
                            }["BlogPage.useEffect.loadPosts"]);
                            console.error('API Error Response:', response.status, errorText);
                            // تحليل رسالة الخطأ حسب رمز الحالة
                            if (response.status === 404) {
                                throw new Error('المنشورات غير موجودة');
                            } else if (response.status === 500) {
                                throw new Error('خطأ في خادم قاعدة البيانات. الرجاء المحاولة مرة أخرى لاحقًا.');
                            } else {
                                throw new Error(`خطأ في الاتصال: ${response.status} - ${errorText}`);
                            }
                        }
                        const data = await response.json().catch({
                            "BlogPage.useEffect.loadPosts": (err)=>{
                                console.error('Error parsing JSON response:', err);
                                throw new Error('تعذر تحليل استجابة الخادم. الرجاء المحاولة مرة أخرى.');
                            }
                        }["BlogPage.useEffect.loadPosts"]);
                        if (!data || !data.posts) {
                            console.error('Invalid API response format:', data);
                            throw new Error('تنسيق استجابة API غير صالح');
                        }
                        setPosts(data.posts || []);
                        setPagination(data.pagination || {
                            total: 0,
                            page: 1,
                            limit: 10,
                            totalPages: 0
                        });
                    } catch (err) {
                        console.error('خطأ في تحميل المقالات:', err);
                        // رسالة خطأ صديقة للمستخدم
                        const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء تحميل المقالات';
                        setError(`${errorMessage}. يمكنك تحديث الصفحة للمحاولة مرة أخرى.`);
                        // عرض محتوى سابق (إن وجد) بدلاً من التحميل
                        setIsLoading(false);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["BlogPage.useEffect.loadPosts"];
            loadPosts();
        }
    }["BlogPage.useEffect"], [
        pagination.page,
        pagination.limit,
        activeCategory,
        activeSort,
        categoryParam
    ]);
    // تغيير الصفحة الحالية
    const handlePageChange = (newPage)=>{
        setPagination((prev)=>({
                ...prev,
                page: newPage
            }));
    };
    // تصفية المقالات حسب الفئة
    const filterByCategory = (category)=>{
        setActiveCategory(category);
        setPagination((prev)=>({
                ...prev,
                page: 1
            }));
        // تحديث عنوان URL
        const params = new URLSearchParams(searchParams.toString());
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        router.push(`/blog?${params.toString()}`);
    };
    // تغيير ترتيب المقالات
    const handleSortChange = (sort)=>{
        setActiveSort(sort);
        // تحديث عنوان URL
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', sort);
        router.push(`/blog?${params.toString()}`);
    };
    // الإعجاب بمقال
    const handleLike = async (postId)=>{
        try {
            // هنا يمكن إضافة طلب API للإعجاب
            console.log('Liked post:', postId);
            // تحديث حالة الإعجاب محليًا (في تطبيق حقيقي، هذا سيكون استجابة للطلب)
            setPosts((prevPosts)=>prevPosts.map((post)=>{
                    if (post.id === postId) {
                        const userLiked = post.interaction.likes.includes('currentUserId');
                        return {
                            ...post,
                            interaction: {
                                ...post.interaction,
                                likes: userLiked ? post.interaction.likes.filter((id)=>id !== 'currentUserId') : [
                                    ...post.interaction.likes,
                                    'currentUserId'
                                ]
                            }
                        };
                    }
                    return post;
                }));
        } catch (err) {
            console.error('Error liking post:', err);
        }
    };
    // مشاركة المقال
    const handleShare = (postId)=>{
        const post = posts.find((p)=>p.id === postId);
        if (!post) return;
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.summary,
                url: `/blog/${post.slug}`
            }).catch((err)=>console.error('Error sharing:', err));
        } else {
            // نسخ الرابط إلى الحافظة
            navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`).then(()=>alert('تم نسخ الرابط!')).catch((err)=>console.error('Error copying link:', err));
        }
    };
    // تحميل المزيد من المقالات
    const loadMore = ()=>{
        setVisible((prevVisible)=>prevVisible + 6);
    };
    // تصفية المقالات حسب الفئة
    const filteredPosts = activeCategory === null ? posts : posts.filter((post)=>post.category === activeCategory);
    // عرض رسالة التحميل
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 278,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-gray-700 dark:text-gray-300",
                        children: "جاري تحميل المقالات..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/blog/page.tsx",
            lineNumber: 276,
            columnNumber: 7
        }, this);
    }
    // عرض رسالة الخطأ
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "h-16 w-16 text-red-500 mx-auto mb-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 dark:text-white mb-4",
                        children: "حدث خطأ في تحميل المقالات"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 293,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 dark:text-gray-300 mb-6",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 294,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "inline-block px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors",
                        children: "إعادة المحاولة"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/blog/page.tsx",
            lineNumber: 288,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-38c7e624d38cbf0e" + " " + "min-h-screen bg-gray-50 dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-38c7e624d38cbf0e" + " " + "relative text-white py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "absolute inset-0 z-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/images/bg243.jpg",
                            alt: "خلفية الفاتحون",
                            className: "jsx-38c7e624d38cbf0e" + " " + "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 310,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "absolute inset-0 bg-black bg-opacity-40"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "container mx-auto px-4 lg:px-0 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-38c7e624d38cbf0e" + " " + "max-w-3xl mx-auto text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "jsx-38c7e624d38cbf0e" + " " + "text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeIn",
                                    children: "مدونة الفاتحون"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        animationDelay: '0.2s'
                                    },
                                    className: "jsx-38c7e624d38cbf0e" + " " + "text-lg md:text-xl text-white/80 mb-8 animate-fadeUp",
                                    children: "نافذتك للتاريخ والبطولات، قصص البطولات والفتوحات، والعبر المستفادة"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        animationDelay: '0.4s'
                                    },
                                    className: "jsx-38c7e624d38cbf0e" + " " + "flex flex-wrap justify-center gap-3 mb-4 animate-fadeUp",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>filterByCategory(null),
                                            className: "jsx-38c7e624d38cbf0e" + " " + `px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null ? 'bg-amber-600 text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`,
                                            children: "جميع المقالات"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/blog/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"]).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>filterByCategory(value),
                                                className: "jsx-38c7e624d38cbf0e" + " " + `px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === value ? 'bg-amber-600 text-white shadow-md' : 'bg-white/20 text-white hover:bg-white/30'}`,
                                                children: categoryTranslations[value] || value
                                            }, `category-${value}`, false, {
                                                fileName: "[project]/src/app/blog/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        animationDelay: '0.6s'
                                    },
                                    className: "jsx-38c7e624d38cbf0e" + " " + "relative max-w-lg mx-auto animate-fadeUp",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/blog/submit",
                                        className: "w-full px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-md flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                className: "jsx-38c7e624d38cbf0e" + " " + "h-5 w-5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
                                                    className: "jsx-38c7e624d38cbf0e"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/blog/page.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/page.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-38c7e624d38cbf0e" + " " + "font-medium",
                                                children: "انشر مقالاً جديداً"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/blog/page.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 352,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 351,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "absolute bottom-0 left-0 right-0 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 1440 320",
                            className: "jsx-38c7e624d38cbf0e" + " " + "w-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fill: "#f9fafb",
                                fillOpacity: "1",
                                d: "M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,170.7C672,160,768,160,864,170.7C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                className: "jsx-38c7e624d38cbf0e"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 366,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "posts-section",
                className: "jsx-38c7e624d38cbf0e" + " " + "container mx-auto px-4 lg:px-0 py-8 mb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "text-2xl font-bold text-gray-800 dark:text-white text-center",
                                children: activeCategory === null ? 'أحدث المقالات' : activeCategory === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].NEWS ? 'أخبار الفاتحون' : activeCategory === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$blog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogCategory"].GUIDE ? 'أدلة وإرشادات' : 'نصائح وتلميحات'
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 376,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "w-24 h-1 bg-amber-500 mx-auto mt-2"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 382,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this),
                    filteredPosts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8",
                        children: filteredPosts.slice(0, visible).map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animationDelay: `${index * 0.1}s`
                                },
                                className: "jsx-38c7e624d38cbf0e" + " " + `scroll-reveal ${scrollY > 100 ? 'active' : ''}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$blog$2f$components$2f$PostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    id: post.id,
                                    slug: post.slug,
                                    title: post.title,
                                    summary: post.summary,
                                    category: post.category,
                                    featuredImage: post.featuredImage,
                                    author: {
                                        name: post.author?.name || 'مجهول',
                                        avatar: post.author?.avatar
                                    },
                                    createdAt: post.createdAt,
                                    commentsCount: post.comments?.length || 0,
                                    likesCount: post.interaction?.likes?.length || 0,
                                    isLiked: post.interaction?.likes?.includes('currentUserId') || false
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 394,
                                    columnNumber: 17
                                }, this)
                            }, post.id || `post-${index}`, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 389,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 387,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                className: "jsx-38c7e624d38cbf0e" + " " + "h-16 w-16 text-gray-400 mx-auto mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                                    className: "jsx-38c7e624d38cbf0e"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 416,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "text-xl font-bold text-gray-700 mb-2",
                                children: "لا توجد مقالات متاحة حالياً"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 418,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "text-gray-500",
                                children: "لم نتمكن من العثور على مقالات تطابق هذا التصفية. جرب تصفية أخرى."
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 419,
                                columnNumber: 13
                            }, this),
                            activeCategory !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>filterByCategory(null),
                                className: "jsx-38c7e624d38cbf0e" + " " + "mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors",
                                children: "عرض جميع المقالات"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 421,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this),
                    visible < filteredPosts.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-38c7e624d38cbf0e" + " " + "text-center mt-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: loadMore,
                            className: "jsx-38c7e624d38cbf0e" + " " + "px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors shadow-md inline-flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-38c7e624d38cbf0e",
                                    children: "تحميل المزيد"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    className: "jsx-38c7e624d38cbf0e" + " " + "h-5 w-5 animate-bounce",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M19 14l-7 7m0 0l-7-7m7 7V3",
                                        className: "jsx-38c7e624d38cbf0e"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 440,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 439,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 434,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 433,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-38c7e624d38cbf0e" + " " + "bg-amber-500 text-white py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-38c7e624d38cbf0e" + " " + "container mx-auto px-4 lg:px-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transitionDelay: '0.2s'
                        },
                        className: "jsx-38c7e624d38cbf0e" + " " + "max-w-2xl mx-auto text-center scroll-reveal",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "text-2xl md:text-3xl font-bold mb-4",
                                children: "اشترك في نشرتنا البريدية"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "text-white/90 mb-6",
                                children: "احصل على أحدث المقالات والأخبار مباشرة إلى بريدك الإلكتروني"
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 452,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-38c7e624d38cbf0e" + " " + "flex flex-col sm:flex-row gap-2 max-w-lg mx-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        placeholder: "أدخل بريدك الإلكتروني",
                                        className: "jsx-38c7e624d38cbf0e" + " " + "flex-grow px-4 py-3 rounded-lg text-gray-800 border-0 focus:ring-2 focus:ring-amber-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "jsx-38c7e624d38cbf0e" + " " + "px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors whitespace-nowrap",
                                        children: "اشترك الآن"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/blog/page.tsx",
                                        lineNumber: 459,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 453,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 449,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$ScrollToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "38c7e624d38cbf0e",
                children: ".scroll-reveal.jsx-38c7e624d38cbf0e{opacity:0;transition:all .6s ease-out;transform:translateY(20px)}.scroll-reveal.active.jsx-38c7e624d38cbf0e{opacity:1;transform:translateY(0)}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn.jsx-38c7e624d38cbf0e{animation:.8s ease-out forwards fadeIn}.animate-fadeUp.jsx-38c7e624d38cbf0e{animation:.8s ease-out forwards fadeUp}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/blog/page.tsx",
        lineNumber: 307,
        columnNumber: 5
    }, this);
}
_s(BlogPage, "y7L7CDREtDDvw3IroMM8WwzfyzE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = BlogPage;
var _c;
__turbopack_context__.k.register(_c, "BlogPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b9632d91._.js.map