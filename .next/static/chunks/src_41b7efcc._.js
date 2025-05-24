(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/cart/ServiceCartButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
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
const ServiceCartButton = ({ totalItems, toggleCart })=>{
    _s();
    const [animate, setAnimate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [prevTotalItems, setPrevTotalItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(totalItems);
    // تأثير التنبيه عند إضافة عناصر جديدة للسلة
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceCartButton.useEffect": ()=>{
            if (totalItems > prevTotalItems) {
                setAnimate(true);
                const timer = setTimeout({
                    "ServiceCartButton.useEffect.timer": ()=>setAnimate(false)
                }["ServiceCartButton.useEffect.timer"], 700);
                return ({
                    "ServiceCartButton.useEffect": ()=>clearTimeout(timer)
                })["ServiceCartButton.useEffect"];
            }
            setPrevTotalItems(totalItems);
        }
    }["ServiceCartButton.useEffect"], [
        totalItems,
        prevTotalItems
    ]);
    // إخفاء الزر عند التمرير لأسفل وإظهاره عند التمرير لأعلى
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceCartButton.useEffect": ()=>{
            let lastScrollY = window.scrollY;
            const handleScroll = {
                "ServiceCartButton.useEffect.handleScroll": ()=>{
                    const currentScrollY = window.scrollY;
                    setIsVisible(currentScrollY <= 100 || currentScrollY < lastScrollY);
                    lastScrollY = currentScrollY;
                }
            }["ServiceCartButton.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "ServiceCartButton.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["ServiceCartButton.useEffect"];
        }
    }["ServiceCartButton.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-20 md:top-24 right-4 md:right-8 z-50 transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: toggleCart,
            className: `bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 md:p-5 rounded-full shadow-lg flex items-center justify-center relative transition-transform ${animate ? 'animate-bounce' : ''} hover:scale-110`,
            "aria-label": "عرض السلة",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "h-6 w-6",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/cart/ServiceCartButton.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/ServiceCartButton.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                totalItems > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center shadow-md ${animate ? 'animate-pulse' : ''}`,
                    children: totalItems
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/ServiceCartButton.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/ServiceCartButton.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/cart/ServiceCartButton.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
};
_s(ServiceCartButton, "5xQa8vhWpUi60ZYNvUUVh13MQs0=");
_c = ServiceCartButton;
const __TURBOPACK__default__export__ = ServiceCartButton;
var _c;
__turbopack_context__.k.register(_c, "ServiceCartButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/cart/ServiceCartDropdown.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
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
const ServiceCartDropdown = ({ isOpen, cartItems, removeFromCart, toggleCart, goToCheckout, locale, translations })=>{
    _s();
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // إضافة تأثير الإغلاق عند النقر خارج القائمة
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServiceCartDropdown.useEffect": ()=>{
            const handleClickOutside = {
                "ServiceCartDropdown.useEffect.handleClickOutside": (event)=>{
                    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                        toggleCart();
                    }
                }
            }["ServiceCartDropdown.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "ServiceCartDropdown.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["ServiceCartDropdown.useEffect"];
        }
    }["ServiceCartDropdown.useEffect"], [
        isOpen,
        toggleCart
    ]);
    if (!isOpen) return null;
    // حساب المجموع الكلي
    const totalAmount = cartItems.reduce((total, item)=>total + item.price * item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black bg-opacity-15 backdrop-blur-[1px] transition-opacity duration-300",
                onClick: toggleCart
            }, void 0, false, {
                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: dropdownRef,
                className: "absolute top-32 right-4 md:right-8 z-50 bg-white rounded-xl shadow-2xl w-80 max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100 rtl",
                style: {
                    maxHeight: '70vh'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 bg-amber-50 p-4 border-b border-amber-100 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold text-amber-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mx-2",
                                        children: "🛒"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    translations.cart[locale]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCart,
                                className: "w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-amber-100 hover:text-gray-800 transition-colors",
                                "aria-label": "إغلاق",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-y-auto p-4",
                        style: {
                            maxHeight: 'calc(70vh - 140px)'
                        },
                        children: cartItems.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center py-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-5xl mb-4",
                                    children: "🛒"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mb-4",
                                    children: translations.emptyCart[locale]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: toggleCart,
                                    className: "px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors",
                                    children: translations.continueShopping ? translations.continueShopping[locale] : 'مواصلة التسوق'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-3",
                            children: cartItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "p-3 rounded-lg bg-white border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all flex justify-between items-center group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center ml-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl",
                                                        children: item.icon || '🛍️'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-amber-900",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center text-sm text-amber-700",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-block",
                                                                    children: [
                                                                        item.price,
                                                                        " ",
                                                                        translations.currency[locale]
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                                    lineNumber: 109,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "mx-1 text-amber-400",
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                                    lineNumber: 110,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center justify-center bg-amber-50 px-2 rounded-full font-medium",
                                                                    children: item.quantity
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                                    lineNumber: 111,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                            lineNumber: 108,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                            lineNumber: 102,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeFromCart(item.id, item.category),
                                            className: "w-7 h-7 rounded-full bg-white text-gray-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                                            "aria-label": "إزالة من السلة",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                className: "h-4 w-4",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, `${item.category}-${item.id}`, true, {
                                    fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                    lineNumber: 98,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    cartItems.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky bottom-0 bg-gradient-to-b from-amber-50 to-amber-100 p-4 border-t border-amber-200 shadow-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center font-bold mb-4 text-amber-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: [
                                            translations.total[locale],
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl",
                                        children: [
                                            totalAmount,
                                            ' ',
                                            translations.currency[locale]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: goToCheckout,
                                className: "block w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-center py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transform transition-transform hover:-translate-y-1 active:translate-y-0",
                                children: translations.checkout[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/cart/ServiceCartDropdown.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
};
_s(ServiceCartDropdown, "lBksDI189chlgqHe47LAOFZSkUw=");
_c = ServiceCartDropdown;
const __TURBOPACK__default__export__ = ServiceCartDropdown;
var _c;
__turbopack_context__.k.register(_c, "ServiceCartDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/services/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ServicesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$ServiceCartButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart/ServiceCartButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$ServiceCartDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart/ServiceCartDropdown.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// حالة البيانات الافتراضية لعرضها أثناء التحميل
const defaultServices = {
    resources: [],
    castle: [],
    bots: [],
    events: []
};
function ServicesPage() {
    _s();
    // استخدام اللغة العربية فقط
    const locale = 'ar';
    const isRTL = true;
    // حالة سلة التسوق
    const [cartItems, setCartItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [addedItems, setAddedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // استخدام state لتتبع الكمية لكل منتج
    const [quantities, setQuantities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [totalItems, setTotalItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // حالة الخدمات المستحضرة من API
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultServices);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // استدعاء API لجلب الخدمات
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServicesPage.useEffect": ()=>{
            const fetchServices = {
                "ServicesPage.useEffect.fetchServices": async ()=>{
                    setLoading(true);
                    try {
                        const response = await fetch('/api/services');
                        if (!response.ok) {
                            throw new Error(`خطأ في الاتصال: ${response.status}`);
                        }
                        const data = await response.json();
                        console.log('بيانات الخدمات:', data);
                        setServices(data.services);
                        setError(null);
                    } catch (error) {
                        console.error('خطأ في تحميل الخدمات:', error);
                        setError('حدث خطأ أثناء تحميل الخدمات، سيتم عرض بيانات افتراضية.');
                    } finally{
                        setLoading(false);
                    }
                }
            }["ServicesPage.useEffect.fetchServices"];
            fetchServices();
        }
    }["ServicesPage.useEffect"], []);
    // حالة الفئة النشطة
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('resources');
    // تحميل عناصر السلة من التخزين المحلي عند التحميل الأولي
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ServicesPage.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    try {
                        const parsedCart = JSON.parse(savedCart);
                        setCartItems(parsedCart);
                        updateTotalItems(parsedCart);
                    } catch (error) {
                        console.error('Error parsing cart data:', error);
                    }
                }
            }
        }
    }["ServicesPage.useEffect"], []);
    // تحديث عدد العناصر في السلة
    const updateTotalItems = (items)=>{
        const total = items.reduce((sum, item)=>sum + item.quantity, 0);
        setTotalItems(total);
    };
    // حفظ السلة في التخزين المحلي
    const saveCartToLocalStorage = (items)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
    };
    // تبديل فتح/إغلاق السلة
    const toggleCart = ()=>{
        setIsCartOpen((prev)=>!prev);
    };
    // زيادة الكمية
    const increaseQuantity = (key)=>{
        setQuantities({
            ...quantities,
            [key]: (quantities[key] || 1) + 1
        });
    };
    // إنقاص الكمية (بحد أدنى 1)
    const decreaseQuantity = (key)=>{
        if (quantities[key] > 1) {
            setQuantities({
                ...quantities,
                [key]: quantities[key] - 1
            });
        }
    };
    // إضافة منتج للسلة
    const handleAddToCart = (item, category)=>{
        const key = `${category}-${item.id}`;
        const quantity = quantities[key] || 1; // استخدام الكمية المحددة
        // تعليم المنتج كمضاف للسلة
        setAddedItems((prev)=>({
                ...prev,
                [key]: true
            }));
        // إضافة المنتج للسلة
        const itemName = item.name[locale];
        const existingItemIndex = cartItems.findIndex((cartItem)=>cartItem.id === item.id && cartItem.category === category);
        let updatedCart;
        if (existingItemIndex !== -1) {
            // المنتج موجود بالفعل
            updatedCart = [
                ...cartItems
            ];
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            // منتج جديد
            updatedCart = [
                ...cartItems,
                {
                    id: item.id,
                    name: itemName,
                    price: item.price,
                    icon: item.icon,
                    category,
                    quantity: quantity
                }
            ];
        }
        setCartItems(updatedCart);
        updateTotalItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
        // إعادة تعيين الكمية إلى 1 بعد الإضافة
        setQuantities({
            ...quantities,
            [key]: 1
        });
        // إزالة علامة المضاف بعد ثانيتين
        setTimeout(()=>{
            setAddedItems((prev)=>({
                    ...prev,
                    [key]: false
                }));
        }, 2000);
    };
    // إزالة منتج من السلة
    const removeFromCart = (itemId, category)=>{
        const updatedCart = cartItems.filter((item)=>!(item.id === itemId && item.category === category));
        setCartItems(updatedCart);
        updateTotalItems(updatedCart);
        saveCartToLocalStorage(updatedCart);
    };
    // الانتقال إلى إتمام الشراء
    const goToCheckout = ()=>{
        // تخزين عناصر السلة في التخزين المحلي لاستخدامها في صفحة الدفع
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // توجيه المستخدم إلى صفحة الدفع
        window.location.href = '/checkout';
    };
    // ترجمات صفحة الخدمات
    const translations = {
        pageTitle: {
            ar: 'الخدمات',
            en: 'Services',
            tr: 'Hizmetler'
        },
        resourcesTitle: {
            ar: 'الموارد',
            en: 'Resources',
            tr: 'Kaynaklar'
        },
        resourcesSubtitle: {
            ar: 'اختر من مجموعتنا الواسعة من الموارد لتعزيز مملكتك',
            en: 'Choose from our wide range of resources to enhance your kingdom',
            tr: 'Krallığınızı geliştirmek için geniş kaynak yelpazemizden seçim yapın'
        },
        castleTitle: {
            ar: 'القلاع',
            en: 'Castles',
            tr: 'Kaleler'
        },
        castleSubtitle: {
            ar: 'قم بشراء قلاع جاهزة للاستخدام مباشرة',
            en: 'Purchase ready-to-use castles directly',
            tr: 'Doğrudan kullanıma hazır kaleler satın alın'
        },
        botsTitle: {
            ar: 'الروبوتات',
            en: 'Bots',
            tr: 'Botlar'
        },
        botsSubtitle: {
            ar: 'تمتع بالمساعدة الآلية مع روبوتات متخصصة',
            en: 'Enjoy automated assistance with specialized bots',
            tr: 'Özel botlarla otomatik yardımın keyfini çıkarın'
        },
        eventsTitle: {
            ar: 'الأحداث',
            en: 'Events',
            tr: 'Etkinlikler'
        },
        eventsSubtitle: {
            ar: 'احصل على قيمة أكبر مع حزمنا المخصصة للأحداث',
            en: 'Get more value with our event packages',
            tr: 'Etkinlik paketlerimizle daha fazla değer elde edin'
        },
        price: {
            ar: 'السعر',
            en: 'Price',
            tr: 'Fiyat'
        },
        currency: {
            ar: 'دولار',
            en: 'USD',
            tr: 'USD'
        },
        orderNow: {
            ar: 'اطلب الآن',
            en: 'Order Now',
            tr: 'Şimdi Sipariş Ver'
        },
        added: {
            ar: 'تمت الإضافة',
            en: 'Added',
            tr: 'Eklendi'
        },
        cart: {
            ar: 'سلة التسوق',
            en: 'Cart',
            tr: 'Sepet'
        },
        emptyCart: {
            ar: 'السلة فارغة',
            en: 'Your cart is empty',
            tr: 'Sepetiniz boş'
        },
        total: {
            ar: 'المجموع',
            en: 'Total',
            tr: 'Toplam'
        },
        checkout: {
            ar: 'إتمام الشراء',
            en: 'Checkout',
            tr: 'Ödeme'
        },
        popular: {
            ar: 'شائع',
            en: 'Popular',
            tr: 'Popüler'
        }
    };
    // استخدام state لتتبع الكمية لكل منتج
    // استخدام القيم المعرفة سابقاً
    // استخدام وظائف الكمية المعرفة سابقاً
    // عنصر عرض المنتج
    const ProductCard = ({ item, category })=>{
        const productKey = `${category}-${item.id}`;
        const currentQuantity = quantities[productKey] || 1;
        // تحديد لون خلفية الأيقونة حسب نوع المنتج
        const getIconBgColor = ()=>{
            switch(category){
                case 'resources':
                    return 'bg-gradient-to-br from-green-300 to-green-100';
                case 'bots':
                    return 'bg-gradient-to-br from-blue-300 to-blue-100';
                case 'events':
                    return 'bg-gradient-to-br from-purple-300 to-purple-100';
                case 'castle':
                    return 'bg-gradient-to-br from-amber-300 to-amber-100';
                default:
                    return 'bg-gradient-to-br from-gray-300 to-gray-100';
            }
        };
        // تحديد لون إطار البطاقة حسب نوع المنتج
        const getCardBorderColor = ()=>{
            switch(category){
                case 'resources':
                    return 'border-green-200';
                case 'bots':
                    return 'border-blue-200';
                case 'events':
                    return 'border-purple-200';
                case 'castle':
                    return 'border-amber-200';
                default:
                    return 'border-gray-200';
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-2 ${getCardBorderColor()} relative pb-24 group`,
            children: [
                item.popular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-2 right-2 z-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "h-4 w-4 mr-1",
                                viewBox: "0 0 20 20",
                                fill: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 339,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 338,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: translations.popular[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 341,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 337,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/services/page.tsx",
                    lineNumber: 336,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `h-2 w-full ${category === 'resources' ? 'bg-gradient-to-r from-green-400 to-green-500' : category === 'bots' ? 'bg-gradient-to-r from-blue-400 to-blue-500' : category === 'events' ? 'bg-gradient-to-r from-purple-400 to-purple-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`
                }, void 0, false, {
                    fileName: "[project]/src/app/services/page.tsx",
                    lineNumber: 347,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center mb-5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-24 h-24 ${getIconBgColor()} rounded-full flex items-center justify-center text-4xl shadow-md border border-white relative overflow-hidden group`,
                                children: [
                                    category === 'resources' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 transform transition-transform duration-300 group-hover:scale-110",
                                        children: [
                                            item.iconAlt === 'مليار قمح' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                role: "img",
                                                "aria-label": "قمح",
                                                className: "text-5xl",
                                                children: "🌾"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 362,
                                                columnNumber: 21
                                            }, this),
                                            item.iconAlt === 'حديد' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                role: "img",
                                                "aria-label": "حديد",
                                                className: "text-5xl",
                                                children: "⚙️"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 365,
                                                columnNumber: 21
                                            }, this),
                                            item.iconAlt === 'خشب' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                role: "img",
                                                "aria-label": "خشب",
                                                className: "text-5xl",
                                                children: "🌲"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 368,
                                                columnNumber: 21
                                            }, this),
                                            item.iconAlt === 'ذهب' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                role: "img",
                                                "aria-label": "ذهب",
                                                className: "text-5xl",
                                                children: "💰"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 21
                                            }, this),
                                            ![
                                                'مليار قمح',
                                                'حديد',
                                                'خشب',
                                                'ذهب'
                                            ].includes(item.iconAlt) && item.iconAlt
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 17
                                    }, this) : category === 'bots' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 transform transition-transform duration-300 group-hover:scale-110",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            role: "img",
                                            "aria-label": "بوت",
                                            className: "text-5xl",
                                            children: "🤖"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 377,
                                        columnNumber: 17
                                    }, this) : category === 'events' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 transform transition-transform duration-300 group-hover:scale-110",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            role: "img",
                                            "aria-label": "حدث",
                                            className: "text-5xl",
                                            children: "🎮"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 382,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, this) : category === 'castle' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10 transform transition-transform duration-300 group-hover:scale-110",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            role: "img",
                                            "aria-label": "قلعة",
                                            className: "text-5xl",
                                            children: "🏰"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative z-10",
                                        children: item.iconAlt
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 357,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-center mb-3 text-gray-800",
                            children: item.name[locale]
                        }, void 0, false, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 396,
                            columnNumber: 11
                        }, this),
                        item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 text-center mb-5 h-16 overflow-hidden line-clamp-3",
                            children: item.description[locale]
                        }, void 0, false, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center p-4 mb-5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-gray-600 font-medium flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "h-5 w-5 mr-1 text-amber-500",
                                            viewBox: "0 0 20 20",
                                            fill: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM7 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm3 4h.01a1 1 0 110 2H10a1 1 0 110-2zm-4 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1v-2z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 410,
                                            columnNumber: 15
                                        }, this),
                                        translations.price[locale],
                                        ":"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-amber-600 font-bold text-xl",
                                    children: [
                                        item.price,
                                        " ",
                                        translations.currency[locale]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 415,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 408,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center mb-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>decreaseQuantity(productKey),
                                    className: "w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300",
                                    "aria-label": "تقليل الكمية",
                                    children: "-"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 422,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    value: currentQuantity,
                                    min: "1",
                                    onChange: (e)=>{
                                        const newValue = parseInt(e.target.value) || 1;
                                        setQuantities({
                                            ...quantities,
                                            [productKey]: newValue > 0 ? newValue : 1
                                        });
                                    },
                                    className: "mx-3 font-medium text-lg w-16 text-center border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent",
                                    "aria-label": "الكمية"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>increaseQuantity(productKey),
                                    className: "w-12 h-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl font-bold border border-gray-200 hover:border-gray-300",
                                    "aria-label": "زيادة الكمية",
                                    children: "+"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 421,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 absolute bottom-5 left-6 right-6 flex items-center justify-center ${addedItems[productKey] ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-200 hover:shadow-lg' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg shadow-amber-200'}`,
                            onClick: ()=>handleAddToCart(item, category),
                            children: addedItems[productKey] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-5 w-5 mr-2",
                                        viewBox: "0 0 20 20",
                                        fill: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fillRule: "evenodd",
                                            d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                            clipRule: "evenodd"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 465,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 19
                                    }, this),
                                    translations.added[locale],
                                    " (",
                                    currentQuantity,
                                    ")"
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: "h-5 w-5 mr-2",
                                        viewBox: "0 0 20 20",
                                        fill: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/page.tsx",
                                            lineNumber: 472,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 19
                                    }, this),
                                    translations.orderNow[locale],
                                    " (",
                                    currentQuantity,
                                    ")"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/app/services/page.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/services/page.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/services/page.tsx",
            lineNumber: 333,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${("TURBOPACK compile-time truthy", 1) ? 'rtl' : ("TURBOPACK unreachable", undefined)} min-h-screen bg-gray-50`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$ServiceCartButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                totalItems: totalItems,
                toggleCart: toggleCart
            }, void 0, false, {
                fileName: "[project]/src/app/services/page.tsx",
                lineNumber: 487,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$ServiceCartDropdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isCartOpen,
                cartItems: cartItems,
                removeFromCart: removeFromCart,
                toggleCart: toggleCart,
                goToCheckout: goToCheckout,
                locale: locale,
                translations: translations
            }, void 0, false, {
                fileName: "[project]/src/app/services/page.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full py-12 md:py-16 px-4 text-center relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 w-full h-full z-0",
                        style: {
                            backgroundImage: "url('/images/bg233.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                            /* ضبط موضع الصورة للعرض الأفضل */ backgroundRepeat: "no-repeat"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 507,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/30 md:bg-black/20 z-0"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 518,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl md:text-4xl font-bold text-white mb-10",
                                children: "كل ما تحتاجه للتفوق في عالم الفاتحون"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 521,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap justify-center gap-6 md:gap-10 mt-6 mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveCategory('resources'),
                                        className: `px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'resources' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700",
                                                children: "🏆"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "الموارد"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 532,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveCategory('events'),
                                        className: `px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'events' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700",
                                                children: "🎮"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 539,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "الأحداث"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 540,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 535,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveCategory('bots'),
                                        className: `px-6 py-3 rounded-full flex items-center gap-2 text-lg ${activeCategory === 'bots' ? 'bg-amber-100 text-amber-800 font-medium' : 'bg-white/20 text-white hover:bg-white/30'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center text-amber-700",
                                                children: "🤖"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "الروبوتات"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 543,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 520,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/page.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 py-12",
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500 mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 558,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg text-gray-600",
                                children: "جاري تحميل الخدمات..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 559,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 557,
                        columnNumber: 11
                    }, this),
                    error && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold",
                                children: "حدث خطأ!"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 566,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 567,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 565,
                        columnNumber: 11
                    }, this),
                    !loading && activeCategory === 'resources' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold mb-4 text-center text-amber-700",
                                children: translations.resourcesTitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 574,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-600 max-w-2xl mx-auto mb-10",
                                children: translations.resourcesSubtitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 577,
                                columnNumber: 13
                            }, this),
                            services.resources && services.resources.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                                children: services.resources.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                        item: item,
                                        category: "resources"
                                    }, item.id, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 582,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "لا توجد موارد متاحة حاليًا"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 589,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 588,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 573,
                        columnNumber: 11
                    }, this),
                    !loading && activeCategory === 'castle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold mb-4 text-center text-amber-700",
                                children: translations.castleTitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-600 max-w-2xl mx-auto mb-10",
                                children: translations.castleSubtitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 600,
                                columnNumber: 13
                            }, this),
                            services.castle && services.castle.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                                children: services.castle.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                        item: item,
                                        category: "castle"
                                    }, item.id, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 607,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 605,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "لا توجد قلاع متاحة حاليًا"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 612,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 611,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this),
                    !loading && activeCategory === 'bots' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold mb-4 text-center text-amber-700",
                                children: translations.botsTitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-600 max-w-2xl mx-auto mb-10",
                                children: translations.botsSubtitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, this),
                            services.bots && services.bots.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                                children: services.bots.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                        item: item,
                                        category: "bots"
                                    }, item.id, false, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 630,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 628,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "لا توجد بوتات متاحة حاليًا"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 635,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 634,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 619,
                        columnNumber: 11
                    }, this),
                    !loading && activeCategory === 'events' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold mb-4 text-center text-amber-700",
                                children: translations.eventsTitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-600 max-w-2xl mx-auto mb-10",
                                children: translations.eventsSubtitle[locale]
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 646,
                                columnNumber: 13
                            }, this),
                            services.events && services.events.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
                                children: services.events.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${item.popular ? 'relative' : ''}`,
                                        children: [
                                            item.popular && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-4 left-0 right-0 bg-amber-500 text-white text-center py-1 rounded-t-lg z-10",
                                                children: translations.popular[locale]
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 656,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                                item: item,
                                                category: "events"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/page.tsx",
                                                lineNumber: 660,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/src/app/services/page.tsx",
                                        lineNumber: 653,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 651,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 text-gray-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "لا توجد فعاليات متاحة حاليًا"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/page.tsx",
                                lineNumber: 665,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/page.tsx",
                        lineNumber: 642,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/page.tsx",
                lineNumber: 554,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/services/page.tsx",
        lineNumber: 485,
        columnNumber: 5
    }, this);
}
_s(ServicesPage, "gIS3JUzl/TQ+LUdX8woaJ+vI/AU=");
_c = ServicesPage;
var _c;
__turbopack_context__.k.register(_c, "ServicesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_41b7efcc._.js.map