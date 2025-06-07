export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 max-w-md bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mb-6">عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
} 