"use client";

import React, { useState, useEffect } from 'react';
import { calibrateSystem } from '../../utils/castle-valuation/improvedCastleValuation';

export default function CalibrationPage() {
  const [calibrationResults, setCalibrationResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // تشغيل المعايرة عند تحميل الصفحة
    const results = calibrateSystem();
    setCalibrationResults(results);
    setIsLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">معايرة نظام تقييم قلاع الفاتحون</h1>
        <p className="text-gray-600">التحقق من دقة النظام باستخدام قلاع نموذجية ذات أسعار معروفة</p>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-xl">جاري التحميل...</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نوع القلعة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعر المتوقع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعر المحسوب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفرق
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نسبة الفرق
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {calibrationResults.map((result, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${result.expectedPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${result.calculatedPrice}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${result.difference > 0 ? 'text-red-500' : result.difference < 0 ? 'text-blue-500' : 'text-green-500'}`}>
                    {result.difference > 0 ? '+' : ''}{result.difference}$
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${Math.abs(parseFloat(result.differencePercent)) > 10 ? 'text-red-500' : 'text-green-500'}`}>
                    {result.differencePercent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600">
              <span className="font-bold">ملاحظة:</span> يعتبر النظام دقيقًا إذا كانت نسبة الفرق أقل من ±10% بين السعر المتوقع والسعر المحسوب.
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <a 
          href="/castle-valuation" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          العودة إلى نظام التقييم
        </a>
      </div>
    </div>
  );
} 