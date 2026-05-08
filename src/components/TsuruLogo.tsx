import React from 'react';

export default function TsuruLogo({ className = "w-8 h-8", color = "#3ABEF9" }: { className?: string, color?: string }) {
  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M256 48L112 192L256 256L400 192L256 48Z" 
        fill={color} 
        stroke={color} 
        strokeWidth="10" 
        strokeLinejoin="round"
      />
      <path 
        d="M256 256L112 384L256 464L400 384L256 256Z" 
        fill={color} 
        fillOpacity="0.8"
        stroke={color} 
        strokeWidth="10" 
        strokeLinejoin="round"
      />
      <path 
        d="M112 192L32 320L112 384L256 256L112 192Z" 
        fill={color} 
        fillOpacity="0.6"
        stroke={color} 
        strokeWidth="10" 
        strokeLinejoin="round"
      />
      <path 
        d="M400 192L480 320L400 384L256 256L400 192Z" 
        fill={color} 
        fillOpacity="0.6"
        stroke={color} 
        strokeWidth="10" 
        strokeLinejoin="round"
      />
      <path 
        d="M32 320L0 280M480 320L512 280" 
        stroke={color} 
        strokeWidth="15" 
        strokeLinecap="round"
      />
    </svg>
  );
}
