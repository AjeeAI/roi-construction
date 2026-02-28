import React from 'react';
// Changed the icon imports to include Instagram and LinkedIn since they are active there
import { Instagram, Linkedin, Globe } from 'lucide-react'; 
import roiLogo from '/src/assets/roi_logo_clear.png'; // Fixed the import location

export default function Footer() {
  return (
    <footer className="bg-[#110d0a] pt-20 pb-8 px-6 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          {/* Updated Logo Wrapper */}
          <div className="mb-6 inline-block">
            <img 
              src={roiLogo} 
              alt="ROi Construction & Engineering LTD" 
              // Uses brightness and invert to turn the black logo into a clean, professional white
              className="h-10 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Leading the industry with innovative construction methods, zero guesswork, and a commitment to quality that is unmatched in Nigeria.
          </p>
          <div className="flex gap-4">
            {/* Added social links based on their active profiles */}
            <a href="https://instagram.com/roiconstruction.ng" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-full bg-[#2a221a] flex items-center justify-center text-roi-orange hover:bg-roi-orange hover:text-white transition">
              <Instagram size={14} />
            </a>
            <a href="https://www.linkedin.com/company/roiconstructionng/" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-[#2a221a] flex items-center justify-center text-roi-orange hover:bg-roi-orange hover:text-white transition">
              <Linkedin size={14} />
            </a>
            <a href="https://roiconstruction.web.app" target="_blank" rel="noreferrer" aria-label="Website" className="w-8 h-8 rounded-full bg-[#2a221a] flex items-center justify-center text-roi-orange hover:bg-roi-orange hover:text-white transition">
              <Globe size={14} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold mb-6 text-white">Navigation</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#home" className="hover:text-roi-orange transition">Home</a></li>
            <li><a href="#about" className="hover:text-roi-orange transition">About Us</a></li>
            <li><a href="#services" className="hover:text-roi-orange transition">The ROi Standard</a></li>
            <li><a href="#contact" className="hover:text-roi-orange transition">Book a Consultation</a></li>
          </ul>
        </div>

        {/* Expertise */}
        <div>
          <h4 className="font-bold mb-6 text-white">Expertise</h4>
          <ul className="space-y-4 text-gray-400">
            {/* Updated to match their actual core competencies */}
            <li><a href="#" className="hover:text-roi-orange transition">Pre-Construction Planning</a></li>
            <li><a href="#" className="hover:text-roi-orange transition">Foundation & Compaction</a></li>
            <li><a href="#" className="hover:text-roi-orange transition">Structural Engineering</a></li>
            <li><a href="#" className="hover:text-roi-orange transition">Whole Life Costing</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-6 text-white">Site Updates</h4>
          <p className="text-gray-400 mb-4">Get the latest project highlights and construction tips directly to your inbox.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-[#2a221a] border border-white/10 p-3 rounded-l w-full focus:outline-none focus:border-roi-orange text-white"
              required
            />
            <button type="submit" aria-label="Subscribe" className="bg-roi-orange px-4 rounded-r flex items-center justify-center hover:bg-orange-600 transition text-white font-bold">
              +
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
        <p>&copy; 2026 ROi Construction & Engineering LTD. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Quality Assurance</a>
        </div>
      </div>
    </footer>
  );
}