"use client";

import React, { useState } from 'react';

const ContactButtons = () => {
  const [showWhatsappOptions, setShowWhatsappOptions] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Telegram Button */}
      <a 
        href="https://t.me/Moon_ClawoaN" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 hover:bg-blue-600 group"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap shadow-md">
          تلجرام
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.17-.04-.24-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.67-.4-.68-.23-1.21-.35-1.16-.74.02-.2.3-.4.81-.6 3.17-1.35 5.29-2.24 6.39-2.68 3.05-1.24 3.69-1.46 4.1-1.47.09 0 .29.02.42.16.11.1.14.26.16.37.01.09.02.28 0 .38z"/>
        </svg>
      </a>

      {/* Telegram Group Button */}
      <a 
        href="https://t.me/storefathon1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 hover:bg-indigo-600 group"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap shadow-md">
          جروب التلجرام
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.17 14.83c-.39.39-1.02.39-1.41 0L12 13.17l-3.76 3.76c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 6.83 8.24c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.76-3.76c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l3.76 3.76c.39.39.39 1.03 0 1.41z"/>
        </svg>
      </a>

      {/* WhatsApp Button with Options */}
      <div className="relative">
        <button 
          onClick={() => setShowWhatsappOptions(!showWhatsappOptions)}
          className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 hover:bg-green-600 group"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap shadow-md">
            واتساب
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M17.6 6.32C16.16 4.91 14.13 4 12 4s-4.16.91-5.6 2.32C5.01 7.76 4 9.83 4 12c0 1.56.45 3.06 1.3 4.3L4.11 20.1l3.89-1.19c1.2.75 2.6 1.19 4 1.19 2.14 0 4.16-.91 5.6-2.32C18.99 16.24 20 14.17 20 12c0-2.17-1.01-4.24-2.4-5.68zM12 18.5c-1.29 0-2.5-.37-3.56-1.03l-.26-.15-2.79.86.87-2.71-.17-.29c-.71-1.21-1.08-2.63-1.08-4.18 0-4.55 3.7-8.25 8.25-8.25S21.5 7.45 21.5 12s-3.7 8.25-8.25 8.25zm2.25-6.15c.15.08.29.17.42.25.34.19.45.39.53.64.07.25.07.5.05.6-.02.11-.05.26-.22.41-.16.15-.34.2-.47.24-.7.22-1.62.38-2.31-.44-.17-.2-.28-.45-.35-.79-.06-.33-.03-.67.08-.98.11-.29.32-.51.56-.65.25-.15.51-.23.73-.29.54-.15 1.08.17.64.77-.44.59.21.73.34.85z"/>
          </svg>
        </button>
        
        {/* WhatsApp Numbers Popup */}
        {showWhatsappOptions && (
          <div className="absolute top-0 right-0 transform -translate-y-[105%] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-w-[210px] z-50">
            {/* Header */}
            <div className="bg-green-500 text-white py-2 px-4 text-sm font-bold text-center">
              اختر رقم للتواصل
            </div>
            
            {/* Options */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <a 
                href="https://wa.me/201062047932" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors gap-3"
                onClick={() => setShowWhatsappOptions(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">قلاوون</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 dark:text-gray-200">قلاوون</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 direction-ltr">+201062047932</span>
                </div>
              </a>
              
              <a 
                href="https://wa.me/905316574004" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors gap-3"
                onClick={() => setShowWhatsappOptions(false)}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">جلاد</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 dark:text-gray-200">جلاد</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 direction-ltr">+90 531 657 4004</span>
                </div>
              </a>
            </div>
          </div>
        )}
        
        {/* Overlay to close menu when clicking outside */}
        {showWhatsappOptions && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowWhatsappOptions(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ContactButtons;
