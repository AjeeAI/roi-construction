import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn'; 

import heroBg from '../../assets/bld_img.png'; 

export default function Hero() {
  return (
 
    <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden bg-[#211b16]">
      
      {/* --- Background Area --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="ROi Construction site progress" 
          
          className="w-full h-full object-cover opacity-100 mix-blend-multiply" 
        />
        
       
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a140f] via-[#1a140f]/70 to-transparent" />
      </div>

      {/* --- Content Area --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        <FadeIn direction="up" delay={0.1}>
          <span className="bg-roi-orange/20 text-roi-orange border border-roi-orange/30 px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block rounded-sm">
            Zero Guesswork. 100% Precision.
          </span>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
            We Don't Guess.<br />
            <span className="italic text-roi-orange font-light font-serif">We Plan.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.5}>
          
          <p className="max-w-xl text-gray-200 text-lg mb-8 leading-relaxed">
            We're not just putting up buildings; we're creating legacies. From rigorous soil assessment to flawless execution, we build structures that stand long after us.
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
>
              Book a Scoping Session <ChevronRight size={18} />
            </Button>
            <Button variant="outline">
              View Our Projects
            </Button>
          </div>
        </FadeIn>
        
      </div>
    </section>
  );
}