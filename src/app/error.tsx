'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // أرسل التقرير عن الأخطاء إلى خدمة التتبع
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 text-white px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">حدث خطأ ما!</h1>
      <p className="text-lg text-slate-300 mb-8 text-center max-w-md">
        نأسف، حدث خطأ ما أثناء عرض هذه الصفحة. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-bold transition-all hover:scale-105 shadow-lg"
        >
          المحاولة مرة أخرى
        </button>
        <Link 
          href="/ar"
          className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg text-lg font-bold transition-all text-center"
        >
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  )
} 