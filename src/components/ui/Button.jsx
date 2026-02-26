import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "px-8 py-4 font-bold transition flex items-center justify-center gap-2 rounded-sm";
  const variants = {
    primary: "bg-roi-orange text-white hover:bg-orange-600",
    outline: "border border-white/20 text-white hover:bg-white/10",
    ghost: "text-roi-orange hover:text-orange-400 p-0"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}