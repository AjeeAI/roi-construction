import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot'; // ✅ 1. Import the new Chatbot component

export default function App() {
  return (
    <div className="bg-roi-dark text-white font-sans selection:bg-roi-orange selection:text-white">
      
      {/* ✅ React 19 natively hoists these to the document <head> */}
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
      
      {/* ✅ 2. Add the Chatbot here at the bottom so it floats over all other content */}
      <Chatbot />
    </div>
  );
}