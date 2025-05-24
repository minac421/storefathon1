import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">الصفحة غير موجودة</h2>
      <p className="text-lg text-slate-300 mb-8 text-center max-w-md">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
      </p>
      <Link 
        href="/ar"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
} 