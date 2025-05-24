(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__de110ef0._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
// Supported locales
const locales = [
    'ar',
    'en',
    'tr'
];
const defaultLocale = 'ar';
const config = {
    // استبعاد المسار الجذر / حتى يتم عرض الصفحة الرئيسية مباشرة
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$|$).*)'
    ]
};
const cookieName = 'NEXT_LOCALE';
/**
 * Simple function to extract language preference from Accept-Language header
 */ function getPreferredLocale(acceptLanguageHeader) {
    if (!acceptLanguageHeader) return defaultLocale;
    // Parse the Accept-Language header
    const languages = acceptLanguageHeader.split(',');
    const primaryLanguage = languages[0].split('-')[0].toLowerCase();
    // Check if primary language is in our supported locales
    if (locales.includes(primaryLanguage)) {
        return primaryLanguage;
    }
    return defaultLocale;
}
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    // تجاهل المسار الجذر / حتى تظهر الصفحة الرئيسية
    if (pathname === '/') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Check if the pathname already has a locale
    const pathnameHasLocale = locales.some((locale)=>pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    // If the pathname already has a locale, pass it through
    if (pathnameHasLocale) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Get user's preferred locale from cookie or Accept-Language header
    const cookieLocale = request.cookies.get(cookieName)?.value;
    const preferredLocale = cookieLocale || getPreferredLocale(request.headers.get('Accept-Language'));
    // Build the new URL with locale prefix
    const newUrl = new URL(`/${preferredLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`, request.url);
    // Preserve the search params
    newUrl.search = request.nextUrl.search;
    // Set a cookie with the locale for future reference
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(newUrl);
    response.cookies.set(cookieName, preferredLocale, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
    });
    return response;
}
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__de110ef0._.js.map