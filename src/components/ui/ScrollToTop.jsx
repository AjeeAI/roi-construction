import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null); // Keeps track of our inactivity timer

  useEffect(() => {
    const handleScroll = () => {
      // 1. Clear the existing timer every time the user moves the page
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 2. Show the button if they are past the 500px mark
      if (window.scrollY > 500) {
        setIsVisible(true);

        // 3. Set timer to hide the button after 3 seconds of NO scrolling
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 3000); 
      } else {
        // If they scroll back to the very top of the Hero, hide it immediately
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-50 p-2.5 rounded-full bg-gray-500/20 backdrop-blur-md text-white/60 border border-white/10 shadow-lg hover:bg-roi-orange hover:text-white hover:border-roi-orange transition-all duration-500 focus:outline-none ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}