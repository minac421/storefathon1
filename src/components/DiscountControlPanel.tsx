import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

export default function DiscountControlPanel() {
  const [productId, setProductId] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [type, setType] = useState('fixed');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/discounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          discountAmount: Number(discountAmount),
          durationDays: Number(durationDays),
          type,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('تم إضافة الخصم بنجاح');
        router.refresh();
      } else {
        alert(data.error || 'حدث خطأ أثناء إضافة الخصم');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء إضافة الخصم');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">لوحة تحكم الخصومات</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">معرف المنتج</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">قيمة الخصم</label>
          <input
            type="number"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">مدة الخصم (أيام)</label>
          <input
            type="number"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">نوع الخصم</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="fixed">خصم ثابت</option>
            <option value="percentage">خصم نسبة</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          إضافة خصم
        </button>
      </form>
    </div>
  );
}
