'use client';

import React from 'react';

const ScrollButton: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a 
      href="#pricing"
      onClick={handleClick}
      className="w-[250px] bg-[#FCD913] hover:bg-[#FCD913]/80 text-black h-[40px] rounded-full font-semibold flex items-center justify-center cursor-pointer"
    >
      Get Quote Now
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 ml-2" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
    </a>
  );
};

export default ScrollButton;