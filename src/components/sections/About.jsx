import React from 'react';
import quoteBackground from '/src/assets/roi_image1.png';
import FadeIn from '../ui/FadeIn';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#1a140f] overflow-hidden">
      
      {/* Design Element: Brown Shadow/Glow implementation */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #3d2b1f 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <FadeIn direction="left">
          <span className="text-roi-orange text-xs font-bold uppercase tracking-widest">Bridging Construction & Real Estate</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight text-white">Every Strong Structure Starts<br />With What No One Sees.</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            At ROi Construction & Engineering LTD, we prioritize unseen quality above all else. We know that skipping soil testing or rushing compaction creates financial losses and structural risks. That’s why we rely on our rigorous QA/QC processes to shape spaces that grow in worth, comfort, and design.
          </p>
          <div className="flex gap-12 text-white">
            <div className="border-l-2 border-roi-orange pl-4">
              <div className="text-4xl font-bold text-roi-orange">QA/QC</div>
              <div className="text-xs uppercase tracking-widest mt-2 text-gray-300">Certified Materials</div>
            </div>
            <div className="border-l-2 border-roi-orange pl-4">
              <div className="text-4xl font-bold text-roi-orange">ROI</div>
              <div className="text-xs uppercase tracking-widest mt-2 text-gray-300">Guaranteed Value</div>
            </div>
          </div>
        </FadeIn>
        
        {/* Right Side: Image with Glow/Shadow effect */}
        <FadeIn direction="right" delay={0.2}>
          <div className="relative group">
            {/* Design Element: Subtle outer glow for the card itself */}
            <div className="absolute -inset-1 bg-[#f38918]/10 blur-2xl rounded-lg group-hover:bg-[#f38918]/20 transition duration-500"></div>
            
            <div 
              className="p-10 md:p-14 rounded-2xl aspect-square flex flex-col justify-end relative overflow-hidden bg-cover bg-center shadow-2xl border border-white/5"
              style={{ 
                backgroundImage: `url(${quoteBackground})` 
              }}
            >
              {/* Teal Overlay as seen in reference */}
              <div className="absolute inset-0 bg-[#4d948c]/80 mix-blend-multiply z-0"></div>
              
              {/* Quote Box with enhanced shadow */}
              <div className="bg-[#1a140f]/90 backdrop-blur-sm p-6 rounded-xl relative z-10 border-l-4 border-roi-orange shadow-2xl">
                <p className="text-lg md:text-xl font-medium mb-3 text-white">"Our foundation is built on trust. Every beam, block, and brick represents a promise to build with honesty, safety, and precision."</p>
                <p className="text-roi-orange text-sm font-bold uppercase tracking-widest">— ROi Core Values</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
      
    </section>
  );
}