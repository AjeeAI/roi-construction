import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import ScrollToTop from './components/ui/ScrollToTop';

export default function App() {
  
  // ✅ 1. Backend Wake-up Effect
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        
        const apiUrl = 'https://roi-construction-backend.onrender.com'; 
        
        const response = await fetch(`${apiUrl}/health`);
        if (response.ok) {
          console.log("Backend is awake and ready!");
        }
      } catch (error) {
        console.error("Failed to ping backend:", error);
      }
    };

    wakeUpBackend();
  }, []); 

 
  useEffect(() => {
    // Grab all sections that have an ID
    const sections = document.querySelectorAll('section[id], header[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      
      { rootMargin: '-40% 0px -60% 0px' } 
    );

    sections.forEach((section) => observer.observe(section));

    // Cleanup function when component unmounts
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="bg-roi-dark text-white font-sans selection:bg-roi-orange selection:text-white">
      
      
      <title>ROi Construction | Building Excellence, Delivering Value</title>
      <meta name="description" content="Professional construction services specializing in residential, commercial, and renovation projects." />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />
      
      <ScrollToTop />
      <Chatbot />
    </div>
  );
}