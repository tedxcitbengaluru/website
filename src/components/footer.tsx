import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

const Footer: React.FC = () => {
  return (
    <div style={{
      fontFamily: montserrat.style.fontFamily,
    }} className="bg-[#1f1f1f] w-full text-white text-center h-16 p-4">
      Copyright 2023 &copy; TEDxCIT Bengaluru. This independent TEDx event is operated under license from TED.
    </div>
  );
};

export default Footer;
