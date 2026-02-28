import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

import roiLogo from '/src/assets/roi_logo_clear.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ['Home', 'About', 'Services', 'Contact'];

  return (
    <nav className="fixed w-full z-50 bg-[#1a140f]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        
        
        <a href="#home" className="flex items-center z-50">
  <img 
    src={roiLogo} 
    alt="ROi Construction" 
    
    className="h-10 md:h-12 w-auto object-contain brightness-0 invert transition-opacity hover:opacity-80"
  />
</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-roi-orange transition">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="primary" className="!py-2 !px-6 text-sm">Get a Quote</Button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden text-white z-50 p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-[#1a140f] border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col px-6 py-8 gap-4">
              {navLinks.map(link => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)} 
                  className="text-xl font-bold uppercase tracking-wider text-white hover:text-roi-orange transition-colors border-b border-white/5 pb-4"
                >
                  {link}
                </a>
              ))}
              <Button variant="primary" className="w-full mt-4" onClick={() => setIsOpen(false)}>
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}