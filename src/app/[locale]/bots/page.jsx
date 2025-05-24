import React from 'react';
import BotsClient from './client';
import getTranslation from '@/lib/i18n';

// Sample bots data
const botsData = [
  {
    id: 1,
    name: 'روبوت المزارع الذكي',
    description: 'روبوت متخصص في إدارة المزارع بشكل أوتوماتيكي، يزيد من إنتاجية مواردك بنسبة تصل إلى 40%.',
    price: 79,
    features: [
      'إدارة أوتوماتيكية للمزارع',
      'جدولة زمنية مخصصة',
      'تحليل وتقارير الإنتاج',
      'تنبيهات الهجمات',
      'واجهة سهلة الاستخدام'
    ],
    imageUrl: '/images/bots/farm-bot.jpg',
    demoUrl: 'https://example.com/demo/farm-bot',
    compatibility: ['windows', 'mac', 'android'],
    category: 'farm',
    popular: true,
    free: false
  },
  {
    id: 2,
    name: 'روبوت المعارك المتقدم',
    description: 'روبوت متخصص للاعبين المحاربين، يدير هجماتك ودفاعاتك بكفاءة عالية ويحلل تقارير المعارك.',
    price: 129,
    features: [
      'جدولة الهجمات تلقائياً',
      'تحليل تقارير المعارك',
      'اختيار أهداف ذكي',
      'إدارة الدفاعات',
      'تنسيق مع أعضاء التحالف',
      'تكتيكات متقدمة'
    ],
    imageUrl: '/images/bots/battle-bot.jpg',
    demoUrl: 'https://example.com/demo/battle-bot',
    compatibility: ['windows', 'android'],
    category: 'battle',
    popular: true,
    free: false
  },
  {
    id: 3,
    name: 'روبوت المبتدئين',
    description: 'روبوت بسيط ومجاني للاعبين الجدد، يساعدك على تعلم أساسيات اللعبة وإدارة مملكتك.',
    price: null,
    features: [
      'إدارة موارد بسيطة',
      'مساعدة للمبتدئين',
      'تنبيهات أساسية',
      'دليل تعليمي مدمج'
    ],
    imageUrl: '/images/bots/beginner-bot.jpg',
    demoUrl: 'https://example.com/demo/beginner-bot',
    compatibility: ['windows', 'mac', 'linux', 'android', 'ios'],
    category: 'all',
    popular: false,
    free: true
  },
  {
    id: 4,
    name: 'روبوت التحالفات الشامل',
    description: 'روبوت متكامل لقادة التحالفات، يدير كافة جوانب التحالف من تنسيق الهجمات إلى توزيع الموارد.',
    price: 199,
    features: [
      'تنسيق هجمات التحالف',
      'إدارة مساعدات التحالف',
      'تنظيم الاجتماعات والفعاليات',
      'تحليل نقاط القوة والضعف',
      'استراتيجيات الحرب المتقدمة',
      'شات مدمج للتحالف'
    ],
    imageUrl: '/images/bots/alliance-bot.jpg',
    demoUrl: 'https://example.com/demo/alliance-bot',
    compatibility: ['windows', 'mac'],
    category: 'alliance',
    popular: false,
    free: false
  },
  {
    id: 5,
    name: 'روبوت الموارد المتطور',
    description: 'روبوت متخصص في جمع وإدارة الموارد، مع تحسين مستمر لاستراتيجيات الإنتاج والتجارة.',
    price: 99,
    features: [
      'تجميع موارد أوتوماتيكي',
      'استراتيجيات تجارة ذكية',
      'توزيع موارد متوازن',
      'تنبيهات نقص الموارد',
      'تقارير تحليلية مفصلة',
      'توصيات للتطوير'
    ],
    imageUrl: '/images/bots/resource-bot.jpg',
    demoUrl: 'https://example.com/demo/resource-bot',
    compatibility: ['windows', 'android', 'mac'],
    category: 'resource',
    popular: true,
    free: false
  },
  {
    id: 6,
    name: 'روبوت ذكاء المعارك',
    description: 'روبوت متطور يستخدم الذكاء الاصطناعي لتحليل المعارك وتحسين استراتيجياتك العسكرية.',
    price: 149,
    features: [
      'تحليل ذكي للمعارك',
      'توقع هجمات العدو',
      'تحسين تشكيلات الجيش',
      'استراتيجيات متقدمة',
      'تعلم مستمر',
      'تحديثات أسبوعية'
    ],
    imageUrl: '/images/bots/ai-battle-bot.jpg',
    demoUrl: 'https://example.com/demo/ai-battle-bot',
    compatibility: ['windows'],
    category: 'battle',
    popular: false,
    free: false
  }
];

// Server component
export default async function BotsPage({ params }) {
  const locale = params.locale;
  const t = getTranslation(locale);
  
  // Pass all data to the client component
  return <BotsClient bots={botsData} locale={locale} t={t} />;
}
