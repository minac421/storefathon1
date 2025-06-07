/** @type {import('next').NextConfig} */
const nextConfig = {
  // تعطيل ESLint و TypeScript أثناء البناء
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // App Router includes built-in support for internationalization
  // We've removed i18n config here as App Router handles it differently
  // See the middleware.ts file for routing logic
  
  // Image optimization - allow external domains if needed
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  
  // Environment variables for client-side
  env: {
    SITE_NAME: ':store fathon',
  },
  
  // Custom webpack configuration for RTL support and Socket.IO support
  webpack: (config, { isServer }) => {
    // تكوين Socket.IO
    if (!isServer) {
      // إضافة polyfill للـ Buffer لمكتبة socket.io-client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
      };
    }
    
    return config;
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // تحسينات للخادم لدعم Socket.IO بشكل أفضل
  experimental: {
    // تحسين الآداء
    optimizeCss: true,
    // تحسين الاستضافة
    outputFileTracingIgnores: ['node_modules/@swc/core', 'node_modules/socket.io'],
  },
  
  // تكوين الخادم - زيادة مهلة الطلبات
  serverRuntimeConfig: {
    // زيادة مهلة الجلسة للـ Socket.IO
    socketIoTimeout: 60000,
  },
  
  // تفعيل مزامنة خادم Turbopack
  turbo: {
    resolveAliases: {
      'socket.io-client': require.resolve('socket.io-client'),
    },
  },
};

module.exports = nextConfig;
