import React from 'react';

export default function SectionHeader({ subtitle, title, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <span className="text-roi-orange text-xs font-bold uppercase tracking-widest">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
        {title}
      </h2>
    </div>
  );
}