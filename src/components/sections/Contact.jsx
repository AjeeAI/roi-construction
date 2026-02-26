import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react'; // Swapped in Mail icon
import Button from '../ui/Button';
import FadeIn from '../ui/FadeIn';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: 'Pre-Construction & Soil Testing', // Updated default state
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your scoping session request has been sent.');
    
    setFormData({
      fullName: '',
      email: '',
      projectType: 'Pre-Construction & Soil Testing',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#1a140f] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        {/* Left Side: Text & Info */}
        <FadeIn direction="left">
          <div>
            <span className="text-roi-orange font-bold uppercase text-xs tracking-widest">Book A Consultation</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">Ready to Build<br />With Precision?</h2>
            <p className="text-gray-400 mb-12">Stop guessing when your project will finish. Schedule a project scoping session with our engineers today and let's guarantee a positive ROI on your build.</p>
            
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="bg-[#2a221a] p-3 rounded text-roi-orange"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Headquarters</h4>
                  <p className="text-gray-400 text-sm mt-1">Lagos, Nigeria<br />Available for Nationwide Projects</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-[#2a221a] p-3 rounded text-roi-orange"><Mail size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Direct Email</h4>
                  <p className="text-gray-400 text-sm mt-1">roiconstructionng@gmail.com<br />We respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right Side: Form */}
        <FadeIn direction="right" delay={0.2} fullWidth>
          <form onSubmit={handleSubmit} className="bg-[#2a221a] p-8 rounded-lg border border-white/5 shadow-2xl h-full">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-[#1a140f] border border-white/10 p-4 rounded focus:border-roi-orange outline-none transition text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-gray-400">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full bg-[#1a140f] border border-white/10 p-4 rounded focus:border-roi-orange outline-none transition text-white" required />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <label className="text-xs uppercase font-bold text-gray-400">Project Type</label>
              <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-[#1a140f] border border-white/10 p-4 rounded focus:border-roi-orange outline-none transition text-white appearance-none cursor-pointer">
                {/* Brand-aligned dropdown options */}
                <option>Pre-Construction & Soil Testing</option>
                <option>Structural Engineering & Foundation</option>
                <option>Full Building Construction</option>
                <option>Quality-Assured Materials Quote</option>
              </select>
            </div>
            <div className="space-y-2 mb-8">
              <label className="text-xs uppercase font-bold text-gray-400">Project Details</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Tell us about your vision..." className="w-full bg-[#1a140f] border border-white/10 p-4 rounded focus:border-roi-orange outline-none transition text-white" required></textarea>
            </div>
            <Button variant="primary" type="submit" className="w-full">
              Book Scoping Session 🏗️
            </Button>
          </form>
        </FadeIn>

      </div>
    </section>
  );
}