"use client";

import React, { useState } from 'react';
import getTranslation from '@/lib/i18n';

export default function CustomOrderPage({ params }: { params: { locale: string } }) {
  // الحصول على اللغة من المعلمات
  const locale = params?.locale || 'ar';
  const t = getTranslation(locale);
  const isRTL = locale === 'ar';
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'resources',
    description: '',
    budget: '',
    contactMethod: 'email'
  });
  
  // حالة إرسال النموذج
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // التعامل مع تغيير قيم النموذج
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // التعامل مع إرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // هنا يمكن إضافة منطق لإرسال البيانات إلى الخادم
    // محاكاة عملية إرسال ناجحة بعد ثانيتين
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // إعادة تعيين النموذج
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderType: 'resources',
        description: '',
        budget: '',
        contactMethod: 'email'
      });
    }, 2000);
  };
  
  // أنواع الطلبات
  const orderTypes = [
    { value: 'resources', label: locale === 'ar' ? 'موارد' : locale === 'tr' ? 'Kaynaklar' : 'Resources' },
    { value: 'military', label: locale === 'ar' ? 'عسكري' : locale === 'tr' ? 'Askeri' : 'Military' },
    { value: 'logistics', label: locale === 'ar' ? 'لوجستيات' : locale === 'tr' ? 'Lojistik' : 'Logistics' },
    { value: 'accounts', label: locale === 'ar' ? 'حسابات' : locale === 'tr' ? 'Hesaplar' : 'Accounts' },
    { value: 'vip', label: locale === 'ar' ? 'خدمة VIP' : locale === 'tr' ? 'VIP Hizmeti' : 'VIP Service' },
    { value: 'other', label: locale === 'ar' ? 'أخرى' : locale === 'tr' ? 'Diğer' : 'Other' },
  ];
  
  // طرق التواصل
  const contactMethods = [
    { value: 'email', label: locale === 'ar' ? 'البريد الإلكتروني' : locale === 'tr' ? 'E-posta' : 'Email' },
    { value: 'phone', label: locale === 'ar' ? 'الهاتف' : locale === 'tr' ? 'Telefon' : 'Phone' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'telegram', label: 'Telegram' },
    { value: 'discord', label: 'Discord' },
  ];
  
  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-700 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {locale === 'ar' ? 'طلب خدمة مخصصة' : locale === 'tr' ? 'Özel Hizmet İsteği' : 'Custom Service Request'}
            </h1>
            <p className="text-xl">
              {locale === 'ar' ? 'أخبرنا عن احتياجاتك الخاصة وسنقوم بتقديم الحلول المناسبة لك' : locale === 'tr' ? 'Bize özel ihtiyaçlarınızı anlatın, size uygun çözümler sunalım' : 'Tell us about your specific needs and we will provide the right solutions for you'}
            </p>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {locale === 'ar' ? 'نموذج طلب خدمة' : locale === 'tr' ? 'Hizmet İstek Formu' : 'Service Request Form'}
                </h2>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        {locale === 'ar' ? 'الاسم' : locale === 'tr' ? 'Ad Soyad' : 'Name'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={locale === 'ar' ? 'أدخل اسمك الكامل' : locale === 'tr' ? 'Tam adınızı girin' : 'Enter your full name'}
                      />
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        {locale === 'ar' ? 'البريد الإلكتروني' : locale === 'tr' ? 'E-posta' : 'Email'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : locale === 'tr' ? 'E-posta adresinizi girin' : 'Enter your email'}
                      />
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                        {locale === 'ar' ? 'رقم الهاتف' : locale === 'tr' ? 'Telefon' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={locale === 'ar' ? 'أدخل رقم هاتفك' : locale === 'tr' ? 'Telefon numaranızı girin' : 'Enter your phone number'}
                      />
                    </div>
                    
                    {/* Order Type Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="orderType">
                        {locale === 'ar' ? 'نوع الطلب' : locale === 'tr' ? 'İstek Türü' : 'Order Type'}
                      </label>
                      <select
                        id="orderType"
                        name="orderType"
                        value={formData.orderType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {orderTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Budget Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="budget">
                        {locale === 'ar' ? 'الميزانية ($)' : locale === 'tr' ? 'Bütçe ($)' : 'Budget ($)'}
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={locale === 'ar' ? 'أدخل ميزانيتك التقريبية' : locale === 'tr' ? 'Yaklaşık bütçenizi girin' : 'Enter your approximate budget'}
                      />
                    </div>
                    
                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="contactMethod">
                        {locale === 'ar' ? 'طريقة التواصل المفضلة' : locale === 'tr' ? 'Tercih Edilen İletişim Yöntemi' : 'Preferred Contact Method'}
                      </label>
                      <select
                        id="contactMethod"
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {contactMethods.map((method) => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Description Field */}
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                      {locale === 'ar' ? 'وصف الطلب' : locale === 'tr' ? 'İstek Açıklaması' : 'Order Description'}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={locale === 'ar' ? 'اشرح تفاصيل طلبك هنا...' : locale === 'tr' ? 'İsteğinizin ayrıntılarını burada açıklayın...' : 'Explain the details of your request here...'}
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="mt-8 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting 
                        ? (locale === 'ar' ? 'جاري الإرسال...' : locale === 'tr' ? 'Gönderiliyor...' : 'Submitting...') 
                        : (locale === 'ar' ? 'إرسال الطلب' : locale === 'tr' ? 'İsteği Gönder' : 'Submit Request')}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              // رسالة نجاح إرسال الطلب
              <div className="text-center py-10">
                <div className="text-6xl mb-6 text-green-500 mx-auto">✓</div>
                <h2 className="text-2xl font-bold mb-4">
                  {locale === 'ar' ? 'تم استلام طلبك بنجاح!' : locale === 'tr' ? 'İsteğiniz başarıyla alındı!' : 'Your request has been successfully received!'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {locale === 'ar' 
                    ? 'سنقوم بالتواصل معك في أقرب وقت ممكن. شكرًا لاختيارك خدماتنا.' 
                    : locale === 'tr' 
                      ? 'En kısa sürede sizinle iletişime geçeceğiz. Hizmetlerimizi seçtiğiniz için teşekkür ederiz.'
                      : 'We will contact you as soon as possible. Thank you for choosing our services.'}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  {locale === 'ar' ? 'إرسال طلب آخر' : locale === 'tr' ? 'Başka Bir İstek Gönder' : 'Submit Another Request'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {locale === 'ar' ? 'لماذا تختار خدماتنا المخصصة؟' : locale === 'tr' ? 'Neden Özel Hizmetlerimizi Seçmelisiniz?' : 'Why Choose Our Custom Services?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-indigo-600 mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'سرعة التنفيذ' : locale === 'tr' ? 'Hızlı Teslimat' : 'Fast Delivery'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar' 
                  ? 'نضمن تسليم طلبك في أسرع وقت ممكن مع الحفاظ على الجودة.' 
                  : locale === 'tr'
                    ? 'Kaliteden ödün vermeden siparişinizi mümkün olan en kısa sürede teslim etmeyi garanti ediyoruz.'
                    : 'We guarantee to deliver your order as quickly as possible while maintaining quality.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-indigo-600 mb-4">👑</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'جودة عالية' : locale === 'tr' ? 'Yüksek Kalite' : 'High Quality'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar' 
                  ? 'جميع خدماتنا تخضع لمعايير جودة عالية لضمان رضاك التام.' 
                  : locale === 'tr'
                    ? 'Tüm hizmetlerimiz, tam memnuniyetinizi sağlamak için yüksek kalite standartlarına tabidir.'
                    : 'All our services are subject to high quality standards to ensure your complete satisfaction.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl text-indigo-600 mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">
                {locale === 'ar' ? 'أمان تام' : locale === 'tr' ? 'Tam Güvenlik' : 'Complete Security'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ar' 
                  ? 'نضمن أمان حسابك وخصوصية بياناتك الشخصية في جميع مراحل الخدمة.' 
                  : locale === 'tr'
                    ? 'Hizmetin tüm aşamalarında hesabınızın güvenliğini ve kişisel verilerinizin gizliliğini garanti ediyoruz.'
                    : 'We ensure the security of your account and privacy of your personal data at all stages of service.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 