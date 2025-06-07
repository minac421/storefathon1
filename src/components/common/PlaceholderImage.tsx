import React from 'react';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  width = 400,
  height = 300,
  text = 'لا توجد صورة',
  className = ''
}) => {
  return (
    <div 
      className={`flex items-center justify-center bg-gray-200 ${className}`}
      style={{ width: width, height: height }}
    >
      <div className="text-center p-4">
        <svg 
          className="w-12 h-12 mx-auto text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
        <p className="text-gray-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default PlaceholderImage; 