"use client";

import React, { useEffect, useState } from 'react';

const ChatScrollButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Effect to handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      // Hide button when user scrolls past a certain point
      const chatSection = document.getElementById('chat-section');
      if (chatSection) {
        const chatSectionPosition = chatSection.getBoundingClientRect().top;
        setIsVisible(chatSectionPosition > 200); // Only show when chat section is not in view
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to chat section
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToChat}
      className={`
        fixed top-24 left-1/2 transform -translate-x-1/2 z-50
        bg-blue-600 hover:bg-blue-700 text-white 
        px-6 py-3 rounded-full shadow-lg
        flex items-center gap-2
        transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'}
      `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      انتقل للدردشة
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ChatScrollButton;
